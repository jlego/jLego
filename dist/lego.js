/**
 * lego.js v1.14.5
 * (c) 2017 Ronghui Yu
 * @license MIT
 */
"use strict";

function _interopDefault(ex) {
    return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
}

var html5HistoryApi = require("html5-history-api");

var page = _interopDefault(require("page"));

var object_observe = require("object.observe");

var hyperx = _interopDefault(require("hyperx"));

var vdom = _interopDefault(require("virtual-dom"));

var whatwgFetch = require("whatwg-fetch");

window.page = page;

var location = window.history.location || window.location;

var Core = function Core() {
    var that = this;
    this.config = {
        alias: "Lego",
        version: "1.0.0",
        isDebug: true,
        isAnimate: false,
        isMultiWindow: false,
        permit: function permit() {},
        pageEl: "",
        defaultApp: "",
        rootUri: "",
        screenWidth: window.innerWidth
    };
    this._debugger();
    this.prevApp = "";
    this.currentApp = "";
    this.idCounter = 0;
    this.viewsMap = new WeakMap();
    this.views = {};
    this.oldViews = {}, this.datas = {};
    this.timer = new Map();
    this.UI = {};
    this.routers = new Map();
    window.onhashchange = function() {
        var hashStr = location.hash.replace("#", "");
        if (hashStr) {
            if (hashStr.split("/").length > 2) {
                page(hashStr);
            }
        }
    };
    return this;
};

Core.prototype.extend = function extend() {
    var opts = [], len = arguments.length;
    while (len--) opts[len] = arguments[len];
    var that = this;
    if (window.$) {
        return $.extend.apply($, [ true ].concat(opts));
    }
    if (opts.length > 0) {
        var result = opts[0];
        if (typeof result !== "object" && typeof result !== "function") {
            result = {};
        }
        for (var i = 1; i < opts.length; i++) {
            var source = opts[i];
            if (source != null && typeof source == "object") {
                var keys = Object.keys(source);
                if (result === source) {
                    continue;
                }
                for (var t = 0; t < keys.length; t++) {
                    var key = keys[t];
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        if (typeof source[key] !== "object") {
                            result[key] = source[key];
                        } else {
                            result[key] = Lego.extend(result[key], source[key]);
                        }
                    }
                }
            }
        }
        return result;
    }
    return {};
};

Core.prototype.create = function create(view, opts) {
    if (opts === void 0) opts = {};
    var that = this;
    opts.vid = this.uniqueId("v");
    if (!view) {
        return;
    }
    if (this.config.permit) {
        if (typeof this.config.permit == "function" && opts.permis) {
            if (!this.config.permit(opts.permis)) {
                return;
            }
        }
    }
    var viewObj = new view(opts);
    function addOldViews(el) {
        var theView = that.getView(el);
        that.oldViews[theView.options.vid] = theView.options.id;
    }
    if (opts.insert == "html") {
        this.removeOldViews();
        var subViewsEl = viewObj.$("[view-id]");
        if (subViewsEl.length) {
            if (window.$) {
                subViewsEl.each(function(index, el) {
                    addOldViews(el);
                });
            } else {
                for (var i = 0; i < subViewsEl.length; i++) {
                    addOldViews(subViewsEl[i]);
                }
            }
        }
        this.oldViews[opts.vid] = viewObj.options.id;
    }
    this.viewsMap.set(viewObj.el, opts.vid);
    this.views[opts.vid] = viewObj;
    return viewObj;
};

Core.prototype.removeOldViews = function removeOldViews() {
    var this$1 = this;
    for (var key in this.oldViews) {
        var view = this$1.views[key], vidStr = "#" + this$1.oldViews[key], $el = window.$ ? $(vidStr) : document.querySelector(vidStr);
        if (!$el.length) {
            this$1.viewsMap.delete(view.el);
            view.remove();
            delete this$1.views[key];
            delete this$1.oldViews[key];
        }
    }
};

Core.prototype.setting = function setting() {
    var opts = [], len = arguments.length;
    while (len--) opts[len] = arguments[len];
    if (opts.length > 1) {
        if (typeof opts[0] == "string") {
            this.config[opts[0]] = opts[1];
        }
    } else {
        if (typeof opts[0] == "object") {
            Object.assign(this.config, opts[0]);
        }
    }
    page.base(this.config.routeRoot);
    this._debugger();
    return this;
};

Core.prototype.components = function components(comName, coms, isReset) {
    if (coms === void 0) coms = {};
    if (isReset === void 0) isReset = false;
    if (typeof comName === "string") {
        this.UI[comName] = coms;
    }
    if (typeof comName === "object") {
        if (!this.isEmptyObject(comName)) {
            Object.assign(this.UI, comName);
        } else {
            this.UI = comName;
        }
    }
};

Core.prototype.param = function param(obj) {
    if (obj === void 0) obj = {};
    var result = [];
    for (var key in obj) {
        if (typeof obj[key] === "object") {
            obj[key] = JSON.stringify(obj[key]);
        }
        result.push(key + "=" + obj[key]);
    }
    return result.join("&");
};

Core.prototype.randomKey = function randomKey(len) {
    len = len || 32;
    var $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var maxPos = $chars.length;
    var pwd = "";
    for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
};

Core.prototype.uniqueId = function uniqueId(prefix) {
    var id = ++this.idCounter + "";
    return !!prefix ? prefix + id : id;
};

Core.prototype.isEmptyObject = function isEmptyObject(obj) {
    if (obj === void 0) obj = {};
    if (window.$) {
        return $.isEmptyObject(obj);
    }
    if (obj != null && typeof obj == "object") {
        for (var val in obj) {
            return !1;
        }
    }
    return !0;
};

Core.prototype._debugger = function _debugger() {
    window.debug = {};
    if (!window.console) {
        return function() {};
    }
    if (this.config.isDebug) {
        for (var m in console) {
            if (typeof console[m] == "function") {
                debug[m] = console[m].bind(window.console);
            }
        }
    } else {
        for (var m$1 in console) {
            if (typeof console[m$1] == "function") {
                debug[m$1] = function() {};
            }
        }
    }
};

Core.prototype._clearObj = function _clearObj(appName) {
    var that = this;
    if (appName !== this.currentApp) {
        this.timer.forEach(function(value, key) {
            clearTimeout(value);
            clearInterval(value);
            that.timer.delete(key);
        });
    }
};

Core.prototype.ns = function ns(nameSpaceStr, obj) {
    if (obj === void 0) obj = {};
    if (typeof nameSpaceStr !== "string" && Array.isArray(obj) || typeof obj !== "object") {
        debug.error("namespace error", obj);
        return;
    }
    if (nameSpaceStr.substring(0, 5) !== "Lego.") {
        nameSpaceStr = "Lego." + nameSpaceStr;
    }
    var nameSpaceArr = nameSpaceStr.split("."), tempArr = [ "Lego" ], that = this;
    function getNameSpace(nameSpaceObj, num) {
        if (num < nameSpaceArr.length) {
            var itemStr = nameSpaceArr[num];
            tempArr.push(itemStr);
            var allStr = tempArr.join(".");
            var subObj = eval(allStr);
            if (num == nameSpaceArr.length - 1) {
                if (that.isEmptyObject(nameSpaceObj[itemStr])) {
                    nameSpaceObj[itemStr] = obj;
                }
            } else {
                nameSpaceObj[itemStr] = typeof subObj == "object" && !Array.isArray(subObj) ? subObj : {};
            }
            return getNameSpace(nameSpaceObj[itemStr], num + 1);
        } else {
            return nameSpaceObj;
        }
    }
    return getNameSpace(this, 1);
};

Core.prototype.addEvent = function addEvent(target, type, func) {
    if (target.addEventListener) {
        target.addEventListener(type, func, false);
    } else if (target.attachEvent) {
        target.attachEvent("on" + type, func);
    } else {
        target["on" + type] = func;
    }
};

Core.prototype.removeEvent = function removeEvent(target, type, func) {
    if (target.removeEventListener) {
        target.removeEventListener(type, func, false);
    } else if (target.detachEvent) {
        target.detachEvent("on" + type, func);
    } else {
        delete target["on" + type];
    }
};

Core.prototype.loadScript = function loadScript(url, callback, appName) {
    if (appName === void 0) appName = "";
    var script = document.createElement("script"), theId = "Lego-js-" + appName, version = (url.indexOf("?") < 0 ? "?" : "&") + (this.config.version || 0);
    script.setAttribute("id", theId);
    script.type = "text/javascript";
    if (script.readyState) {
        script.onreadystatechange = function() {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = function() {
            callback();
        };
    }
    script.src = url + version;
    if (document.getElementById(theId)) {
        document.getElementsByTagName("head")[0].removeChild(document.getElementById(theId));
    }
    document.getElementsByTagName("head")[0].appendChild(script);
};

Core.prototype.loadCss = function loadCss(cssUrl, appName) {
    var cssLink = document.createElement("link"), theId = "Lego-css-" + appName, version = (cssUrl.indexOf("?") < 0 ? "?" : "&") + (this.config.version || 0);
    if (cssUrl) {
        var theCss = cssUrl + version;
        if (!document.getElementById(theId)) {
            cssLink.setAttribute("id", theId);
            cssLink.rel = "stylesheet";
            cssLink.href = theCss;
            document.getElementsByTagName("head")[0].appendChild(cssLink);
        }
    }
};

Core.prototype.removeCss = function removeCss(appName) {
    var theId = "Lego-css-" + appName;
    if (document.getElementById(theId)) {
        document.getElementsByTagName("head")[0].removeChild(document.getElementById(theId));
    }
};

Core.prototype.startApp = function startApp(appPath, fileName, opts) {
    if (fileName === void 0) fileName = "app";
    if (opts === void 0) opts = {};
    var options = {
        removeCss: true,
        startBefore: function startBefore() {},
        startAfter: function startAfter() {}
    }, that = this, appName, index;
    Object.assign(options, opts);
    var hash = window.location.hash.replace(/#/, "");
    var newHash = hash.indexOf("/") == 0 ? hash.replace(/\//, "") : "";
    newHash = newHash !== "index" ? newHash : "";
    appPath = appPath || newHash || this.config.defaultApp;
    appName = !this.currentApp ? "index" : appPath.indexOf("/") > 0 ? appPath.split("/")[0] : appPath;
    this.prevApp = this.currentApp;
    this.currentApp = !this.currentApp ? "index" : appName;
    if (typeof options.startBefore == "function") {
        options.startBefore();
    }
    if (!this.config.isMultiWindow) {
        page.stop();
        this.routers.delete(this.prevApp);
    }
    this.loadCss(this.config.rootUri + appName + "/" + fileName + ".css", appName);
    if (this.theTimer) {
        clearTimeout(this.theTimer);
    }
    this.theTimer = setTimeout(function() {
        that.loadScript(that.config.rootUri + appName + "/" + fileName + ".js", function() {
            if (appPath && appName !== "index") {
                page(appPath.indexOf("/") !== 0 ? "/" + appPath : appPath);
                if (!that.config.isMultiWindow) {
                    var prevId = "Lego-js-" + that.prevApp;
                    if (document.getElementById(prevId)) {
                        document.getElementsByTagName("head")[0].removeChild(document.getElementById(prevId));
                    }
                    if (that.prevApp !== "index" && options.removeCss) {
                        that.removeCss(that.prevApp);
                    }
                    that._clearObj(that.prevApp);
                }
            }
            if (typeof options.startAfter == "function") {
                options.startAfter();
            }
        }, appName);
    }, 200);
};

Core.prototype.getUrlParam = function getUrlParam(name) {
    window.pageParams = {};
    if (window.pageParams[name]) {
        return window.pageParams[name];
    }
    var url = decodeURI(document.location.search);
    if (url.indexOf("?") >= 0) {
        var paramArr = url.substr(1).split("&"), valArr = [];
        for (var i = 0; i < paramArr.length; i++) {
            valArr = paramArr[i].split("=");
            window.pageParams[valArr[0]] = valArr[1];
        }
        return window.pageParams[name] || "";
    } else {
        return "";
    }
};

Core.prototype.getAppName = function getAppName() {
    var hash = window.location.hash.replace(/#/, "");
    hash = hash.indexOf("/") == 0 ? hash.replace(/\//, "") : "";
    return hash.split("/")[0] || this.config.defaultApp;
};

Core.prototype.getView = function getView(el) {
    var _el = typeof el == "string" ? document.querySelector(el) : el;
    if (window.$ && typeof el == "object") {
        _el = el instanceof window.$ ? el[0] : _el;
    }
    if (this.viewsMap.has(_el)) {
        var vid = this.viewsMap.get(_el);
        return this.views[vid];
    }
    return null;
};

Core.prototype.setTimer = function setTimer(name, timer) {
    if (name && timer) {
        var oldTimerMap = this.timer, oldTimer = oldTimerMap.get(name);
        if (oldTimer) {
            clearTimeout(oldTimer);
            clearInterval(oldTimer);
            oldTimerMap.clear();
        }
        oldTimerMap.set(name, timer);
    }
};

Core.prototype.router = function router(router) {
    if (router === void 0) router = {};
    if (!this.isEmptyObject(router)) {
        var currentApp = this.getAppName();
        if (!this.routers.get(currentApp)) {
            var routerOption = router.pages ? router.pages : typeof router == "function" ? new router() : router;
            for (var key in routerOption) {
                var value = routerOption[key], routerName = key;
                value = Array.isArray(value) ? value : [ value ];
                value.unshift(key);
                page.apply(void 0, value);
            }
            this.routers.set(currentApp, router);
        }
    }
};

window.Lego = window.Lego || new Core();

var LegoCore$1 = window.Lego;

window.hx = hyperx(vdom.h);

var View = function View(opts) {
    var this$1 = this;
    if (opts === void 0) opts = {};
    var that = this;
    this.eventNameSpace = new Map();
    this.dataMap = new Map();
    opts.context = opts.context || document;
    opts.data = opts.data || null;
    opts.components = opts.components || [];
    this.options = opts;
    if (this.options.listener && Lego.Eventer) {
        for (var key in this.options.listener) {
            Lego.Eventer.on(key, this$1.options.listener[key].bind(this$1));
        }
    }
    if (typeof this.options.renderBefore == "function") {
        this.options.renderBefore = this.options.renderBefore.bind(this);
    }
    if (typeof this.options.renderAfter == "function") {
        this.options.renderAfter = this.options.renderAfter.bind(this);
    }
    this._renderRootNode();
    this.setElement(this.options.el);
    this._observe();
    if (!this.options.stopFetch) {
        this.fetch();
    }
};

View.prototype.makeDatamap = function makeDatamap(data, modelkey, defaultModel) {
    var this$1 = this;
    if (modelkey === void 0) modelkey = "id";
    if (defaultModel === void 0) defaultModel = {};
    if (Array.isArray(data)) {
        this.dataMap.clear();
        data.forEach(function(item, index) {
            if (typeof item == "object" && !Array.isArray(item)) {
                if (item[modelkey] || item[modelkey] == 0) {
                    item[modelkey] = item[modelkey].toString();
                    this$1.dataMap.set(item[modelkey], item);
                }
                for (var key in item) {
                    item[key] = typeof item[key] == "undefined" || item[key] == "null" ? defaultModel[key] : item[key];
                }
            }
        });
    }
    return data;
};

View.prototype.fetch = function fetch(opts) {
    var this$1 = this;
    if (opts === void 0) opts = {};
    var that = this;
    if (this.options.dataSource) {
        if (this.options.loading) {
            this._showLoading();
        }
        var dataSource = this.options.dataSource;
        var api = "";
        dataSource.api = Array.isArray(dataSource.api) ? dataSource.api : [ dataSource.api ];
        if (dataSource.api.length == 1) {
            api = dataSource.api[0];
        }
        dataSource.api.forEach(function(apiName) {
            dataSource[apiName] = Lego.extend({}, dataSource.server.options[apiName], dataSource[apiName] || {}, opts);
        });
        if (dataSource.server) {
            var server = null;
            if (typeof dataSource.server == "function") {
                server = new dataSource.server();
            } else {
                server = dataSource.server;
            }
            server.fetch(dataSource.api, dataSource.isAjax && window.$ ? dataSource : {}, function(resp) {
                if (api && Array.isArray(resp)) {
                    var modelkey = "id", defaultModel = {};
                    if (server.options[api]) {
                        modelkey = server.options[api].modelkey;
                        defaultModel = server.options[api].defaultModel;
                    }
                    this$1.options.data = this$1.makeDatamap(resp, modelkey, defaultModel);
                } else {
                    this$1.options.data = resp;
                }
                if (this$1.options.loading) {
                    this$1._hideLoading();
                }
                this$1.dataReady();
                this$1.refresh();
            }, this);
        }
    } else {
        this._renderComponents();
    }
};

View.prototype._showLoading = function _showLoading() {};

View.prototype._hideLoading = function _hideLoading() {};

View.prototype._renderRootNode = function _renderRootNode() {
    var this$1 = this;
    var opts = this.options;
    if (opts.renderBefore) {
        opts.renderBefore();
    }
    this.renderBefore();
    opts.data = typeof opts.data == "function" ? opts.data() : opts.data;
    opts.data = this.makeDatamap(opts.data);
    var content = this.render();
    if (content) {
        this.oldNode = content;
        this.rootNode = vdom.create(content);
        this.el = this.rootNode;
    } else {
        this.el = document.createElement("<div></div>");
    }
    if (opts.id || opts.el) {
        if (opts.id) {
            this.el.setAttribute("id", opts.id);
        } else {
            if (new RegExp(/#/).test(opts.el)) {
                var theId = opts.el.replace(/#/, "");
                this.el.setAttribute("id", theId);
                opts.id = theId;
            } else {
                this.el.setAttribute("id", opts.vid);
                opts.id = opts.vid;
            }
        }
    }
    this.el.setAttribute("view-id", opts.vid);
    if (opts.style) {
        for (var key in opts.style) {
            if (typeof opts.style[key] == "number") {
                opts.style[key] += "px";
            }
            this$1.el.style[key] = opts.style[key];
        }
    }
    if (opts.attr) {
        for (var key$1 in opts.attr) {
            this$1.el.setAttribute(key$1, opts.attr[key$1]);
        }
    }
    if (opts.className) {
        this.el.className += " " + opts.className;
    }
    if (window.$) {
        this.$el = window.$(this.el);
    }
};

View.prototype._renderComponents = function _renderComponents() {
    var that = this, opts = this.options;
    this.components();
    var components = this.options.components;
    components = Array.isArray(components) ? components : [ components ];
    if (components.length) {
        components.forEach(function(item, i) {
            if (that.$(item.el).length) {
                var tagName = item.el ? that.$(item.el)[0].tagName.toLowerCase() : "";
                if (tagName) {
                    item.context = that;
                    if (Lego.UI[tagName]) {
                        Lego.create(Lego.UI[tagName], item);
                    }
                }
            }
        });
    }
    if (opts.renderAfter) {
        opts.renderAfter();
    }
    this.renderAfter();
};

View.prototype.addCom = function addCom(comObjs) {
    var that = this;
    comObjs = Array.isArray(comObjs) ? comObjs : [ comObjs ];
    if (comObjs.length) {
        comObjs.forEach(function(com) {
            if (!com.el) {
                return;
            }
            var hasOne = that.options.components.find(function(item) {
                return item.el == com.el;
            });
            if (hasOne) {
                Object.assign(hasOne, com);
            } else {
                that.options.components.push(com);
            }
        });
    }
    return that.options.components;
};

View.prototype._observe = function _observe() {
    var this$1 = this;
    var that = this;
    if (this.options && typeof this.options === "object") {
        Object.observe(this.options, function(changes) {
            if (typeof this$1.options.data == "function") {
                this$1.options.data = this$1.options.data();
            }
            var newNode = this$1.render();
            var patches = vdom.diff(this$1.oldNode, newNode);
            this$1.rootNode = vdom.patch(this$1.rootNode, patches);
            this$1.el = this$1.rootNode;
            this$1.oldNode = newNode;
            this$1._renderComponents();
        });
    }
};

View.prototype.setElement = function setElement(el) {
    if (el) {
        var pEl = this.options.context.el || document, _el = typeof el == "string" ? pEl.querySelector(el) : el;
        if (!_el) {
            _el = document.querySelector(el);
        }
        if (el == "body") {
            this.options.insert = "html";
        }
        if (_el) {
            switch (this.options.insert) {
              case "html":
                var childs = _el.childNodes;
                for (var i = childs.length - 1; i >= 0; i--) {
                    _el.removeChild(childs.item(i));
                }
                _el.appendChild(this.el);
                break;

              case "append":
                _el.appendChild(this.el);
                break;

              case "prepend":
                _el.insertBefore(this.el, _el.childNodes[0]);
                break;

              default:
                _el.parentNode.replaceChild(this.el, _el);
            }
        }
    }
};

View.prototype.$ = function $(selector) {
    return this.$el ? this.$el.find(selector) : this.el.querySelectorAll(selector);
};

View.prototype.components = function components() {
    return this;
};

View.prototype.dataReady = function dataReady() {
    return this;
};

View.prototype.render = function render() {
    return "";
};

View.prototype.renderBefore = function renderBefore() {
    return this;
};

View.prototype.renderAfter = function renderAfter() {
    return this;
};

View.prototype.refresh = function refresh() {
    this.options.__v = Lego.randomKey();
};

View.prototype.remove = function remove() {
    if (this.$el) {
        this.$el.off();
        this.$el.remove();
    } else {
        this.el.remove();
    }
};

function __async(g) {
    return new Promise(function(s, j) {
        function c(a, x) {
            try {
                var r = g[x ? "throw" : "next"](a);
            } catch (e) {
                j(e);
                return;
            }
            r.done ? s(r.value) : Promise.resolve(r.value).then(c, d);
        }
        function d(e) {
            c(e, 1);
        }
        c();
    });
}

var Data = function Data(opts) {
    var this$1 = this;
    if (opts === void 0) opts = {};
    this.datas = new Map();
    for (var key in opts) {
        this$1.datas.set(key, {});
    }
    this.options = opts;
};

Data.prototype.fetch = function fetch(apis, opts, callback, view) {
    var that = this, apiArr = Array.isArray(apis) ? apis : [ apis ];
    if (opts.isAjax) {
        var apiName$0 = Array.isArray(apis) ? apis[0] : apis;
        var option = Lego.extend({
            reset: true
        }, that.options[apiName$0] || {}, view ? view.options.dataSource[apiName$0] || {} : {}, opts || {});
        if (window.$ || window.jQuery) {
            if (option.url.indexOf("http") < 0) {
                option.url = Lego.config.serviceUri + option.url;
            }
            function getData(option, apiName) {
                $.ajax(Lego.extend(option, {
                    success: function(result) {
                        if (result) {
                            that.datas.set(apiName, result);
                            if (typeof callback == "function") {
                                callback(that.parse(result, apiName, view));
                            }
                        }
                    },
                    error: function(xhr) {
                        debug.warn("login error: ", xhr);
                    }
                }));
            }
            if (!Lego.isEmptyObject(this.datas.get(apiName$0))) {
                if (option.reset) {
                    getData(option, apiName$0);
                } else {
                    if (typeof callback == "function") {
                        callback(this.parse(this.datas.get(apiName$0), apiName$0, view));
                    }
                }
            } else {
                getData(option, apiName$0);
            }
        }
    } else {
        this.__fetch(apis, opts, view).then(function(result) {
            apiArr.forEach(function(apiName, index) {
                that.datas.set(apiName, result[index]);
            });
            if (typeof callback == "function") {
                callback(that.parse(result.length == 1 ? result[0] : result, apiArr.join("_"), view));
            }
        });
    }
};

Data.prototype.__fetch = function __fetch(apis, opts, view) {
    return __async(regeneratorRuntime.mark(function callee$1$0() {
        var that, results, apiArr, promisesArr, promise, t$2$0, t$2$1, res;
        return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
            var this$1 = this;
            while (1) {
                switch (context$2$0.prev = context$2$0.next) {
                  case 0:
                    that = this$1, results = [], apiArr = Array.isArray(apis) ? apis : [ apis ];
                    context$2$0.prev = 1;
                    promisesArr = apiArr.map(function(apiName) {
                        return __async(regeneratorRuntime.mark(function callee$3$0() {
                            var data, option, url, headers, theBody, method, params, req, response;
                            return regeneratorRuntime.wrap(function callee$3$0$(context$4$0) {
                                while (1) {
                                    switch (context$4$0.prev = context$4$0.next) {
                                      case 0:
                                        data = that.datas.get(apiName) || {}, option = Lego.extend({
                                            reset: true
                                        }, that.options[apiName] || {}, view ? view.options.dataSource[apiName] || {} : {}, opts || {});
                                        if (!(!Lego.isEmptyObject(data) && !option.reset)) {
                                            context$4$0.next = 7;
                                            break;
                                        }
                                        context$4$0.next = 4;
                                        return data;

                                      case 4:
                                        return context$4$0.abrupt("return", context$4$0.sent);

                                      case 7:
                                        if (!(that.datas.has(apiName) && option.url && (Lego.isEmptyObject(data) || option.reset))) {
                                            context$4$0.next = 18;
                                            break;
                                        }
                                        url = /http/.test(option.url) ? option.url : Lego.config.serviceUri + option.url;
                                        headers = option.headers || {
                                            Accept: "application/json",
                                            "Content-type": "application/json; charset=UTF-8"
                                        };
                                        theBody = option.body || {};
                                        method = option.method || "POST";
                                        if (method == "GET") {
                                            params = Lego.param(theBody);
                                            if (url.indexOf("?") > 0) {
                                                url += "&" + params;
                                            } else {
                                                url += "?" + params;
                                            }
                                        }
                                        req = {
                                            method: method,
                                            headers: headers,
                                            mode: "same-origin",
                                            credentials: "include",
                                            body: method == "POST" ? JSON.stringify(theBody) : undefined
                                        };
                                        context$4$0.next = 16;
                                        return fetch(url, req);

                                      case 16:
                                        response = context$4$0.sent;
                                        return context$4$0.abrupt("return", response.json());

                                      case 18:
                                      case "end":
                                        return context$4$0.stop();
                                    }
                                }
                            }, callee$3$0, this);
                        })());
                    });
                    t$2$0 = regeneratorRuntime.values(promisesArr);

                  case 4:
                    if ((t$2$1 = t$2$0.next()).done) {
                        context$2$0.next = 12;
                        break;
                    }
                    promise = t$2$1.value;
                    context$2$0.next = 8;
                    return promise;

                  case 8:
                    res = context$2$0.sent;
                    results.push(res);

                  case 10:
                    context$2$0.next = 4;
                    break;

                  case 12:
                    context$2$0.next = 17;
                    break;

                  case 14:
                    context$2$0.prev = 14;
                    context$2$0.t0 = context$2$0["catch"](1);
                    debug.log("data has error:", context$2$0.t0);

                  case 17:
                    return context$2$0.abrupt("return", results);

                  case 18:
                  case "end":
                    return context$2$0.stop();
                }
            }
        }, callee$1$0, this, [ [ 1, 14 ] ]);
    }).call(this));
};

Data.prototype.parse = function parse(datas, apiName, view) {
    if (typeof this[apiName] == "function") {
        return this[apiName](datas, view);
    }
    return datas;
};

Data.prototype.getData = function getData(apiName) {
    if (apiName) {
        return this.datas.get(apiName) ? this.datas.get(apiName) : {};
    } else {
        return this.datas;
    }
};

var Event = function Event(opts) {
    if (opts === void 0) opts = {};
    var that = this;
    this.listener = new Map();
};

Event.prototype.on = function on(eventName, callback) {
    if (eventName) {
        if (typeof callback !== "function") {
            return;
        }
        var eventFunName = Symbol(callback.name).toString();
        if (eventName.indexOf(".") >= 0) {
            var eventsArr = eventName.split(".");
            eventName = eventsArr.shift();
            eventFunName = eventsArr.join(".");
        }
        if (this.listener.has(eventName)) {
            var listenerMap = this.listener.get(eventName);
            if (listenerMap.has(eventFunName)) {
                var listenerArr = listenerMap.get(eventFunName);
                listenerArr.push(callback);
            } else {
                listenerMap.set(eventFunName, [ callback ]);
            }
        } else {
            var listenerMap$1 = new Map();
            listenerMap$1.set(eventFunName, [ callback ]);
            this.listener.set(eventName, listenerMap$1);
        }
    }
};

Event.prototype.off = function off(eventName) {
    if (eventName) {
        if (eventName.indexOf(".") >= 0) {
            var eventsArr = eventName.split(".");
            eventName = eventsArr.shift();
            eventFunName = eventsArr.join(".");
            if (this.listener.has(eventName)) {
                var listenerMap = this.listener.get(eventName);
                if (listenerMap.has(eventFunName)) {
                    listenerMap.delete(eventFunName);
                }
            }
        } else {
            if (this.listener.has(eventName)) {
                this.listener.delete(eventName);
            }
        }
    } else {
        this.listener.clear();
    }
};

Event.prototype.trigger = function trigger() {
    var this$1 = this;
    var args = [], len = arguments.length;
    while (len--) args[len] = arguments[len];
    if (args.length) {
        var eventName = args.shift(), eventFunName = "";
        if (eventName.indexOf(".") >= 0) {
            var eventsArr = eventName.split(".");
            eventName = eventsArr.shift();
            eventFunName = eventsArr.join(".");
        }
        if (this.listener.has(eventName)) {
            var listenerMap = this.listener.get(eventName);
            if (eventFunName) {
                var listenerArr = listenerMap.get(eventFunName);
                listenerArr.forEach(function(listener) {
                    if (typeof listener == "function") {
                        listener.apply(this$1, args);
                    }
                });
            } else {
                listenerMap.forEach(function(listenerArr, key) {
                    listenerArr.forEach(function(listener) {
                        if (typeof listener == "function") {
                            listener.apply(this$1, args);
                        }
                    });
                });
            }
        }
    }
};

!function(global) {
    "use strict";
    var hasOwn = Object.prototype.hasOwnProperty;
    var undefined;
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    var inModule = typeof module === "object";
    var runtime = global.regeneratorRuntime;
    if (runtime) {
        if (inModule) {
            module.exports = runtime;
        }
        return;
    }
    runtime = global.regeneratorRuntime = inModule ? module.exports : {};
    function wrap(innerFn, outerFn, self, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []);
        generator._invoke = makeInvokeMethod(innerFn, self, context);
        return generator;
    }
    runtime.wrap = wrap;
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    }
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";
    function defineIteratorMethods(prototype) {
        [ "next", "throw", "return" ].forEach(function(method) {
            prototype[method] = function(arg) {
                return this._invoke(method, arg);
            };
        });
    }
    runtime.isGeneratorFunction = function(genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };
    runtime.mark = function(genFun) {
        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        } else {
            genFun.__proto__ = GeneratorFunctionPrototype;
            if (!(toStringTagSymbol in genFun)) {
                genFun[toStringTagSymbol] = "GeneratorFunction";
            }
        }
        genFun.prototype = Object.create(Gp);
        return genFun;
    };
    runtime.awrap = function(arg) {
        return new AwaitArgument(arg);
    };
    function AwaitArgument(arg) {
        this.arg = arg;
    }
    function AsyncIterator(generator) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if (record.type === "throw") {
                reject(record.arg);
            } else {
                var result = record.arg;
                var value = result.value;
                if (value instanceof AwaitArgument) {
                    return Promise.resolve(value.arg).then(function(value) {
                        invoke("next", value, resolve, reject);
                    }, function(err) {
                        invoke("throw", err, resolve, reject);
                    });
                }
                return Promise.resolve(value).then(function(unwrapped) {
                    result.value = unwrapped;
                    resolve(result);
                }, reject);
            }
        }
        if (typeof process === "object" && process.domain) {
            invoke = process.domain.bind(invoke);
        }
        var previousPromise;
        function enqueue(method, arg) {
            function callInvokeWithMethodAndArg() {
                return new Promise(function(resolve, reject) {
                    invoke(method, arg, resolve, reject);
                });
            }
            return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
        this._invoke = enqueue;
    }
    defineIteratorMethods(AsyncIterator.prototype);
    runtime.async = function(innerFn, outerFn, self, tryLocsList) {
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
        return runtime.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    };
    function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;
        return function invoke(method, arg) {
            if (state === GenStateExecuting) {
                throw new Error("Generator is already running");
            }
            if (state === GenStateCompleted) {
                if (method === "throw") {
                    throw arg;
                }
                return doneResult();
            }
            while (true) {
                var delegate = context.delegate;
                if (delegate) {
                    if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
                        context.delegate = null;
                        var returnMethod = delegate.iterator["return"];
                        if (returnMethod) {
                            var record = tryCatch(returnMethod, delegate.iterator, arg);
                            if (record.type === "throw") {
                                method = "throw";
                                arg = record.arg;
                                continue;
                            }
                        }
                        if (method === "return") {
                            continue;
                        }
                    }
                    var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);
                    if (record.type === "throw") {
                        context.delegate = null;
                        method = "throw";
                        arg = record.arg;
                        continue;
                    }
                    method = "next";
                    arg = undefined;
                    var info = record.arg;
                    if (info.done) {
                        context[delegate.resultName] = info.value;
                        context.next = delegate.nextLoc;
                    } else {
                        state = GenStateSuspendedYield;
                        return info;
                    }
                    context.delegate = null;
                }
                if (method === "next") {
                    context.sent = context._sent = arg;
                } else if (method === "throw") {
                    if (state === GenStateSuspendedStart) {
                        state = GenStateCompleted;
                        throw arg;
                    }
                    if (context.dispatchException(arg)) {
                        method = "next";
                        arg = undefined;
                    }
                } else if (method === "return") {
                    context.abrupt("return", arg);
                }
                state = GenStateExecuting;
                var record = tryCatch(innerFn, self, context);
                if (record.type === "normal") {
                    state = context.done ? GenStateCompleted : GenStateSuspendedYield;
                    var info = {
                        value: record.arg,
                        done: context.done
                    };
                    if (record.arg === ContinueSentinel) {
                        if (context.delegate && method === "next") {
                            arg = undefined;
                        }
                    } else {
                        return info;
                    }
                } else if (record.type === "throw") {
                    state = GenStateCompleted;
                    method = "throw";
                    arg = record.arg;
                }
            }
        };
    }
    defineIteratorMethods(Gp);
    Gp[iteratorSymbol] = function() {
        return this;
    };
    Gp[toStringTagSymbol] = "Generator";
    Gp.toString = function() {
        return "[object Generator]";
    };
    function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        if (1 in locs) {
            entry.catchLoc = locs[1];
        }
        if (2 in locs) {
            entry.finallyLoc = locs[2];
            entry.afterLoc = locs[3];
        }
        this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
    }
    function Context(tryLocsList) {
        this.tryEntries = [ {
            tryLoc: "root"
        } ];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
    }
    runtime.keys = function(object) {
        var keys = [];
        for (var key in object) {
            keys.push(key);
        }
        keys.reverse();
        return function next() {
            while (keys.length) {
                var key = keys.pop();
                if (key in object) {
                    next.value = key;
                    next.done = false;
                    return next;
                }
            }
            next.done = true;
            return next;
        };
    };
    function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) {
                return iteratorMethod.call(iterable);
            }
            if (typeof iterable.next === "function") {
                return iterable;
            }
            if (!isNaN(iterable.length)) {
                var i = -1, next = function next() {
                    while (++i < iterable.length) {
                        if (hasOwn.call(iterable, i)) {
                            next.value = iterable[i];
                            next.done = false;
                            return next;
                        }
                    }
                    next.value = undefined;
                    next.done = true;
                    return next;
                };
                return next.next = next;
            }
        }
        return {
            next: doneResult
        };
    }
    runtime.values = values;
    function doneResult() {
        return {
            value: undefined,
            done: true
        };
    }
    Context.prototype = {
        constructor: Context,
        reset: function(skipTempReset) {
            var this$1 = this;
            this.prev = 0;
            this.next = 0;
            this.sent = this._sent = undefined;
            this.done = false;
            this.delegate = null;
            this.tryEntries.forEach(resetTryEntry);
            if (!skipTempReset) {
                for (var name in this) {
                    if (name.charAt(0) === "t" && hasOwn.call(this$1, name) && !isNaN(+name.slice(1))) {
                        this$1[name] = undefined;
                    }
                }
            }
        },
        stop: function() {
            this.done = true;
            var rootEntry = this.tryEntries[0];
            var rootRecord = rootEntry.completion;
            if (rootRecord.type === "throw") {
                throw rootRecord.arg;
            }
            return this.rval;
        },
        dispatchException: function(exception) {
            var this$1 = this;
            if (this.done) {
                throw exception;
            }
            var context = this;
            function handle(loc, caught) {
                record.type = "throw";
                record.arg = exception;
                context.next = loc;
                return !!caught;
            }
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this$1.tryEntries[i];
                var record = entry.completion;
                if (entry.tryLoc === "root") {
                    return handle("end");
                }
                if (entry.tryLoc <= this$1.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc");
                    var hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this$1.prev < entry.catchLoc) {
                            return handle(entry.catchLoc, true);
                        } else if (this$1.prev < entry.finallyLoc) {
                            return handle(entry.finallyLoc);
                        }
                    } else if (hasCatch) {
                        if (this$1.prev < entry.catchLoc) {
                            return handle(entry.catchLoc, true);
                        }
                    } else if (hasFinally) {
                        if (this$1.prev < entry.finallyLoc) {
                            return handle(entry.finallyLoc);
                        }
                    } else {
                        throw new Error("try statement without catch or finally");
                    }
                }
            }
        },
        abrupt: function(type, arg) {
            var this$1 = this;
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this$1.tryEntries[i];
                if (entry.tryLoc <= this$1.prev && hasOwn.call(entry, "finallyLoc") && this$1.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
                finallyEntry = null;
            }
            var record = finallyEntry ? finallyEntry.completion : {};
            record.type = type;
            record.arg = arg;
            if (finallyEntry) {
                this.next = finallyEntry.finallyLoc;
            } else {
                this.complete(record);
            }
            return ContinueSentinel;
        },
        complete: function(record, afterLoc) {
            if (record.type === "throw") {
                throw record.arg;
            }
            if (record.type === "break" || record.type === "continue") {
                this.next = record.arg;
            } else if (record.type === "return") {
                this.rval = record.arg;
                this.next = "end";
            } else if (record.type === "normal" && afterLoc) {
                this.next = afterLoc;
            }
        },
        finish: function(finallyLoc) {
            var this$1 = this;
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this$1.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) {
                    this$1.complete(entry.completion, entry.afterLoc);
                    resetTryEntry(entry);
                    return ContinueSentinel;
                }
            }
        },
        catch: function(tryLoc) {
            var this$1 = this;
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this$1.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if (record.type === "throw") {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            throw new Error("illegal catch attempt");
        },
        delegateYield: function(iterable, resultName, nextLoc) {
            this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            };
            return ContinueSentinel;
        }
    };
}(typeof global === "object" ? global : typeof window === "object" ? window : typeof self === "object" ? self : undefined);

LegoCore$1.View = View;

LegoCore$1.Data = Data;

LegoCore$1.Event = Event;

LegoCore$1.Ux = {};

LegoCore$1.Eventer = new Event();

module.exports = LegoCore$1;
