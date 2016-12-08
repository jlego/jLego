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
    this.currentApp = "index";
    this.BaseEvent = Events;
    this.Eventer = new Events();
    this.views = {};
    this.permis = {};
    this.datas = {};
    this.Router = director.Router({}).init();
    window[this.config.alias] = window.Lego = this;
    this.startApp(this.currentApp);
    return this;
};

Lego.prototype.create = function create(opts) {
    var this$1 = this;
    if (opts === void 0) opts = {};
    var that = this, options = {
        alias: "",
        el: this.config.pageEl,
        inset: "html",
        config: {},
        permis: null,
        view: null,
        animate: undefined,
        events: null,
        listen: null,
        items: [],
        onBefore: function onBefore$1() {},
        onAfter: function onAfter$1() {},
        onAnimateBefore: function onAnimateBefore$1() {},
        onAnimateAfter: function onAnimateAfter$1() {}
    };
    Object.assign(options, opts);
    options.data = opts.data || null;
    if (!options.el) {
        return;
    }
    var alias = options.alias || Symbol(), el = options.el, onBefore = options.onBefore.bind(this), onAfter = options.onAfter.bind(this), onAnimateBefore = options.onAnimateBefore.bind(this), onAnimateAfter = options.onAnimateAfter.bind(this), $el = el instanceof this.$ ? el : that.$(el);
    if (options.permis) {
        var module = options.permis.module, operate = options.permis.operate, hide = options.permis.hide, userId = options.permis.userid || 0;
        if (hide) {
            if (!this.permis.check(module, operate, userId)) {
                return;
            }
        }
    }
    typeof onBefore === "function" && onBefore();
    var viewObj;
    if (!this.getView(alias)) {
        viewObj = new options.view(options);
        this.views[this.currentApp].set(alias, viewObj);
    } else {
        viewObj = this.getView(alias);
    }
    $el[options.inset](viewObj.render());
    options.events = this.$.extend(viewObj.options.events, options.events);
    if (options.events) {
        var eventSplitter = /\s+/;
        var loop = function(key) {
            var callback = viewObj[options.events[key]];
            var _els = void 0;
            if (eventSplitter.test(key)) {
                var nameArr = key.split(eventSplitter);
                var selectorStr = nameArr.slice(1).join(" ");
                _els = $el.find(selectorStr);
                if (_els.length) {
                    key = nameArr[0];
                } else {
                    return;
                }
            }
            if (_els.length) {
                _els.each(function(index, el) {
                    $(el).off(key).on(key, function(event, a, b, c) {
                        if (typeof callback == "function") {
                            callback(event, a, b, c);
                        }
                    });
                });
            }
        };
        for (var key in options.events) loop(key);
    }
    options.listen = this.$.extend(viewObj.options.listen, options.listen);
    if (options.listen) {
        for (var key$1 in options.listen) {
            this$1.Eventer.removeListener(key$1, options.listen[key$1]);
            this$1.Eventer.on(key$1, options.listen[key$1]);
        }
    }
    if (options.items.length) {
        options.items.forEach(function(item, i) {
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

Lego.prototype.startApp = function startApp(appPath, opts) {
    if (opts === void 0) opts = {};
    var options = {
        onBefore: function onBefore() {},
        onAfter: function onAfter() {}
    }, that = this, appName, index;
    Object.assign(options, opts);
    var hash = window.location.hash.replace(/#/, "") || this.Router.getRoute()[0];
    var newHash = hash.indexOf("/") == 0 ? hash.replace(/\//, "") : "";
    newHash = newHash !== "index" ? newHash : "";
    appPath = appPath || newHash || this.config.defaultApp;
    appName = appPath.indexOf("/") > 0 ? appPath.split("/")[0] : appPath;
    this.currentApp = appName;
    this.views[appName] = this.views[appName] || new Map();
    this.datas[appName] = this.datas[appName] || new Map();
    if (typeof options.onBefore == "function") {
        options.onBefore();
    }
    this.$(this.config.pageEl).scrollTop(0);
    this.$.ajax({
        type: "GET",
        url: this.config.rootUri + appName + "/app.js?" + this.config.version,
        dataType: "script",
        crossDomain: true,
        cache: true,
        success: function(e) {
            if (appPath && appPath !== "index") {
                that.Router = director.Router(that["app"]).init();
                that.Router.setRoute(appPath);
            }
            if (typeof options.onAfter == "function") {
                options.onAfter(e);
            }
            that["app"] = null;
        },
        error: function(e) {
            debug.error("Failed to load application module!");
        }
    });
};

Lego.prototype.getUrlParam = function getUrlParam(name) {
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

Lego.prototype.trigger = function trigger(event, data) {
    this.Eventer.emit(event, data);
};

Lego.prototype.getAppName = function getAppName() {
    var appName = this.Router.getRoute()[0] !== "index" ? this.Router.getRoute()[0] : "";
    return appName || this.config.defaultApp;
};

Lego.prototype.getData = function getData(apiName, appName) {
    if (appName === void 0) appName = this.getAppName();
    if (apiName) {
        return this.datas[appName].get(apiName) ? this.datas[appName].get(apiName).data : {};
    } else {
        return this.datas[appName];
    }
};

Lego.prototype.getView = function getView(alias, appName) {
    if (appName === void 0) appName = this.getAppName();
    if (this.views[appName]) {
        if (alias) {
            return this.views[appName].get(alias) ? this.views[appName].get(alias) : null;
        } else {
            return this.views[appName];
        }
    }
    return null;
};

module.exports = Lego;
