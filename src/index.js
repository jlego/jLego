import 'babel-polyfill';
import Events from "events";
import { Router } from 'director';
import View from "./core/view";

class Lego {
    constructor(option = {}) {
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
        Object.assign(this.config, option);

        this._debugger();
        // console.warn(this.config.$);
        if(this.config.$){
            window.$ = this.$ = this.config.$;
        }else{
            debug.error('请先设置参数$');
            return;
        }
        this.BaseEvent = Events;
        this.BaseView = View;
        this.Events = new Events();
        this.Router = Router({}).init();
        window[this.config.alias] = window.Lego = this;
        return this;
    }
    /**
     * [create description]
     * @param  {Object} option [description]
     * @return {[type]}        [description]
     */
    create(option = {}){

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
        appPath = appPath || window.location.hash.replace(/#/, '') || this.config.defaultApp;
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
     * ns 命名空间方法
     * @type {object}
     */
    // ns(nameSpaceStr, obj) {
    //     if (typeof nameSpaceStr !== 'string') {
    //         debug.error('命名空间名字必须为字符串类型');
    //         return null;
    //     }
    //     let nameSpaceArr = nameSpaceStr.split('.'),
    //         tempArr = [],
    //         obj = typeof obj == 'object' ? obj : {};

    //     function getNameSpace(nameSpaceObj, num) {
    //         if (num < nameSpaceArr.length) {
    //             let itemStr = nameSpaceArr[num];
    //             tempArr.push(itemStr);
    //             let allStr = tempArr.join('.');
    //             let subObj = eval(allStr);
    //             nameSpaceObj[itemStr] = typeof subObj == 'object' ? subObj : {};
    //             if (num == nameSpaceArr.length - 1 && !nameSpaceObj[itemStr].length) {
    //                 nameSpaceObj[itemStr] = obj;
    //             }
    //             return arguments.callee(nameSpaceObj[itemStr], num + 1);
    //         } else {
    //             return nameSpaceObj;
    //         }
    //     }
    //     return getNameSpace(this, 0);
    // }
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
     * currentModule 当前模块
     * @return {[type]} [description]
     */
    currentModule() {
        let hash = window.location.hash.replace(/#/, ''),
            hashArr = hash.split('/');
        return hashArr[0];
    }
}

export default Lego;