// import 'babel-polyfill';
import Events from "./core/event";
import Router from './core/router';

class Lego {
    constructor(option = {}) {
        this.config = {
            version: '1.0.0',
            isDebug: true,
            $: null,    //dom操作对象, 必须
            hasAnimate: false,  //是否开启动画
            hasPermit: false,  //是否开启操作权限
            pageEl: '',     //页面渲染容器
            defaultApp: '', //默认应用
            rootUri: '',    //根目录
            routerConfig: {},   //路由配置
            screenWidth: window.innerWidth  //应用窗口宽度
        };
        Object.assign(this.config, option);

        this._debugger();
        if(this.config.$){
            window.$ = this.config.$;
        }else{
            debug.error('请先设置参数$');
            return;
        }
        this.BaseEvent = Events;
        this.Events = new Events();
        this.Router = Router({'/': () => {
            
        }}).init();
    }
    /**
     * [_debugger 调试器]
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
     * [loader 应用加载器]
     * @param  {[type]} option [description]
     * @return {[type]}        [description]
     */
    loader(appPath, option) {
        let defaults = {
            onBefore: function() {},
            onAfter: function() {}
        }, that = this, appName;
        if (option) Object.assign(defaults, option);
        appName = appPath || this.currentModule();
        if (typeof defaults.onBefore == 'function') defaults.onBefore();
        $(this.config.pageEl).scrollTop(0);
        $.ajax({
            type: "GET",
            url: this.config.rootUri + appName + '/app.js?' + this.config.version,
            dataType: "script",
            crossDomain: true,
            cache: true,
            success: function(e) {
                that.Router = Router(that['app']).init();
                window.location.hash = '#' + appPath;
                that.Router.
                if (typeof defaults.onAfter == 'function') defaults.onAfter(e);
            },
            error: function(e) {
                debug.warn('加载模块失败');
            }
        });
    }
    /**
     * [ns 命名空间方法]
     * @type {[type]}
     */
    ns(nameSpaceStr, obj) {
        if (typeof nameSpaceStr !== 'string') {
            debug.error('命名空间名字必须为字符串类型');
            return null;
        }
        let nameSpaceArr = nameSpaceStr.split('.'),
            tempArr = [],
            obj = _.isObject(obj) ? obj : {};

        function getNameSpace(nameSpaceObj, num) {
            if (num < nameSpaceArr.length) {
                let itemStr = nameSpaceArr[num];
                tempArr.push(itemStr);
                let allStr = tempArr.join('.');
                let subObj = eval(allStr);
                nameSpaceObj[itemStr] = _.isObject(subObj) ? subObj : {};
                if (num == nameSpaceArr.length - 1 && _.isEmpty(nameSpaceObj[itemStr])) {
                    nameSpaceObj[itemStr] = obj;
                }
                return arguments.callee(nameSpaceObj[itemStr], num + 1);
            } else {
                return nameSpaceObj;
            }
        }
        return getNameSpace(this, 0);
    }
    /**
     * [getUrlParam 获取网址参数]
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
            for (let item of paramArr) {
                valArr = item.split('=');
                window.pageParams[valArr[0]] = valArr[1];
            }
            return window.pageParams[name] || '';
        } else {
            return '';
        }
    }
    /**
     * [currentModule 当前模块]
     * @return {[type]} [description]
     */
    currentModule() {
        let hash = window.location.hash.replace(/#/, ''),
            hashArr = hash.split('/');
        return hashArr[0];
    }
}

export default Lego;
