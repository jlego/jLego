/**
 * lego.js v0.0.6
 * (c) 2016 Evan You
 * @license MIT
 */
"use strict";

function _interopDefault(ex) {
    return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
}

var babelPolyfill = require("babel-polyfill");

var Events = _interopDefault(require("events"));

var director = require("director");

var h = _interopDefault(require("virtual-dom/h"));

var diff = _interopDefault(require("virtual-dom/diff"));

var createElement = _interopDefault(require("virtual-dom/create-element"));

var patch = _interopDefault(require("virtual-dom/patch"));

var Util = {};

var Lego = function Lego(options) {
    if (options === void 0) options = {};
    this.h = h;
    this.createElement = createElement;
    this.diff = diff;
    this.patch = patch;
    this.util = Util;
    var that = this;
    this.config = {
        alias: "Lego",
        version: "1.0.0",
        $: null,
        isDebug: true,
        isAnimate: false,
        isPermit: false,
        isMultiWindow: false,
        pageEl: "",
        defaultApp: "",
        rootUri: "",
        routerConfig: {},
        screenWidth: window.innerWidth
    };
    Object.assign(this.config, options);
    this._debugger();
    if (this.config.$) {
        window.$ = this.$ = this.config.$;
    } else {
        debug.error("请先设置参数$");
        return;
    }
    this.BaseEvent = Events;
    this.Eventer = new Events();
    this.views = new Map();
    this.permis = {};
    this.datas = {};
    this.Router = director.Router({}).init();
    window[this.config.alias] = window.Lego = this;
    return this;
};

Lego.prototype.create = function create(options) {
    if (options === void 0) options = {};
    var that = this, defaults = {
        alias: "",
        el: this.config.pageEl,
        inset: "html",
        config: {},
        permis: null,
        view: null,
        animate: undefined,
        events: null,
        items: [],
        onBefore: function onBefore$1() {},
        onAfter: function onAfter$1() {},
        onAnimateBefore: function onAnimateBefore$1() {},
        onAnimateAfter: function onAnimateAfter$1() {}
    };
    Object.assign(defaults, options);
    defaults.data = options.data || null;
    if (!defaults.el) {
        return;
    }
    var alias = defaults.alias || Symbol(), el = defaults.el, onBefore = defaults.onBefore.bind(this), onAfter = defaults.onAfter.bind(this), onAnimateBefore = defaults.onAnimateBefore.bind(this), onAnimateAfter = defaults.onAnimateAfter.bind(this), $el = el instanceof this.$ ? el : that.$(el);
    if (defaults.permis) {
        var module = defaults.permis.module, operate = defaults.permis.operate, hide = defaults.permis.hide, userId = defaults.permis.userid || 0;
        if (hide) {
            if (!this.permis.check(module, operate, userId)) {
                return;
            }
        }
    }
    typeof onBefore === "function" && onBefore();
    var viewObj;
    if (!this.views.get(alias)) {
        viewObj = new defaults.view(defaults);
        defaults.events = this.$.extend(viewObj.options.events, defaults.events);
        this.views.set(alias, viewObj);
        $el[defaults.inset](viewObj.render());
        if (defaults.events) {
            var eventSplitter = /\s+/;
            var loop = function(key) {
                var callback = viewObj[defaults.events[key]];
                if (eventSplitter.test(key)) {
                    var nameArr = key.split(eventSplitter);
                    if ($el.find(nameArr[1]).length) {
                        key = nameArr[0];
                        $el = $el.find(nameArr[1]);
                    } else {
                        return;
                    }
                }
                $el.off(key).on(key, function(event, a, b, c) {
                    if (typeof callback == "function") {
                        callback(event, a, b, c);
                    }
                });
            };
            for (var key in defaults.events) loop(key);
        }
    } else {
        viewObj = this.views.get(alias);
        $el[defaults.inset](viewObj.render());
    }
    if (defaults.items.length) {
        defaults.items.forEach(function(item, i) {
            that.create(item);
        });
    }
    typeof onAfter === "function" && onAfter();
    return $el;
};

Lego.prototype._debugger = function _debugger() {
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

Lego.prototype.loadApp = function loadApp(appPath, option) {
    if (option === void 0) option = {};
    var defaults = {
        onBefore: function() {},
        onAfter: function() {}
    }, that = this, appName, index, currentApp;
    Object.assign(defaults, option);
    appPath = appPath || currentApp || this.config.defaultApp;
    index = appPath.indexOf("/");
    appName = index >= 0 ? appPath.substr(0, index) || appPath.substr(1, index) : appPath;
    this.datas[appName] = this.datas[appName] || new Map();
    if (typeof defaults.onBefore == "function") {
        defaults.onBefore();
    }
    this.$(this.config.pageEl).scrollTop(0);
    this.$.ajax({
        type: "GET",
        url: this.config.rootUri + appName + "/app.js?" + this.config.version,
        dataType: "script",
        crossDomain: true,
        cache: true,
        success: function(e) {
            that.Router = director.Router(that["app"]).init();
            that.Router.setRoute(appPath);
            if (typeof defaults.onAfter == "function") {
                defaults.onAfter(e);
            }
            that["app"] = null;
        },
        error: function(e) {
            debug.warn("加载应用模块失败");
        }
    });
};

Lego.prototype.getUrlParam = function getUrlParam(name) {
    window.pageParams = {};
    if (window.pageParams[name]) {
        return window.pageParams[name];
    }
    var url = decodeURI(document.location.search);
    if (url.indexOf("||") >= 0) {
        url = url.replace(/\|\|/g, "//");
    }
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

Lego.prototype.currentApp = function currentApp() {
    var hash = window.location.hash.replace(/#/, "");
    if (hash.indexOf("/") == 0) {
        hash = hash.replace(/\//, "");
    }
    var hashArr = hash.split("/");
    return hashArr[0];
};

Lego.prototype.getData = function getData(apiName, appName) {
    if (appName === void 0) appName = this.currentApp();
    if (apiName) {
        return this.datas[appName].get(apiName).data;
    } else {
        return this.datas[appName];
    }
};

module.exports = Lego;
