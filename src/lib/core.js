import Events from "events";
import { Router } from 'director';

class Core {
    constructor(opts = {}) {
        const that = this;
        this.config = {
            alias: 'Lego',
            version: '1.0.0',
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
        Object.assign(this.config, opts);

        this._debugger();

        this.prevApp = ''; //上一个应用名称
        this.currentApp = ''; //当前应用名称
        // 基类
        this.Event = Events;
        this.Router = Router;

        this.idCounter = 0;
        // 实例容器
        this.views = {}; //视图容器
        this.datas = {};    //数据容器
        this.permis = {};   //权限对象
        this.timer = {};   //计时器对象
        this.UI = {};
        this.routers = new Map();
        this.Eventer = new Events(); //全局事件对象
        return this;
    }
    /**
     * [extend 深拷贝对象]
     * @param  {...[type]} opts [description]
     * @return {[type]}         [description]
     */
    extend(...opts){
        let result = {};
        function assign(source){
            let target = {};
            for (let p in source) {
                if (source.hasOwnProperty(p)) {
                    if(typeof source[p] !== 'object'){
                        target[p] = source[p];
                    }else{
                        if(Array.isArray(source[p])){
                            target[p] = Array.from(assign(source[p]));
                        }else{
                            target[p] = assign(source[p]);
                        }
                    }
                }
            }
            return target;
        }
        for(let i = 0; i < opts.length; i++){
            if(typeof opts[i] == 'object'){
                result = Object.assign(result, assign(opts[i]));
            }
        }
        return result;
    }
    /**
     * [create 实例化视图]
     * @param  {Object} view, option [description]
     * @return {[type]}        [description]
     */
    create(view, opts = {}){
        const that = this;
        opts.vid = this.uniqueId('v');
        opts.onBefore = opts.onBefore && opts.onBefore.bind(this);
        opts.onAfter = opts.onAfter && opts.onAfter.bind(this);
        if(!view) return;
        // 操作权限
        if (opts.permis) {
            const module = opts.permis.module,
                operate = opts.permis.operate,
                hide = opts.permis.hide,
                userId = opts.permis.userid || 0;
            if (hide) {
                if (!this.permis.check(module, operate, userId)) {
                    return;
                }
            }
        }
        typeof opts.onBefore === 'function' && opts.onBefore();

        const viewObj = new view(opts);
        this.views[this.currentApp].set(viewObj.el, viewObj);
        if(opts.listen){
            if(!this.isEmptyObject(opts.listen)){
                for(let key in opts.listen) {
                    this.Eventer.removeListener(key);
                    this.Eventer.on(key, opts.listen[key]);
                }
            }
        }

        typeof opts.onAfter === 'function' && opts.onAfter(viewObj);
        return viewObj;
    }
    /**
     * [init 初始化系统]
     * @param  {Object} opts [description]
     * @return {[type]}      [description]
     */
    init(opts = {}){
        if(!this.isEmptyObject(opts)) Object.assign(this.config, opts);
        window[this.config.alias] = window.Lego = this;
        this.startApp();
        return this;
    }
    /**
     * [components 注册UI组件]
     * @param  {Object} opts [description]
     * @return {[type]}      [description]
     */
    components(comName, coms = {}, isReset = false){
        if(typeof comName === 'string') this.UI[comName] = coms;
        if(typeof comName === 'object'){
            if(!this.isEmptyObject(comName)){
                Object.assign(this.UI, comName);
            }else{
                this.UI = comName;
            }
        }
    }
    /**
     * [param 序列化普通对象]
     * @param  {Object} obj [description]
     * @return {[type]}     [description]
     */
    param(obj = {}){
        let result = [];
        for(let key in obj){
            if(typeof obj[key] === 'object'){
                obj[key] = JSON.stringify(obj[key]);
            }
            result.push(key + '=' + obj[key]);
        }
        return result.join('&');
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
     * [uniqueId 实例唯一码]
     * @param  {[type]} prefix [description]
     * @return {[type]}        [description]
     */
    uniqueId(prefix) {
        const id = ++this.idCounter + '';
        return prefix ? prefix + id : id;
    }
    /**
     * [isEmptyObject description]
     * @param  {[type]}  obj [description]
     * @return {Boolean}   [description]
     */
    isEmptyObject(obj = {}) {
        for (let val in obj) return !1;
        return !0;
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
        if(this.prevApp !== this.currentApp){
            this.timer[appName].forEach(function(value, key){
                clearTimeout(value);
                clearInterval(value);
                that.timer[appName].delete(key);
            });
        }
    }
    /**
     * [loadScript 加载js]
     * @param  {[type]}   url      [description]
     * @param  {Function} callback [description]
     * @param  {[type]}   appName  [description]
     * @return {[type]}            [description]
     */
    loadScript(url, callback, appName) {
        let script = document.createElement("script");
        script.setAttribute('id', appName);
        script.type = "text/javascript";
        if (script.readyState) { // IE
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { // FF, Chrome, Opera, ...
            script.onload = function() {
                callback();
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
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
        const hash = window.location.hash.replace(/#/, '');
        let newHash = hash.indexOf('/') == 0 ? hash.replace(/\//, '') : '';
        newHash = newHash !== 'index' ? newHash : '';
        appPath = appPath || newHash || this.config.defaultApp;
        appName = !this.currentApp ? 'index' : (appPath.indexOf('/') > 0 ? appPath.split('/')[0] : appPath);
        this.prevApp = this.currentApp;
        this.currentApp = !this.currentApp ? 'index' : appName;
        this._initObj(appName);
        if (typeof options.onBefore == 'function') options.onBefore();
        this.loadScript(this.config.rootUri + appName + '/app.js?' + this.config.version, function() {
            if(appPath && appName !== 'index'){
                that.routers.get(appName).setRoute(appPath);
                document.getElementById(appName).parentNode.removeChild(document.getElementById(appName));
                that._clearObj(that.prevApp);
            }
            if (typeof options.onAfter == 'function') options.onAfter();
        }, appName);
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
        let hash = window.location.hash.replace(/#/, '');
        hash = hash.indexOf('/') == 0 ? hash.replace(/\//, '') : '';
        return hash.split('/')[0] || this.config.defaultApp;
    }
    /**
     * [getView 取应用视图]
     * @param  {[type]} alias   [description]
     * @param  {[type]} appName [description]
     * @return {[type]}         [description]
     */
    getView(el, appName = this.getAppName()){
        let _el = document.querySelector(el);
        if(this.views[appName].has(_el)){
            return this.views[appName].get(_el);
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
    /**
     * [router 实例化路由]
     * @param  {[type]} routerOption [description]
     * @return {[type]}           [description]
     */
    router(routerOption){
        const appName = this.currentApp;
        if(appName == 'index') return;
        if(!this.routers.has(appName)){
            const routerObj = this.Router(routerOption).init();
            this.routers.set(appName, routerObj);
        }
        return this.routers.get(appName);
    }
}
window.Lego = new Core();
export default window.Lego;