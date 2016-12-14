// import 'babel-polyfill';
import Events from "events";
import { Router } from 'director';
import h from 'virtual-dom/h';
import diff from 'virtual-dom/diff';
import createElement from 'virtual-dom/create-element';
import patch from 'virtual-dom/patch';
import util from "./util/util";
import BaseView from "./core/view";
import BaseData from "./core/data";

class Lego {
    constructor(options = {}) {
        window.h = h;
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
            isOpenVirtualDom: true, //是否开启虚拟DOM
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
        this.$el = this.$;
        this.prevApp = ''; //上一个应用名称
        this.currentApp = 'index'; //当前应用名称
        this.Event = Events;
        this.View = BaseView;
        this.Data = BaseData;
        this.views = {}; //视图实例容器
        this.datas = {};    //数据持久化容器
        this.permis = {};   //权限对象
        this.timer = {};   //计时器对象
        this.Eventer = new Events(); //全局事件对象
        this.router = null;
        this.routers = {};
        window[this.config.alias] = window.Lego = this;
        this.startApp(this.currentApp);
        return this;
    }
    /**
     * [create 实例化视图]
     * @param  {Object} option [description]
     * @return {[type]}        [description]
     */
    create(opts = {}){
        const that = this,
            options = {
                id: '',
                el: this.config.pageEl,
                tagName: 'div',
                config: {}, //视图参数
                insert: 'html',
                permis: null, //权限
                view: null, //视图类
                components: [],
                events: {},
                listen: {},
                scrollbar: null,
                data: null, //静态数据
                dataSource: null, //动态数据
                onBefore() {}, //视图开始前回调
                onAfter() {}, //视图执行后回调
                onAnimateBefore() {}, //动画前回调
                onAnimateAfter() {} //动画后回调
            };
        Object.assign(options, opts);
        options.id = options.id || ((this.config.alias + window.location.hash.replace(/\//g, '_') + '_' + options.el).replace(/#/g, ''));
        options.onBefore = options.onBefore.bind(this);
        options.onAfter = options.onAfter.bind(this);
        options.onAnimateBefore = options.onAnimateBefore.bind(this);
        options.onAnimateAfter = options.onAnimateAfter.bind(this);
        // 操作权限
        if (options.permis) {
            const module = options.permis.module,
                operate = options.permis.operate,
                hide = options.permis.hide,
                userId = options.permis.userid || 0;
            if (hide) {
                if (!this.permis.check(module, operate, userId)) {
                    return;
                }
            }
        }
        typeof options.onBefore === 'function' && options.onBefore();
        let viewObj,
            _el = this.$('[id="' + options.id + '"]')[0];
        if(!this.views[this.currentApp].has(_el)){
            viewObj = new options.view(options);
            this.views[this.currentApp].set(viewObj.$('[id="' + options.id + '"]')[0], viewObj);
        }else{
            viewObj = this.views[this.currentApp].get(_el);
        }

        if(options.listen){
            for(let key in options.listen) {
                this.Eventer.removeListener(key);
                this.Eventer.on(key, options.listen[key]);
            }
        }

        // 渲染子视图
        if(options.components.length) {
            options.components.forEach(function(item, i){
                that.create(item);
            });
        }

        typeof options.onAfter === 'function' && options.onAfter(viewObj);
        return viewObj;
    }
    /**
     * [randomKey 随机字符串]
     * @param  {[type]} len [description]
     * @return {[type]}     [description]
     */
    randomKey(len) {
        len = len || 32;
        const $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const maxPos = $chars.length;
        let pwd = '';
        for (let i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
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
     * [_initObj 初始化应用对象]
     * @param  {[type]} appName [description]
     * @return {[type]}         [description]
     */
    _initObj(appName){
        this.views[appName] = this.views[appName] || new WeakMap();
        this.timer[appName] = this.timer[appName] || new Map();
    }
    /**
     * [_clearObj 清理旧应用对象]
     * @param  {[type]} appName [description]
     * @return {[type]}         [description]
     */
    _clearObj(appName){
        const that = this;
        this.timer[appName].forEach(function(value, key){
            clearTimeout(value);
            clearInterval(value);
            that.timer[appName].delete(key);
        });
    }
    /**
     * startApp 应用加载器
     * @param  {object} opts 参数
     * @return {[type]}        [description]
     */
    startApp(appPath, opts = {}) {
        let options = {
            onBefore() {},
            onAfter() {}
        }, that = this, appName, index;
        Object.assign(options, opts);
        const hash = window.location.hash.replace(/#/, '') || this.Router.getRoute()[0];
        let newHash = hash.indexOf('/') == 0 ? hash.replace(/\//, '') : '';
        newHash = newHash !== 'index' ? newHash : '';
        appPath = appPath || newHash || this.config.defaultApp;
        appName = appPath.indexOf('/') > 0 ? appPath.split('/')[0] : appPath;
        this.prevApp = this.currentApp;
        this._initObj(appName);
        if (typeof options.onBefore == 'function') options.onBefore();
        this.$(this.config.pageEl).scrollTop(0);
        this.$.ajax({
            type: "GET",
            url: this.config.rootUri + appName + '/app.js?' + this.config.version,
            dataType: "script",
            crossDomain: true,
            cache: true,
            success: function(e) {
                if(appPath && appPath !== 'index'){
                    Object.assign(that.routers, that['router']);
                    that.router = Router(that.routers).init();
                    that.router.setRoute(appPath);
                }
                that._clearObj(that.prevApp);
                that.currentApp = appName;
                if (typeof options.onAfter == 'function') options.onAfter(e);
            },
            error: function(e) {
                debug.error('Failed to load application module!');
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
     * [trigger 触发事件]
     * @param  {[type]} event [description]
     * @param  {[type]} data  [description]
     * @return {[type]}       [description]
     */
    trigger(event, data){
        this.Eventer.emit(event, data);
    }
    /**
     * getAppName 当前模块名称
     * @return {[type]} [description]
     */
    getAppName() {
        let appName = '';
        if(this.Router){
            appName = this.Router.getRoute(0) !== 'index' ? this.Router.getRoute(0) : 'index';
        }
        return appName || this.config.defaultApp;
    }
    /**
     * [getView 取应用视图]
     * @param  {[type]} alias   [description]
     * @param  {[type]} appName [description]
     * @return {[type]}         [description]
     */
    getView(el, appName = this.getAppName()){
        el = el instanceof this.$ ? el : this.$(el);
        if(el.length && this.views[appName].get(el)){
            return this.views[appName].get(el);
        }
        return null;
    }
    /**
     * [setTimer 设置计时器]
     * @param {[type]} name  [description]
     * @param {[type]} timer [description]
     */
    setTimer(name, timer){
        if(name && timer){
            let oldTimerMap = this.timer[this.getAppName()],
                oldTimer = oldTimerMap.get(name);
            if(oldTimer){
                clearTimeout(oldTimer);
                clearInterval(oldTimer);
                oldTimerMap.clear();
            }
            oldTimerMap.set(name, timer);
        }
    }
}

export default Lego;