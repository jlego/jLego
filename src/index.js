import 'babel-polyfill';
import Events from "events";
import { Router } from 'director';
import h from 'virtual-dom/h';
import diff from 'virtual-dom/diff';
import createElement from 'virtual-dom/create-element';
import patch from 'virtual-dom/patch';
import util from "./util/util";

class Lego {
    constructor(options = {}) {
        this.h = h;
        this.createElement = createElement;
        this.diff = diff;
        this.patch = patch;
        this.util = util;
        let that = this;
        this.config = {
            alias: 'Lego',
            version: '1.0.0',
            $: null,    //dom操作对象, 必须
            isDebug: true,
            isAnimate: false,  //是否开启动画
            isPermit: false,  //是否开启操作权限
            isMultiWindow: false, //是否多窗口
            pageEl: '',     //页面渲染容器
            defaultApp: '', //默认应用
            rootUri: '',    //根目录
            routerConfig: {},   //路由配置
            screenWidth: window.innerWidth  //应用窗口宽度
        };
        Object.assign(this.config, options);

        this._debugger();
        if(this.config.$){
            window.$ = this.$ = this.config.$;
        }else{
            debug.error('请先设置参数$');
            return;
        }
        this.BaseEvent = Events;
        this.Events = new Events();
        this.views = new WeakSet(); //视图实例容器
        this.permis = {};
        this.Router = Router({}).init();
        window[this.config.alias] = window.Lego = this;
        return this;
    }
    /**
     * [create 实例化视图]
     * @param  {Object} option [description]
     * @return {[type]}        [description]
     */
    create(options = {}){
        let that = this,
            defaults = {
                el: this.config.pageEl, //视图容器选择符
                inset: 'html',
                config: {}, //视图参数
                permis: null, //权限
                view: null, //视图类
                animate: undefined, //动画效果
                events: null, //事件列表对象
                items: [],
                onBefore() {}, //视图开始前回调
                onAfter() {}, //视图执行后回调
                onAnimateBefore() {}, //动画前回调
                onAnimateAfter() {}, //动画后回调
            };
        Object.assign(defaults, options);
        defaults.data = options.data || null;
        if (!defaults.el) return;
        let theKey = Symbol(defaults.el),
            el = defaults.el,
            onBefore = defaults.onBefore.bind(this),
            onAfter = defaults.onAfter.bind(this),
            onAnimateBefore = defaults.onAnimateBefore.bind(this),
            onAnimateAfter = defaults.onAnimateAfter.bind(this),
            $el = el instanceof this.$ ? el : that.$(el);

        // 操作权限
        if (defaults.permis) {
            let module = defaults.permis.module,
                operate = defaults.permis.operate,
                hide = defaults.permis.hide,
                userId = defaults.permis.userid || 0;
            if (hide) {
                if (!this.permis.check(module, operate, userId)) {
                    return;
                }
            }
        }
        typeof onBefore === 'function' && onBefore();

        //渲染视图
        let viewObj = new defaults.view(defaults);
        $el[defaults.inset](viewObj.render());

        // 绑定事件
        if (defaults.events && !this.views.has($el)) {
            let eventSplitter = /\s+/;
            for(let key in defaults.events) {
                let callback = viewObj[defaults.events[key]];
                if (eventSplitter.test(key)) {
                    let nameArr = key.split(eventSplitter);
                    if ($el.find(nameArr[1]).length) {
                        $el = $el.find(nameArr[1]);
                    }else{
                        continue;
                    }
                }
                $el.off(key).on(key, function(event, a, b, c) {
                    if (typeof callback == 'function') callback(event, a, b, c);
                });
            };
        }
        // 是否渲染滚动条
        if (defaults.scrollbar) {
            if (!$el.css('position')) $el.css('position', 'relative');
            $el.perfectScrollbar(defaults.scrollbar);
            $el.off("mousemove.ps").on("mousemove.ps", function() {
                $(this).perfectScrollbar('update');
            });
        }
        this.views.add($el);
        // 渲染子视图
        if(defaults.items.length) {
            defaults.items.forEach(function(item, i){
                that.create(item);
            });
        }

        typeof onAfter === 'function' && onAfter();
        return $el;
    }
    /**
     * _debugger 调试器
     * @return {[type]} [description]
     */
    _debugger() {
        window.debug = {};
        if (!window.console) return function() {}
        if (this.config.isDebug) {
            for (let m in console) {
                if (typeof console[m] == 'function') {
                    debug[m] = console[m].bind(window.console);
                }
            }
        } else {
            for (let m in console) {
                if (typeof console[m] == 'function') {
                    debug[m] = function() {};
                }
            }
        }
    }
    /**
     * loadApp 应用加载器
     * @param  {object} option 参数
     * @return {[type]}        [description]
     */
    loadApp(appPath, option = {}) {
        let defaults = {
            onBefore: function() {},
            onAfter: function() {}
        }, that = this, appName, index;
        Object.assign(defaults, option);
        appPath = appPath || this.currentApp() || this.config.defaultApp;
        index = appPath.indexOf('/');
        appName = index >= 0 ? (appPath.substr(0, index) || appPath.substr(1, index)) : appPath;
        if (typeof defaults.onBefore == 'function') defaults.onBefore();
        this.$(this.config.pageEl).scrollTop(0);
        this.$.ajax({
            type: "GET",
            url: this.config.rootUri + appName + '/app.js?' + this.config.version,
            dataType: "script",
            crossDomain: true,
            cache: true,
            success: function(e) {
                that.Router = Router(that['app']).init();
                that.Router.setRoute(appPath);
                if (typeof defaults.onAfter == 'function') defaults.onAfter(e);
                that['app'] = null;
            },
            error: function(e) {
                debug.warn('加载应用模块失败');
            }
        });
    }
    /**
     * getUrlParam 获取网址参数
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    getUrlParam(name) {
        window.pageParams = {};
        if (window.pageParams[name]) return window.pageParams[name];
        let url = decodeURI(document.location.search);
        if (url.indexOf('||') >= 0) url = url.replace(/\|\|/g, '//');
        if (url.indexOf('?') >= 0) {
            let paramArr = url.substr(1).split('&'),
                valArr = [];
            for (let i = 0; i < paramArr.length; i++) {
                valArr = paramArr[i].split('=');
                window.pageParams[valArr[0]] = valArr[1];
            }
            return window.pageParams[name] || '';
        } else {
            return '';
        }
    }
    /**
     * currentApp 当前模块
     * @return {[type]} [description]
     */
    currentApp() {
        let hash = window.location.hash.replace(/#/, '');
        if(hash.indexOf('/') == 0) hash = hash.replace(/\//, '');
        let hashArr = hash.split('/');
        return hashArr[0];
    }
}

export default Lego;

// let s = Symbol();
// let f = Symbol();
// let a = {};
// a[s] = 'cccc';
// console.warn(a[s], s.toString());



// function* helloWorldGenerator() {
//     yield 'hello';
//     yield 'world';
//     return 'ending';
// }

// var hw = helloWorldGenerator();

// console.warn(hw.next());
// console.warn(hw.next());
// console.warn(hw.next());

// let anyObject = new EventClass();

// anyObject.on("change", (data) => {
//     console.log("change event :", data);
// });
// anyObject.emit("change", "Hello 3778 !");

        // let patches = diff(leftNode, rightNode);
        // patch(rootNode, patches);