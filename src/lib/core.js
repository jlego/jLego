// import { Router } from 'director';//v1.8.0之前的版本
import 'html5-history-api';
import page from 'page';
window.page = page;
let location = window.history.location || window.location;

class Core {
    constructor() {
        let that = this;
        this.config = {
            alias: 'Lego',
            version: '1.0.0',
            isDebug: true,
            isAnimate: false,  //是否开启动画
            isMultiWindow: false, //是否多窗口
            permit(){},  //操作权限
            pageEl: '',     //页面渲染容器
            defaultApp: '', //默认应用
            rootUri: '',    //根目录
            screenWidth: window.innerWidth  //应用窗口宽度
        };
        this._debugger();
        this.prevApp = ''; //上一个应用名称
        this.currentApp = ''; //当前应用名称
        // 基类
        // this.Route = Router;

        this.idCounter = 0;
        // 实例容器
        this.viewsMap = new WeakMap(); //视图映射表
        this.views = {}; //视图容器
        this.oldViews = {},
        this.datas = {};    //数据容器
        this.timer = new Map();   //计时器对象
        this.UI = {};
        this.routers = new Map();

        // 监听hash变化
        window.onhashchange = function(){
            let hashStr = location.hash.replace('#', '');
            if(hashStr){
                if(hashStr.split('/').length > 2) page(hashStr);
            }
        };
        return this;
    }
    /**
     * [extend 深拷贝对象]
     * @param  {...[type]} opts [description]
     * @return {[type]}         [description]
     */
    extend(...opts){
        let that = this;
        if(window.$) return $.extend(true, ...opts);
        if(opts.length > 0){
            let result = opts[0];
            if(typeof result !== "object" && typeof result !== 'function') result = {};
            for(let i = 1; i < opts.length; i++){
                let source = opts[i];
                if(source != null && typeof source == "object"){
                    let keys = Object.keys(source);
                    if(result === source) continue;
                    for (let t = 0; t < keys.length; t++) {
                        let key = keys[t];
                        if (Object.prototype.hasOwnProperty.call(source, key)) {
                            if(typeof source[key] !== 'object'){
                                result[key] = source[key];
                            }else{
                                result[key] = Lego.extend(result[key], source[key]);
                            }
                        }
                    }
                }
            }
            return result;
        }
        return {};
    }
    /**
     * [create 实例化视图]
     * @param  {Object} view, option [description]
     * @return {[type]}        [description]
     */
    create(view, opts = {}){
        const that = this;
        opts.vid = this.uniqueId('v');
        if(!view) return;
        // 操作权限
        if(this.config.permit){
            if(typeof this.config.permit == 'function' && opts.permis){
                if(!this.config.permit(opts.permis)) return;
            }
        }
        const viewObj = new view(opts);
        function addOldViews(el){
            let theView = that.getView(el);
            that.oldViews[theView.options.vid] = theView.options.id;
        }

        if(opts.insert == 'html'){
            this.removeOldViews();
            let subViewsEl = viewObj.$('[view-id]');
            if(subViewsEl.length){
                if(window.$){
                    subViewsEl.each(function(index, el){
                        addOldViews(el);
                    });
                }else{
                    for (let i = 0; i < subViewsEl.length; i++) {
                        addOldViews(subViewsEl[i]);
                    }
                }
            }
            this.oldViews[opts.vid] = viewObj.options.id;
        }
        this.viewsMap.set(viewObj.el, opts.vid);
        this.views[opts.vid] = viewObj;

        return viewObj;
    }
    // 清除无用的视图对象
    removeOldViews(){
        for(let key in this.oldViews){
            let view = this.getView(key);
            if(!view){
                delete this.oldViews[key];
                delete this.views[key];
            }else{
                this.Eventer.off(null, null, view);
                this.viewsMap.delete(view.el);
                view.remove();
            }
        }
    }
    /**
     * [init 初始化系统]
     * @param  {Object} opts [description]
     * @return {[type]}      [description]
     */
    setting(...opts){
        if(opts.length > 1){
            if(typeof opts[0] == 'string'){
                this.config[opts[0]] = opts[1];
            }
        }else{
            if(typeof opts[0] == 'object'){
                Object.assign(this.config, opts[0]);
            }
        }
        page.base(this.config.routeRoot);
        this._debugger();
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
        let id = ++this.idCounter + '';
        return !!prefix ? (prefix + id) : id;
    }
    /**
     * [isEmptyObject description]
     * @param  {[type]}  obj [description]
     * @return {Boolean}   [description]
     */
    isEmptyObject(obj = {}) {
        if(window.$) return $.isEmptyObject(obj);
        if(obj != null && typeof obj == 'object'){
            for (let val in obj) return !1;
        }
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
     * [_clearObj 清理旧应用对象]
     * @param  {[type]} appName [description]
     * @return {[type]}         [description]
     */
    _clearObj(appName){
        const that = this;
        if(appName !== this.currentApp){
            this.timer.forEach(function(value, key){
                clearTimeout(value);
                clearInterval(value);
                that.timer.delete(key);
            });
        }
    }
    /**
     * [ns 命名空间]
     * @param  {[type]} nameSpaceStr [description]
     * @param  {[type]} obj          [description]
     * @return {[type]}              [description]
     */
    ns(nameSpaceStr, obj = {}) {
        if (typeof nameSpaceStr !== 'string' && Array.isArray(obj) || typeof obj !== 'object') {
            debug.error('namespace error', obj);
            return;
        }
        if (nameSpaceStr.substring(0, 5) !== 'Lego.') nameSpaceStr = 'Lego.' + nameSpaceStr;
        let nameSpaceArr = nameSpaceStr.split('.'),
            tempArr = ['Lego'],
            that = this;
        function getNameSpace(nameSpaceObj, num) {
            if (num < nameSpaceArr.length) {
                let itemStr = nameSpaceArr[num];
                tempArr.push(itemStr);
                let allStr = tempArr.join('.');
                let subObj = eval(allStr);
                if (num == nameSpaceArr.length - 1) {
                    if(that.isEmptyObject(nameSpaceObj[itemStr])){
                        nameSpaceObj[itemStr] = obj;
                    }
                }else{
                    nameSpaceObj[itemStr] = typeof subObj == 'object' && !Array.isArray(subObj) ? subObj : {};
                }
                return getNameSpace(nameSpaceObj[itemStr], num + 1);
            } else {
                return nameSpaceObj;
            }
        }
        return getNameSpace(this, 1);
    }
    // 添加事件监听
    addEvent(target, type, func){
        if(target.addEventListener){
            //监听IE9，谷歌和火狐
            target.addEventListener(type, func, false);
        }else if(target.attachEvent){
            target.attachEvent("on" + type, func);
        }else{
            target["on" + type] = func;
        }
    }
    // 删除事件监听
    removeEvent(target, type, func) {
        if (target.removeEventListener){
            //监听IE9，谷歌和火狐
            target.removeEventListener(type, func, false);
        } else if (target.detachEvent){
            target.detachEvent("on" + type, func);
        } else {
            delete target["on" + type];
        }
    }
    /**
     * [loadScript 加载js]
     * @param  {[type]}   url      [description]
     * @param  {Function} callback [description]
     * @param  {[type]}   appName  [description]
     * @return {[type]}            [description]
     */
    loadScript(url, callback, appName = '') {
        let script = document.createElement("script"),
            theId = 'Lego-js-' + appName,
            version = (url.indexOf('?') < 0 ? '?' : '&') + (this.config.version || 0);
        script.setAttribute('id', theId);
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
        script.src = url + version;
        if(document.getElementById(theId)) document.getElementsByTagName("head")[0].removeChild(document.getElementById(theId));
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    //加载样式表
    loadCss(cssUrl, appName) {
        let cssLink = document.createElement("link"),
            theId = 'Lego-css-' + appName,
            version = (cssUrl.indexOf('?') < 0 ? '?' : '&') + (this.config.version || 0);
        if (cssUrl) {
            let theCss = cssUrl + version;
            if(!document.getElementById(theId)){
                cssLink.setAttribute('id', theId);
                cssLink.rel = "stylesheet";
                cssLink.href = theCss;
                // cssLink.onload = function(){
                //     if(typeof callback == 'function') callback();
                // }
                document.getElementsByTagName("head")[0].appendChild(cssLink);
            }
        }
    }
    // 移除引入的样式表
    removeCss(appName) {
        let theId = 'Lego-css-' + appName;
        if(document.getElementById(theId)) document.getElementsByTagName("head")[0].removeChild(document.getElementById(theId));
    }
    /**
     * startApp 应用加载器
     * @param  {object} opts 参数
     * @return {[type]}        [description]
     */
    startApp(appPath, fileName = 'app', opts = {}) {
        let options = {
            removeCss: true,
            startBefore() {},
            startAfter() {}
        }, that = this, appName, index;
        Object.assign(options, opts);
        const hash = window.location.hash.replace(/#/, '');
        let newHash = hash.indexOf('/') == 0 ? hash.replace(/\//, '') : '';
        newHash = newHash !== 'index' ? newHash : '';
        appPath = appPath || newHash || this.config.defaultApp;
        appName = !this.currentApp ? 'index' : (appPath.indexOf('/') > 0 ? appPath.split('/')[0] : appPath);
        this.prevApp = this.currentApp;
        this.currentApp = !this.currentApp ? 'index' : appName;
        if (typeof options.startBefore == 'function') options.startBefore();
        if(!this.config.isMultiWindow){
            page.stop();
            this.routers.delete(this.prevApp);
        }
        this.loadCss(this.config.rootUri + appName + '/' + fileName + '.css', appName);
        if(this.theTimer) clearTimeout(this.theTimer);
        this.theTimer = setTimeout(function(){
            that.loadScript(that.config.rootUri + appName + '/' + fileName + '.js', function() {
                if(appPath && appName !== 'index'){
                    page(appPath.indexOf('/') !== 0 ? ('/' + appPath) : appPath);
                    if(!that.config.isMultiWindow){
                        let prevId = 'Lego-js-' + that.prevApp;
                        if(document.getElementById(prevId)){
                            document.getElementsByTagName("head")[0].removeChild(document.getElementById(prevId));
                        }
                        if(that.prevApp !== 'index' && options.removeCss) that.removeCss(that.prevApp);
                        that._clearObj(that.prevApp);
                    }
                }
                if (typeof options.startAfter == 'function') options.startAfter();
            }, appName);
        }, 200);
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
    getView(el){
        // el为vid
        if(typeof el == 'string'){
            let result = this.views[el];
            if(result) return result;
        }
        // el为其他字符串
        let _el = typeof el == 'string' ? document.querySelector(el) : el;
        // el为jquery对象
        if(window.$ && typeof el == 'object'){
            _el = el instanceof window.$ ? el[0] : _el;
        }
        if(this.viewsMap.has(_el)){
            let vid = this.viewsMap.get(_el);
            return this.views[vid];
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
            let oldTimerMap = this.timer,
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
    router(router = {}){
        if(!this.isEmptyObject(router)){
            let currentApp = this.getAppName();
            if(!this.routers.get(currentApp)){
                let routerOption = router.pages ? router.pages : (typeof router == 'function' ? new router() : router);
                for(let key in routerOption){
                    let value = routerOption[key],
                        routerName = key;
                    value = Array.isArray(value) ? value : [value];
                    value.unshift(key);
                    page(...value);
                }
                this.routers.set(currentApp, router);
            }
        }
    }
}
window.Lego = window.Lego || new Core();
export default window.Lego;
