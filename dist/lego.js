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

var Lego = function Lego(option) {
    if (option === void 0) option = {};
    var that = this;
    this.config = {
        version: "1.0.0",
        isDebug: true,
        $: null,
        hasAnimate: false,
        hasPermit: false,
        pageEl: "",
        defaultApp: "",
        rootUri: "",
        routerConfig: {},
        screenWidth: window.innerWidth
    };
    Object.assign(this.config, option);
    this._debugger();
    if (this.config.$) {
        window.$ = this.$ = this.config.$;
    } else {
        debug.error("请先设置参数$");
        return;
    }
    this.BaseEvent = Events;
    this.Events = new Events();
    this.Router = director.Router({}).init();
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
    }, that = this, appName, index;
    Object.assign(defaults, option);
    appPath = appPath || window.location.hash.replace(/#/, "") || this.config.defaultApp;
    index = appPath.indexOf("/");
    appName = index >= 0 ? appPath.substr(0, index) || appPath.substr(1, index) : appPath;
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

Lego.prototype.currentModule = function currentModule() {
    var hash = window.location.hash.replace(/#/, ""), hashArr = hash.split("/");
    return hashArr[0];
};

module.exports = Lego;
