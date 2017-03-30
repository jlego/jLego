(function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = true;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.i = function(value) {
        return value;
    };
    __webpack_require__.d = function(exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, {
                configurable: false,
                enumerable: true,
                get: getter
            });
        }
    };
    __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function getDefault() {
            return module["default"];
        } : function getModuleExports() {
            return module;
        };
        __webpack_require__.d(getter, "a", getter);
        return getter;
    };
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    __webpack_require__.p = "./dist/";
    return __webpack_require__(__webpack_require__.s = 28);
})([ function(module, exports) {
    module.exports = isWidget;
    function isWidget(w) {
        return w && w.type === "Widget";
    }
}, function(module, exports, __webpack_require__) {
    var version = __webpack_require__(2);
    module.exports = isVirtualNode;
    function isVirtualNode(x) {
        return x && x.type === "VirtualNode" && x.version === version;
    }
}, function(module, exports) {
    module.exports = "2";
}, function(module, exports) {
    module.exports = isThunk;
    function isThunk(t) {
        return t && t.type === "Thunk";
    }
}, function(module, exports) {
    module.exports = isHook;
    function isHook(hook) {
        return hook && (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") || typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"));
    }
}, function(module, exports, __webpack_require__) {
    var version = __webpack_require__(2);
    module.exports = isVirtualText;
    function isVirtualText(x) {
        return x && x.type === "VirtualText" && x.version === version;
    }
}, function(module, exports) {
    var g;
    g = function() {
        return this;
    }();
    try {
        g = g || Function("return this")() || (1, eval)("this");
    } catch (e) {
        if (typeof window === "object") g = window;
    }
    module.exports = g;
}, function(module, exports) {
    var nativeIsArray = Array.isArray;
    var toString = Object.prototype.toString;
    module.exports = nativeIsArray || isArray;
    function isArray(obj) {
        return toString.call(obj) === "[object Array]";
    }
}, function(module, exports) {
    var process = module.exports = {};
    var cachedSetTimeout;
    var cachedClearTimeout;
    function defaultSetTimout() {
        throw new Error("setTimeout has not been defined");
    }
    function defaultClearTimeout() {
        throw new Error("clearTimeout has not been defined");
    }
    (function() {
        try {
            if (typeof setTimeout === "function") {
                cachedSetTimeout = setTimeout;
            } else {
                cachedSetTimeout = defaultSetTimout;
            }
        } catch (e) {
            cachedSetTimeout = defaultSetTimout;
        }
        try {
            if (typeof clearTimeout === "function") {
                cachedClearTimeout = clearTimeout;
            } else {
                cachedClearTimeout = defaultClearTimeout;
            }
        } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
        }
    })();
    function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
            return setTimeout(fun, 0);
        }
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
        }
        try {
            return cachedSetTimeout(fun, 0);
        } catch (e) {
            try {
                return cachedSetTimeout.call(null, fun, 0);
            } catch (e) {
                return cachedSetTimeout.call(this, fun, 0);
            }
        }
    }
    function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
            return clearTimeout(marker);
        }
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
        }
        try {
            return cachedClearTimeout(marker);
        } catch (e) {
            try {
                return cachedClearTimeout.call(null, marker);
            } catch (e) {
                return cachedClearTimeout.call(this, marker);
            }
        }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;
    function cleanUpNextTick() {
        if (!draining || !currentQueue) {
            return;
        }
        draining = false;
        if (currentQueue.length) {
            queue = currentQueue.concat(queue);
        } else {
            queueIndex = -1;
        }
        if (queue.length) {
            drainQueue();
        }
    }
    function drainQueue() {
        if (draining) {
            return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;
        var len = queue.length;
        while (len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
                if (currentQueue) {
                    currentQueue[queueIndex].run();
                }
            }
            queueIndex = -1;
            len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
    }
    process.nextTick = function(fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                args[i - 1] = arguments[i];
            }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
        }
    };
    function Item(fun, array) {
        this.fun = fun;
        this.array = array;
    }
    Item.prototype.run = function() {
        this.fun.apply(null, this.array);
    };
    process.title = "browser";
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = "";
    process.versions = {};
    function noop() {}
    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.binding = function(name) {
        throw new Error("process.binding is not supported");
    };
    process.cwd = function() {
        return "/";
    };
    process.chdir = function(dir) {
        throw new Error("process.chdir is not supported");
    };
    process.umask = function() {
        return 0;
    };
}, function(module, exports, __webpack_require__) {
    (function(global) {
        var topLevel = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : {};
        var minDoc = __webpack_require__(56);
        if (typeof document !== "undefined") {
            module.exports = document;
        } else {
            var doccy = topLevel["__GLOBAL_DOCUMENT_CACHE@4"];
            if (!doccy) {
                doccy = topLevel["__GLOBAL_DOCUMENT_CACHE@4"] = minDoc;
            }
            module.exports = doccy;
        }
    }).call(exports, __webpack_require__(6));
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = function isObject(x) {
        return typeof x === "object" && x !== null;
    };
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(10);
    var isHook = __webpack_require__(4);
    module.exports = applyProperties;
    function applyProperties(node, props, previous) {
        for (var propName in props) {
            var propValue = props[propName];
            if (propValue === undefined) {
                removeProperty(node, propName, propValue, previous);
            } else if (isHook(propValue)) {
                removeProperty(node, propName, propValue, previous);
                if (propValue.hook) {
                    propValue.hook(node, propName, previous ? previous[propName] : undefined);
                }
            } else {
                if (isObject(propValue)) {
                    patchObject(node, props, previous, propName, propValue);
                } else {
                    node[propName] = propValue;
                }
            }
        }
    }
    function removeProperty(node, propName, propValue, previous) {
        if (previous) {
            var previousValue = previous[propName];
            if (!isHook(previousValue)) {
                if (propName === "attributes") {
                    for (var attrName in previousValue) {
                        node.removeAttribute(attrName);
                    }
                } else if (propName === "style") {
                    for (var i in previousValue) {
                        node.style[i] = "";
                    }
                } else if (typeof previousValue === "string") {
                    node[propName] = "";
                } else {
                    node[propName] = null;
                }
            } else if (previousValue.unhook) {
                previousValue.unhook(node, propName, propValue);
            }
        }
    }
    function patchObject(node, props, previous, propName, propValue) {
        var previousValue = previous ? previous[propName] : undefined;
        if (propName === "attributes") {
            for (var attrName in propValue) {
                var attrValue = propValue[attrName];
                if (attrValue === undefined) {
                    node.removeAttribute(attrName);
                } else {
                    node.setAttribute(attrName, attrValue);
                }
            }
            return;
        }
        if (previousValue && isObject(previousValue) && getPrototype(previousValue) !== getPrototype(propValue)) {
            node[propName] = propValue;
            return;
        }
        if (!isObject(node[propName])) {
            node[propName] = {};
        }
        var replacer = propName === "style" ? "" : undefined;
        for (var k in propValue) {
            var value = propValue[k];
            node[propName][k] = value === undefined ? replacer : value;
        }
    }
    function getPrototype(value) {
        if (Object.getPrototypeOf) {
            return Object.getPrototypeOf(value);
        } else if (value.__proto__) {
            return value.__proto__;
        } else if (value.constructor) {
            return value.constructor.prototype;
        }
    }
}, function(module, exports, __webpack_require__) {
    var document = __webpack_require__(9);
    var applyProperties = __webpack_require__(11);
    var isVNode = __webpack_require__(1);
    var isVText = __webpack_require__(5);
    var isWidget = __webpack_require__(0);
    var handleThunk = __webpack_require__(13);
    module.exports = createElement;
    function createElement(vnode, opts) {
        var doc = opts ? opts.document || document : document;
        var warn = opts ? opts.warn : null;
        vnode = handleThunk(vnode).a;
        if (isWidget(vnode)) {
            return vnode.init();
        } else if (isVText(vnode)) {
            return doc.createTextNode(vnode.text);
        } else if (!isVNode(vnode)) {
            if (warn) {
                warn("Item is not a valid virtual dom node", vnode);
            }
            return null;
        }
        var node = vnode.namespace === null ? doc.createElement(vnode.tagName) : doc.createElementNS(vnode.namespace, vnode.tagName);
        var props = vnode.properties;
        applyProperties(node, props);
        var children = vnode.children;
        for (var i = 0; i < children.length; i++) {
            var childNode = createElement(children[i], opts);
            if (childNode) {
                node.appendChild(childNode);
            }
        }
        return node;
    }
}, function(module, exports, __webpack_require__) {
    var isVNode = __webpack_require__(1);
    var isVText = __webpack_require__(5);
    var isWidget = __webpack_require__(0);
    var isThunk = __webpack_require__(3);
    module.exports = handleThunk;
    function handleThunk(a, b) {
        var renderedA = a;
        var renderedB = b;
        if (isThunk(b)) {
            renderedB = renderThunk(b, a);
        }
        if (isThunk(a)) {
            renderedA = renderThunk(a, null);
        }
        return {
            a: renderedA,
            b: renderedB
        };
    }
    function renderThunk(thunk, previous) {
        var renderedThunk = thunk.vnode;
        if (!renderedThunk) {
            renderedThunk = thunk.vnode = thunk.render(previous);
        }
        if (!(isVNode(renderedThunk) || isVText(renderedThunk) || isWidget(renderedThunk))) {
            throw new Error("thunk did not return a valid node");
        }
        return renderedThunk;
    }
}, function(module, exports, __webpack_require__) {
    var version = __webpack_require__(2);
    var isVNode = __webpack_require__(1);
    var isWidget = __webpack_require__(0);
    var isThunk = __webpack_require__(3);
    var isVHook = __webpack_require__(4);
    module.exports = VirtualNode;
    var noProperties = {};
    var noChildren = [];
    function VirtualNode(tagName, properties, children, key, namespace) {
        this.tagName = tagName;
        this.properties = properties || noProperties;
        this.children = children || noChildren;
        this.key = key != null ? String(key) : undefined;
        this.namespace = typeof namespace === "string" ? namespace : null;
        var count = children && children.length || 0;
        var descendants = 0;
        var hasWidgets = false;
        var hasThunks = false;
        var descendantHooks = false;
        var hooks;
        for (var propName in properties) {
            if (properties.hasOwnProperty(propName)) {
                var property = properties[propName];
                if (isVHook(property) && property.unhook) {
                    if (!hooks) {
                        hooks = {};
                    }
                    hooks[propName] = property;
                }
            }
        }
        for (var i = 0; i < count; i++) {
            var child = children[i];
            if (isVNode(child)) {
                descendants += child.count || 0;
                if (!hasWidgets && child.hasWidgets) {
                    hasWidgets = true;
                }
                if (!hasThunks && child.hasThunks) {
                    hasThunks = true;
                }
                if (!descendantHooks && (child.hooks || child.descendantHooks)) {
                    descendantHooks = true;
                }
            } else if (!hasWidgets && isWidget(child)) {
                if (typeof child.destroy === "function") {
                    hasWidgets = true;
                }
            } else if (!hasThunks && isThunk(child)) {
                hasThunks = true;
            }
        }
        this.count = count + descendants;
        this.hasWidgets = hasWidgets;
        this.hasThunks = hasThunks;
        this.hooks = hooks;
        this.descendantHooks = descendantHooks;
    }
    VirtualNode.prototype.version = version;
    VirtualNode.prototype.type = "VirtualNode";
}, function(module, exports, __webpack_require__) {
    var version = __webpack_require__(2);
    VirtualPatch.NONE = 0;
    VirtualPatch.VTEXT = 1;
    VirtualPatch.VNODE = 2;
    VirtualPatch.WIDGET = 3;
    VirtualPatch.PROPS = 4;
    VirtualPatch.ORDER = 5;
    VirtualPatch.INSERT = 6;
    VirtualPatch.REMOVE = 7;
    VirtualPatch.THUNK = 8;
    module.exports = VirtualPatch;
    function VirtualPatch(type, vNode, patch) {
        this.type = Number(type);
        this.vNode = vNode;
        this.patch = patch;
    }
    VirtualPatch.prototype.version = version;
    VirtualPatch.prototype.type = "VirtualPatch";
}, function(module, exports, __webpack_require__) {
    var version = __webpack_require__(2);
    module.exports = VirtualText;
    function VirtualText(text) {
        this.text = String(text);
    }
    VirtualText.prototype.version = version;
    VirtualText.prototype.type = "VirtualText";
}, function(module, exports, __webpack_require__) {
    "use strict";
    (function(global, module, process) {
        var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        function _interopDefault(ex) {
            return ex && (typeof ex === "undefined" ? "undefined" : _typeof(ex)) === "object" && "default" in ex ? ex["default"] : ex;
        }
        var page = _interopDefault(__webpack_require__(38));
        var object_observe = __webpack_require__(37);
        var hyperx = _interopDefault(__webpack_require__(34));
        var vdom = _interopDefault(__webpack_require__(44));
        window.page = page;
        var Core = function Core() {
            var that = this;
            this.config = {
                alias: "Lego",
                version: "1.0.0",
                isDebug: true,
                isAnimate: false,
                permit: function permit() {},
                isMultiWindow: false,
                pageEl: "",
                defaultApp: "",
                rootUri: "",
                screenWidth: window.innerWidth
            };
            this._debugger();
            this.prevApp = "";
            this.currentApp = "";
            this.idCounter = 0;
            this.views = new WeakMap();
            this.datas = {};
            this.timer = new Map();
            this.UI = {};
            this.routers = new Map();
            window.onhashchange = function() {
                var hashStr = location.hash.replace("#", "");
                if (hashStr) {
                    page(hashStr);
                }
            };
            return this;
        };
        Core.prototype.extend = function extend() {
            var opts = [], len = arguments.length;
            while (len--) {
                opts[len] = arguments[len];
            }
            var that = this;
            function assign(target, source) {
                if (target === void 0) target = {};
                if (source === void 0) source = {};
                for (var key in source) {
                    if (source.hasOwnProperty(key)) {
                        if (_typeof(source[key]) !== "object") {
                            target[key] = source[key];
                        } else {
                            if (Array.isArray(source[key])) {
                                target[key] = Array.from(source[key]);
                            } else {
                                if (!Lego.isEmptyObject(source[key])) {
                                    target[key] = assign(target[key], source[key]);
                                } else {
                                    target[key] = Object.assign({}, source[key]);
                                }
                            }
                        }
                    }
                }
                return target;
            }
            if (opts.length > 0) {
                var result = opts[0];
                if ((typeof result === "undefined" ? "undefined" : _typeof(result)) == "object" && !Array.isArray(result)) {
                    for (var i = 1; i < opts.length; i++) {
                        if (_typeof(opts[i]) == "object" && !Array.isArray(opts[i])) {
                            result = assign(result, opts[i]);
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
            opts.createBefore = opts.createBefore && opts.createBefore.bind(this);
            opts.createAfter = opts.createAfter && opts.createAfter.bind(this);
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
            typeof opts.createBefore === "function" && opts.createBefore();
            var viewObj = new view(opts);
            this.views.set(viewObj.el, viewObj);
            typeof opts.createAfter === "function" && opts.createAfter(viewObj);
            return viewObj;
        };
        Core.prototype.setting = function setting() {
            var opts = [], len = arguments.length;
            while (len--) {
                opts[len] = arguments[len];
            }
            if (opts.length > 1) {
                if (typeof opts[0] == "string") {
                    this.config[opts[0]] = opts[1];
                }
            } else {
                if (_typeof(opts[0]) == "object") {
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
            if ((typeof comName === "undefined" ? "undefined" : _typeof(comName)) === "object") {
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
                if (_typeof(obj[key]) === "object") {
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
            return prefix ? prefix + id : id;
        };
        Core.prototype.isEmptyObject = function isEmptyObject(obj) {
            if (obj === void 0) obj = {};
            for (var val in obj) {
                return !1;
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
                if (!this.config.isMultiWindow) {
                    this.routers.delete(appName);
                }
            }
        };
        Core.prototype.ns = function ns(nameSpaceStr, obj) {
            if (obj === void 0) obj = {};
            if (typeof nameSpaceStr !== "string" && Array.isArray(obj) || (typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== "object") {
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
                        nameSpaceObj[itemStr] = (typeof subObj === "undefined" ? "undefined" : _typeof(subObj)) == "object" && !Array.isArray(subObj) ? subObj : {};
                    }
                    return getNameSpace(nameSpaceObj[itemStr], num + 1);
                } else {
                    return nameSpaceObj;
                }
            }
            return getNameSpace(this, 1);
        };
        Core.prototype.loadScript = function loadScript(url, callback, appName) {
            var script = document.createElement("script"), theId = "Lego-js-" + appName;
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
            script.src = url;
            if (document.getElementById(theId)) {
                document.getElementsByTagName("head")[0].removeChild(document.getElementById(theId));
            }
            document.getElementsByTagName("head")[0].appendChild(script);
        };
        Core.prototype.startApp = function startApp(appPath, fileName, opts) {
            if (fileName === void 0) fileName = "app";
            if (opts === void 0) opts = {};
            var options = {
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
            this.loadScript(this.config.rootUri + appName + "/" + fileName + ".js?" + this.config.version, function() {
                if (appPath && appName !== "index") {
                    page(appPath.indexOf("/") !== 0 ? "/" + appPath : appPath);
                    var prevId = "Lego-js-" + that.prevApp;
                    if (document.getElementById(prevId)) {
                        document.getElementsByTagName("head")[0].removeChild(document.getElementById(prevId));
                    }
                    that._clearObj(that.prevApp);
                }
                if (typeof options.startAfter == "function") {
                    options.startAfter();
                }
            }, appName);
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
            if (window.$ && (typeof el === "undefined" ? "undefined" : _typeof(el)) == "object") {
                _el = el instanceof window.$ ? el[0] : _el;
            }
            if (this.views.has(_el)) {
                return this.views.get(_el);
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
        Core.prototype.router = function router(routerOption) {
            var this$1 = this;
            if (routerOption === void 0) routerOption = {};
            if (!this.isEmptyObject(routerOption)) {
                for (var key in routerOption) {
                    var value = routerOption[key], routerName = key;
                    value = Array.isArray(value) ? value : [ value ];
                    value.unshift(key);
                    if (!this$1.routers.get(routerName)) {
                        page.apply(void 0, value);
                        this$1.routers.set(routerName, value);
                    }
                }
                page();
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
            this.options = {
                context: opts.context || document,
                data: [],
                components: []
            };
            Object.assign(this.options, opts);
            if (this.options.listener && Lego.Eventer) {
                for (var key in this.options.listener) {
                    Lego.Eventer.on(key, this$1.options.listener[key]);
                }
            }
            this._renderRootNode();
            this.setElement(this.options.el);
            this._observe();
            this.components();
            this.fetch();
        };
        View.prototype.fetch = function fetch(opts) {
            var this$1 = this;
            if (opts === void 0) opts = {};
            var that = this;
            if (this.options.dataSource) {
                var dataSource = this.options.dataSource;
                dataSource.api = Array.isArray(dataSource.api) ? dataSource.api : [ dataSource.api ];
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
                        this$1.options.data = resp;
                        this$1.dataReady();
                        this$1.components();
                        this$1.refresh();
                    }, this);
                }
            } else {
                this._renderComponents();
            }
        };
        View.prototype._renderRootNode = function _renderRootNode() {
            var this$1 = this;
            this.options.data = typeof this.options.data == "function" ? this.options.data() : this.options.data;
            this.renderBefore();
            var content = this.render();
            if (content) {
                this.oldNode = content;
                this.rootNode = vdom.create(content);
                this.el = this.rootNode;
            } else {
                this.el = document.createElement("<div></div>");
            }
            if (this.options.id || this.options.el) {
                if (this.options.id) {
                    this.el.setAttribute("id", this.options.id);
                } else {
                    if (new RegExp(/#/).test(this.options.el)) {
                        var theId = this.options.el.replace(/#/, "");
                        this.el.setAttribute("id", theId);
                        this.options.id = theId;
                    }
                }
            }
            this.el.setAttribute("view-id", this.options.vid);
            if (this.options.style) {
                for (var key in this.options.style) {
                    if (typeof this$1.options.style[key] == "number") {
                        this$1.options.style[key] += "px";
                    }
                    this$1.el.style[key] = this$1.options.style[key];
                }
            }
            if (this.options.attr) {
                for (var key$1 in this.options.attr) {
                    this$1.el.setAttribute(key$1, this$1.options.attr[key$1]);
                }
            }
            if (this.options.className) {
                this.el.className += this.options.className;
            }
            if (window.$) {
                this.$el = window.$(this.el);
            }
            this.renderAfter();
        };
        View.prototype._renderComponents = function _renderComponents() {
            var that = this;
            var components = this.options.components;
            components = Array.isArray(components) ? components : [ components ];
            if (components.length) {
                components.forEach(function(item, i) {
                    if (that.$(item.el).length) {
                        var tagName = item.el ? that.$(item.el)[0].tagName.toLowerCase() : "";
                        if (tagName) {
                            item.context = that;
                            Lego.create(Lego.UI[tagName], item);
                        }
                    }
                });
            }
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
                        Lego.extend(hasOne, com);
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
            if (this.options && _typeof(this.options) === "object") {
                Object.observe(this.options, function(changes) {
                    this$1.options.data = typeof this$1.options.data == "function" ? this$1.options.data() : this$1.options.data;
                    this$1.renderBefore();
                    var newNode = this$1.render();
                    var patches = vdom.diff(this$1.oldNode, newNode);
                    this$1.rootNode = vdom.patch(this$1.rootNode, patches);
                    this$1.oldNode = newNode;
                    this$1._renderComponents();
                    this$1.renderAfter();
                });
            }
        };
        View.prototype.setElement = function setElement(el) {
            if (el) {
                var pEl = this.options.context.el || document, _el = typeof el == "string" ? pEl.querySelector(el) : el;
                if (el == "body" || this.options.insert == "append" || this.options.insert == "html") {
                    if (this.options.insert !== "append" || this.options.insert == "html") {
                        var childs = _el.childNodes;
                        for (var i = childs.length - 1; i >= 0; i--) {
                            _el.removeChild(childs.item(i));
                        }
                    }
                    _el.appendChild(this.el);
                } else {
                    _el.parentNode.replaceChild(this.el, _el);
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
            if (this.el) {
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
                    if (option.reset) {
                        $.ajax(Lego.extend(option, {
                            success: function success(result) {
                                if (result) {
                                    that.datas.set(apiName$0, result);
                                    if (typeof callback == "function") {
                                        callback(that.parse(result, apiName$0, view));
                                    }
                                }
                            },
                            error: function error(xhr) {
                                debug.warn("login error: ", xhr);
                            }
                        }));
                    } else {
                        if (typeof callback == "function") {
                            callback(this.parse(this.datas.get(apiName$0), apiName$0, view));
                        }
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
                                    var data, option, headers, theBody, key, req, response;
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
                                                    context$4$0.next = 16;
                                                    break;
                                                }
                                                headers = option.headers || {
                                                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                                                };
                                                theBody = option.body ? option.body : {};
                                                if (headers["Content-type"] == "application/x-www-form-urlencoded; charset=UTF-8") {
                                                    if (theBody && (typeof theBody === "undefined" ? "undefined" : _typeof(theBody)) === "object") {
                                                        for (key in theBody) {
                                                            if (_typeof(theBody[key]) === "object") {
                                                                theBody[key] = encodeURIComponent(JSON.stringify(theBody[key]));
                                                            }
                                                        }
                                                        theBody = Lego.param(theBody);
                                                    }
                                                }
                                                req = new Request(option.url.indexOf("http") ? option.url : Lego.config.serviceUri + option.url, {
                                                    method: option.method || "GET",
                                                    headers: headers,
                                                    mode: "same-origin",
                                                    credentials: "include",
                                                    body: option.method == "POST" ? theBody : undefined
                                                });
                                                context$4$0.next = 14;
                                                return fetch(req);

                                              case 14:
                                                response = context$4$0.sent;
                                                return context$4$0.abrupt("return", response.json());

                                              case 16:
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
                            debug.log(context$2$0.t0);

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
            while (len--) {
                args[len] = arguments[len];
            }
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
            var inModule = (false ? "undefined" : _typeof(module)) === "object";
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
                if ((typeof process === "undefined" ? "undefined" : _typeof(process)) === "object" && process.domain) {
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
                reset: function reset(skipTempReset) {
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
                stop: function stop() {
                    this.done = true;
                    var rootEntry = this.tryEntries[0];
                    var rootRecord = rootEntry.completion;
                    if (rootRecord.type === "throw") {
                        throw rootRecord.arg;
                    }
                    return this.rval;
                },
                dispatchException: function dispatchException(exception) {
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
                abrupt: function abrupt(type, arg) {
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
                complete: function complete(record, afterLoc) {
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
                finish: function finish(finallyLoc) {
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
                catch: function _catch(tryLoc) {
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
                delegateYield: function delegateYield(iterable, resultName, nextLoc) {
                    this.delegate = {
                        iterator: values(iterable),
                        resultName: resultName,
                        nextLoc: nextLoc
                    };
                    return ContinueSentinel;
                }
            };
        }((typeof global === "undefined" ? "undefined" : _typeof(global)) === "object" ? global : (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" ? window : (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" ? self : undefined);
        LegoCore$1.View = View;
        LegoCore$1.Data = Data;
        LegoCore$1.Event = Event;
        LegoCore$1.Ux = {};
        LegoCore$1.Eventer = new Event();
        module.exports = LegoCore$1;
    }).call(exports, __webpack_require__(6), __webpack_require__(30)(module), __webpack_require__(8));
}, , , , , , , , , , , function(module, exports, __webpack_require__) {
    "use strict";
    var _lego = __webpack_require__(17);
    var _lego2 = _interopRequireDefault(_lego);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    _lego2.default.setting({
        version: "20161202",
        pageEl: "#page-container",
        defaultApp: "home",
        rootUri: "/example/dist/",
        routeRoot: "/example/#"
    });
    _lego2.default.startApp("index");
}, , function(module, exports) {
    module.exports = function(module) {
        if (!module.webpackPolyfill) {
            module.deprecate = function() {};
            module.paths = [];
            if (!module.children) module.children = [];
            Object.defineProperty(module, "loaded", {
                enumerable: true,
                get: function() {
                    return module.l;
                }
            });
            Object.defineProperty(module, "id", {
                enumerable: true,
                get: function() {
                    return module.i;
                }
            });
            module.webpackPolyfill = 1;
        }
        return module;
    };
}, function(module, exports) {
    module.exports = function split(undef) {
        var nativeSplit = String.prototype.split, compliantExecNpcg = /()??/.exec("")[1] === undef, self;
        self = function(str, separator, limit) {
            if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
                return nativeSplit.call(str, separator, limit);
            }
            var output = [], flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + (separator.sticky ? "y" : ""), lastLastIndex = 0, separator = new RegExp(separator.source, flags + "g"), separator2, match, lastIndex, lastLength;
            str += "";
            if (!compliantExecNpcg) {
                separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
            }
            limit = limit === undef ? -1 >>> 0 : limit >>> 0;
            while (match = separator.exec(str)) {
                lastIndex = match.index + match[0].length;
                if (lastIndex > lastLastIndex) {
                    output.push(str.slice(lastLastIndex, match.index));
                    if (!compliantExecNpcg && match.length > 1) {
                        match[0].replace(separator2, function() {
                            for (var i = 1; i < arguments.length - 2; i++) {
                                if (arguments[i] === undef) {
                                    match[i] = undef;
                                }
                            }
                        });
                    }
                    if (match.length > 1 && match.index < str.length) {
                        Array.prototype.push.apply(output, match.slice(1));
                    }
                    lastLength = match[0].length;
                    lastLastIndex = lastIndex;
                    if (output.length >= limit) {
                        break;
                    }
                }
                if (separator.lastIndex === match.index) {
                    separator.lastIndex++;
                }
            }
            if (lastLastIndex === str.length) {
                if (lastLength || !separator.test("")) {
                    output.push("");
                }
            } else {
                output.push(str.slice(lastLastIndex));
            }
            return output.length > limit ? output.slice(0, limit) : output;
        };
        return self;
    }();
}, function(module, exports, __webpack_require__) {
    "use strict";
    var OneVersionConstraint = __webpack_require__(36);
    var MY_VERSION = "7";
    OneVersionConstraint("ev-store", MY_VERSION);
    var hashKey = "__EV_STORE_KEY@" + MY_VERSION;
    module.exports = EvStore;
    function EvStore(elem) {
        var hash = elem[hashKey];
        if (!hash) {
            hash = elem[hashKey] = {};
        }
        return hash;
    }
}, function(module, exports) {
    module.exports = attributeToProperty;
    var transform = {
        class: "className",
        for: "htmlFor",
        "http-equiv": "httpEquiv"
    };
    function attributeToProperty(h) {
        return function(tagName, attrs, children) {
            for (var attr in attrs) {
                if (attr in transform) {
                    attrs[transform[attr]] = attrs[attr];
                    delete attrs[attr];
                }
            }
            return h(tagName, attrs, children);
        };
    }
}, function(module, exports, __webpack_require__) {
    var attrToProp = __webpack_require__(33);
    var VAR = 0, TEXT = 1, OPEN = 2, CLOSE = 3, ATTR = 4;
    var ATTR_KEY = 5, ATTR_KEY_W = 6;
    var ATTR_VALUE_W = 7, ATTR_VALUE = 8;
    var ATTR_VALUE_SQ = 9, ATTR_VALUE_DQ = 10;
    var ATTR_EQ = 11, ATTR_BREAK = 12;
    module.exports = function(h, opts) {
        h = attrToProp(h);
        if (!opts) opts = {};
        var concat = opts.concat || function(a, b) {
            return String(a) + String(b);
        };
        return function(strings) {
            var state = TEXT, reg = "";
            var arglen = arguments.length;
            var parts = [];
            for (var i = 0; i < strings.length; i++) {
                if (i < arglen - 1) {
                    var arg = arguments[i + 1];
                    var p = parse(strings[i]);
                    var xstate = state;
                    if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE;
                    if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE;
                    if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE;
                    if (xstate === ATTR) xstate = ATTR_KEY;
                    p.push([ VAR, xstate, arg ]);
                    parts.push.apply(parts, p);
                } else parts.push.apply(parts, parse(strings[i]));
            }
            var tree = [ null, {}, [] ];
            var stack = [ [ tree, -1 ] ];
            for (var i = 0; i < parts.length; i++) {
                var cur = stack[stack.length - 1][0];
                var p = parts[i], s = p[0];
                if (s === OPEN && /^\//.test(p[1])) {
                    var ix = stack[stack.length - 1][1];
                    if (stack.length > 1) {
                        stack.pop();
                        stack[stack.length - 1][0][2][ix] = h(cur[0], cur[1], cur[2].length ? cur[2] : undefined);
                    }
                } else if (s === OPEN) {
                    var c = [ p[1], {}, [] ];
                    cur[2].push(c);
                    stack.push([ c, cur[2].length - 1 ]);
                } else if (s === ATTR_KEY || s === VAR && p[1] === ATTR_KEY) {
                    var key = "";
                    var copyKey;
                    for (;i < parts.length; i++) {
                        if (parts[i][0] === ATTR_KEY) {
                            key = concat(key, parts[i][1]);
                        } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
                            if (typeof parts[i][2] === "object" && !key) {
                                for (copyKey in parts[i][2]) {
                                    if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                                        cur[1][copyKey] = parts[i][2][copyKey];
                                    }
                                }
                            } else {
                                key = concat(key, parts[i][2]);
                            }
                        } else break;
                    }
                    if (parts[i][0] === ATTR_EQ) i++;
                    var j = i;
                    for (;i < parts.length; i++) {
                        if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
                            if (!cur[1][key]) cur[1][key] = strfn(parts[i][1]); else cur[1][key] = concat(cur[1][key], parts[i][1]);
                        } else if (parts[i][0] === VAR && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
                            if (!cur[1][key]) cur[1][key] = strfn(parts[i][2]); else cur[1][key] = concat(cur[1][key], parts[i][2]);
                        } else {
                            if (key.length && !cur[1][key] && i === j && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
                                cur[1][key] = key.toLowerCase();
                            }
                            break;
                        }
                    }
                } else if (s === ATTR_KEY) {
                    cur[1][p[1]] = true;
                } else if (s === VAR && p[1] === ATTR_KEY) {
                    cur[1][p[2]] = true;
                } else if (s === CLOSE) {
                    if (selfClosing(cur[0]) && stack.length) {
                        var ix = stack[stack.length - 1][1];
                        stack.pop();
                        stack[stack.length - 1][0][2][ix] = h(cur[0], cur[1], cur[2].length ? cur[2] : undefined);
                    }
                } else if (s === VAR && p[1] === TEXT) {
                    if (p[2] === undefined || p[2] === null) p[2] = ""; else if (!p[2]) p[2] = concat("", p[2]);
                    if (Array.isArray(p[2][0])) {
                        cur[2].push.apply(cur[2], p[2]);
                    } else {
                        cur[2].push(p[2]);
                    }
                } else if (s === TEXT) {
                    cur[2].push(p[1]);
                } else if (s === ATTR_EQ || s === ATTR_BREAK) {} else {
                    throw new Error("unhandled: " + s);
                }
            }
            if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
                tree[2].shift();
            }
            if (tree[2].length > 2 || tree[2].length === 2 && /\S/.test(tree[2][1])) {
                throw new Error("multiple root elements must be wrapped in an enclosing tag");
            }
            if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === "string" && Array.isArray(tree[2][0][2])) {
                tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2]);
            }
            return tree[2][0];
            function parse(str) {
                var res = [];
                if (state === ATTR_VALUE_W) state = ATTR;
                for (var i = 0; i < str.length; i++) {
                    var c = str.charAt(i);
                    if (state === TEXT && c === "<") {
                        if (reg.length) res.push([ TEXT, reg ]);
                        reg = "";
                        state = OPEN;
                    } else if (c === ">" && !quot(state)) {
                        if (state === OPEN) {
                            res.push([ OPEN, reg ]);
                        } else if (state === ATTR_KEY) {
                            res.push([ ATTR_KEY, reg ]);
                        } else if (state === ATTR_VALUE && reg.length) {
                            res.push([ ATTR_VALUE, reg ]);
                        }
                        res.push([ CLOSE ]);
                        reg = "";
                        state = TEXT;
                    } else if (state === TEXT) {
                        reg += c;
                    } else if (state === OPEN && /\s/.test(c)) {
                        res.push([ OPEN, reg ]);
                        reg = "";
                        state = ATTR;
                    } else if (state === OPEN) {
                        reg += c;
                    } else if (state === ATTR && /[\w-]/.test(c)) {
                        state = ATTR_KEY;
                        reg = c;
                    } else if (state === ATTR && /\s/.test(c)) {
                        if (reg.length) res.push([ ATTR_KEY, reg ]);
                        res.push([ ATTR_BREAK ]);
                    } else if (state === ATTR_KEY && /\s/.test(c)) {
                        res.push([ ATTR_KEY, reg ]);
                        reg = "";
                        state = ATTR_KEY_W;
                    } else if (state === ATTR_KEY && c === "=") {
                        res.push([ ATTR_KEY, reg ], [ ATTR_EQ ]);
                        reg = "";
                        state = ATTR_VALUE_W;
                    } else if (state === ATTR_KEY) {
                        reg += c;
                    } else if ((state === ATTR_KEY_W || state === ATTR) && c === "=") {
                        res.push([ ATTR_EQ ]);
                        state = ATTR_VALUE_W;
                    } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c)) {
                        res.push([ ATTR_BREAK ]);
                        if (/[\w-]/.test(c)) {
                            reg += c;
                            state = ATTR_KEY;
                        } else state = ATTR;
                    } else if (state === ATTR_VALUE_W && c === '"') {
                        state = ATTR_VALUE_DQ;
                    } else if (state === ATTR_VALUE_W && c === "'") {
                        state = ATTR_VALUE_SQ;
                    } else if (state === ATTR_VALUE_DQ && c === '"') {
                        res.push([ ATTR_VALUE, reg ], [ ATTR_BREAK ]);
                        reg = "";
                        state = ATTR;
                    } else if (state === ATTR_VALUE_SQ && c === "'") {
                        res.push([ ATTR_VALUE, reg ], [ ATTR_BREAK ]);
                        reg = "";
                        state = ATTR;
                    } else if (state === ATTR_VALUE_W && !/\s/.test(c)) {
                        state = ATTR_VALUE;
                        i--;
                    } else if (state === ATTR_VALUE && /\s/.test(c)) {
                        res.push([ ATTR_VALUE, reg ], [ ATTR_BREAK ]);
                        reg = "";
                        state = ATTR;
                    } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ) {
                        reg += c;
                    }
                }
                if (state === TEXT && reg.length) {
                    res.push([ TEXT, reg ]);
                    reg = "";
                } else if (state === ATTR_VALUE && reg.length) {
                    res.push([ ATTR_VALUE, reg ]);
                    reg = "";
                } else if (state === ATTR_VALUE_DQ && reg.length) {
                    res.push([ ATTR_VALUE, reg ]);
                    reg = "";
                } else if (state === ATTR_VALUE_SQ && reg.length) {
                    res.push([ ATTR_VALUE, reg ]);
                    reg = "";
                } else if (state === ATTR_KEY) {
                    res.push([ ATTR_KEY, reg ]);
                    reg = "";
                }
                return res;
            }
        };
        function strfn(x) {
            if (typeof x === "function") return x; else if (typeof x === "string") return x; else if (x && typeof x === "object") return x; else return concat("", x);
        }
    };
    function quot(state) {
        return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ;
    }
    var hasOwn = Object.prototype.hasOwnProperty;
    function has(obj, key) {
        return hasOwn.call(obj, key);
    }
    var closeRE = RegExp("^(" + [ "area", "base", "basefont", "bgsound", "br", "col", "command", "embed", "frame", "hr", "img", "input", "isindex", "keygen", "link", "meta", "param", "source", "track", "wbr", "animate", "animateTransform", "circle", "cursor", "desc", "ellipse", "feBlend", "feColorMatrix", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "font-face-format", "font-face-name", "font-face-uri", "glyph", "glyphRef", "hkern", "image", "line", "missing-glyph", "mpath", "path", "polygon", "polyline", "rect", "set", "stop", "tref", "use", "view", "vkern" ].join("|") + ")(?:[.#][a-zA-Z0-9-￿_:-]+)*$");
    function selfClosing(tag) {
        return closeRE.test(tag);
    }
}, function(module, exports, __webpack_require__) {
    "use strict";
    (function(global) {
        var root = typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
        module.exports = Individual;
        function Individual(key, value) {
            if (key in root) {
                return root[key];
            }
            root[key] = value;
            return value;
        }
    }).call(exports, __webpack_require__(6));
}, function(module, exports, __webpack_require__) {
    "use strict";
    var Individual = __webpack_require__(35);
    module.exports = OneVersion;
    function OneVersion(moduleName, version, defaultValue) {
        var key = "__INDIVIDUAL_ONE_VERSION_" + moduleName;
        var enforceKey = key + "_ENFORCE_SINGLETON";
        var versionValue = Individual(enforceKey, version);
        if (versionValue !== version) {
            throw new Error("Can only have one copy of " + moduleName + ".\n" + "You already have version " + versionValue + " installed.\n" + "This means you cannot install version " + version);
        }
        return Individual(key, defaultValue);
    }
}, function(module, exports) {
    Object.observe || function(O, A, root, _undefined) {
        "use strict";
        var observed, handlers, defaultAcceptList = [ "add", "update", "delete", "reconfigure", "setPrototype", "preventExtensions" ];
        var isArray = A.isArray || function(toString) {
            return function(object) {
                return toString.call(object) === "[object Array]";
            };
        }(O.prototype.toString), inArray = A.prototype.indexOf ? A.indexOf || function(array, pivot, start) {
            return A.prototype.indexOf.call(array, pivot, start);
        } : function(array, pivot, start) {
            for (var i = start || 0; i < array.length; i++) if (array[i] === pivot) return i;
            return -1;
        }, createMap = root.Map === _undefined || !Map.prototype.forEach ? function() {
            var keys = [], values = [];
            return {
                size: 0,
                has: function(key) {
                    return inArray(keys, key) > -1;
                },
                get: function(key) {
                    return values[inArray(keys, key)];
                },
                set: function(key, value) {
                    var i = inArray(keys, key);
                    if (i === -1) {
                        keys.push(key);
                        values.push(value);
                        this.size++;
                    } else values[i] = value;
                },
                delete: function(key) {
                    var i = inArray(keys, key);
                    if (i > -1) {
                        keys.splice(i, 1);
                        values.splice(i, 1);
                        this.size--;
                    }
                },
                forEach: function(callback) {
                    for (var i = 0; i < keys.length; i++) callback.call(arguments[1], values[i], keys[i], this);
                }
            };
        } : function() {
            return new Map();
        }, getProps = O.getOwnPropertyNames ? function() {
            var func = O.getOwnPropertyNames;
            try {
                arguments.callee;
            } catch (e) {
                var avoid = (func(inArray).join(" ") + " ").replace(/prototype |length |name /g, "").slice(0, -1).split(" ");
                if (avoid.length) func = function(object) {
                    var props = O.getOwnPropertyNames(object);
                    if (typeof object === "function") for (var i = 0, j; i < avoid.length; ) if ((j = inArray(props, avoid[i++])) > -1) props.splice(j, 1);
                    return props;
                };
            }
            return func;
        }() : function(object) {
            var props = [], prop, hop;
            if ("hasOwnProperty" in object) {
                for (prop in object) if (object.hasOwnProperty(prop)) props.push(prop);
            } else {
                hop = O.hasOwnProperty;
                for (prop in object) if (hop.call(object, prop)) props.push(prop);
            }
            if (isArray(object)) props.push("length");
            return props;
        }, getPrototype = O.getPrototypeOf, getDescriptor = O.defineProperties && O.getOwnPropertyDescriptor, nextFrame = root.requestAnimationFrame || root.webkitRequestAnimationFrame || function() {
            var initial = +new Date(), last = initial;
            return function(func) {
                return setTimeout(function() {
                    func((last = +new Date()) - initial);
                }, 17);
            };
        }(), doObserve = function(object, handler, acceptList) {
            var data = observed.get(object);
            if (data) {
                performPropertyChecks(data, object);
                setHandler(object, data, handler, acceptList);
            } else {
                data = createObjectData(object);
                setHandler(object, data, handler, acceptList);
                if (observed.size === 1) nextFrame(runGlobalLoop);
            }
        }, createObjectData = function(object, data) {
            var props = getProps(object), values = [], descs, i = 0, data = {
                handlers: createMap(),
                frozen: O.isFrozen ? O.isFrozen(object) : false,
                extensible: O.isExtensible ? O.isExtensible(object) : true,
                proto: getPrototype && getPrototype(object),
                properties: props,
                values: values,
                notifier: retrieveNotifier(object, data)
            };
            if (getDescriptor) {
                descs = data.descriptors = [];
                while (i < props.length) {
                    descs[i] = getDescriptor(object, props[i]);
                    values[i] = object[props[i++]];
                }
            } else while (i < props.length) values[i] = object[props[i++]];
            observed.set(object, data);
            return data;
        }, performPropertyChecks = function() {
            var updateCheck = getDescriptor ? function(object, data, idx, except, descr) {
                var key = data.properties[idx], value = object[key], ovalue = data.values[idx], odesc = data.descriptors[idx];
                if ("value" in descr && (ovalue === value ? ovalue === 0 && 1 / ovalue !== 1 / value : ovalue === ovalue || value === value)) {
                    addChangeRecord(object, data, {
                        name: key,
                        type: "update",
                        object: object,
                        oldValue: ovalue
                    }, except);
                    data.values[idx] = value;
                }
                if (odesc.configurable && (!descr.configurable || descr.writable !== odesc.writable || descr.enumerable !== odesc.enumerable || descr.get !== odesc.get || descr.set !== odesc.set)) {
                    addChangeRecord(object, data, {
                        name: key,
                        type: "reconfigure",
                        object: object,
                        oldValue: ovalue
                    }, except);
                    data.descriptors[idx] = descr;
                }
            } : function(object, data, idx, except) {
                var key = data.properties[idx], value = object[key], ovalue = data.values[idx];
                if (ovalue === value ? ovalue === 0 && 1 / ovalue !== 1 / value : ovalue === ovalue || value === value) {
                    addChangeRecord(object, data, {
                        name: key,
                        type: "update",
                        object: object,
                        oldValue: ovalue
                    }, except);
                    data.values[idx] = value;
                }
            };
            var deletionCheck = getDescriptor ? function(object, props, proplen, data, except) {
                var i = props.length, descr;
                while (proplen && i--) {
                    if (props[i] !== null) {
                        descr = getDescriptor(object, props[i]);
                        proplen--;
                        if (descr) updateCheck(object, data, i, except, descr); else {
                            addChangeRecord(object, data, {
                                name: props[i],
                                type: "delete",
                                object: object,
                                oldValue: data.values[i]
                            }, except);
                            data.properties.splice(i, 1);
                            data.values.splice(i, 1);
                            data.descriptors.splice(i, 1);
                        }
                    }
                }
            } : function(object, props, proplen, data, except) {
                var i = props.length;
                while (proplen && i--) if (props[i] !== null) {
                    addChangeRecord(object, data, {
                        name: props[i],
                        type: "delete",
                        object: object,
                        oldValue: data.values[i]
                    }, except);
                    data.properties.splice(i, 1);
                    data.values.splice(i, 1);
                    proplen--;
                }
            };
            return function(data, object, except) {
                if (!data.handlers.size || data.frozen) return;
                var props, proplen, keys, values = data.values, descs = data.descriptors, i = 0, idx, key, value, proto, descr;
                if (data.extensible) {
                    props = data.properties.slice();
                    proplen = props.length;
                    keys = getProps(object);
                    if (descs) {
                        while (i < keys.length) {
                            key = keys[i++];
                            idx = inArray(props, key);
                            descr = getDescriptor(object, key);
                            if (idx === -1) {
                                addChangeRecord(object, data, {
                                    name: key,
                                    type: "add",
                                    object: object
                                }, except);
                                data.properties.push(key);
                                values.push(object[key]);
                                descs.push(descr);
                            } else {
                                props[idx] = null;
                                proplen--;
                                updateCheck(object, data, idx, except, descr);
                            }
                        }
                        deletionCheck(object, props, proplen, data, except);
                        if (!O.isExtensible(object)) {
                            data.extensible = false;
                            addChangeRecord(object, data, {
                                type: "preventExtensions",
                                object: object
                            }, except);
                            data.frozen = O.isFrozen(object);
                        }
                    } else {
                        while (i < keys.length) {
                            key = keys[i++];
                            idx = inArray(props, key);
                            value = object[key];
                            if (idx === -1) {
                                addChangeRecord(object, data, {
                                    name: key,
                                    type: "add",
                                    object: object
                                }, except);
                                data.properties.push(key);
                                values.push(value);
                            } else {
                                props[idx] = null;
                                proplen--;
                                updateCheck(object, data, idx, except);
                            }
                        }
                        deletionCheck(object, props, proplen, data, except);
                    }
                } else if (!data.frozen) {
                    for (;i < props.length; i++) {
                        key = props[i];
                        updateCheck(object, data, i, except, getDescriptor(object, key));
                    }
                    if (O.isFrozen(object)) data.frozen = true;
                }
                if (getPrototype) {
                    proto = getPrototype(object);
                    if (proto !== data.proto) {
                        addChangeRecord(object, data, {
                            type: "setPrototype",
                            name: "__proto__",
                            object: object,
                            oldValue: data.proto
                        });
                        data.proto = proto;
                    }
                }
            };
        }(), runGlobalLoop = function() {
            if (observed.size) {
                observed.forEach(performPropertyChecks);
                handlers.forEach(deliverHandlerRecords);
                nextFrame(runGlobalLoop);
            }
        }, deliverHandlerRecords = function(hdata, handler) {
            var records = hdata.changeRecords;
            if (records.length) {
                hdata.changeRecords = [];
                handler(records);
            }
        }, retrieveNotifier = function(object, data) {
            if (arguments.length < 2) data = observed.get(object);
            return data && data.notifier || {
                notify: function(changeRecord) {
                    changeRecord.type;
                    var data = observed.get(object);
                    if (data) {
                        var recordCopy = {
                            object: object
                        }, prop;
                        for (prop in changeRecord) if (prop !== "object") recordCopy[prop] = changeRecord[prop];
                        addChangeRecord(object, data, recordCopy);
                    }
                },
                performChange: function(changeType, func) {
                    if (typeof changeType !== "string") throw new TypeError("Invalid non-string changeType");
                    if (typeof func !== "function") throw new TypeError("Cannot perform non-function");
                    var data = observed.get(object), prop, changeRecord, thisObj = arguments[2], result = thisObj === _undefined ? func() : func.call(thisObj);
                    data && performPropertyChecks(data, object, changeType);
                    if (data && result && typeof result === "object") {
                        changeRecord = {
                            object: object,
                            type: changeType
                        };
                        for (prop in result) if (prop !== "object" && prop !== "type") changeRecord[prop] = result[prop];
                        addChangeRecord(object, data, changeRecord);
                    }
                }
            };
        }, setHandler = function(object, data, handler, acceptList) {
            var hdata = handlers.get(handler);
            if (!hdata) handlers.set(handler, hdata = {
                observed: createMap(),
                changeRecords: []
            });
            hdata.observed.set(object, {
                acceptList: acceptList.slice(),
                data: data
            });
            data.handlers.set(handler, hdata);
        }, addChangeRecord = function(object, data, changeRecord, except) {
            data.handlers.forEach(function(hdata) {
                var acceptList = hdata.observed.get(object).acceptList;
                if ((typeof except !== "string" || inArray(acceptList, except) === -1) && inArray(acceptList, changeRecord.type) > -1) hdata.changeRecords.push(changeRecord);
            });
        };
        observed = createMap();
        handlers = createMap();
        O.observe = function observe(object, handler, acceptList) {
            if (!object || typeof object !== "object" && typeof object !== "function") throw new TypeError("Object.observe cannot observe non-object");
            if (typeof handler !== "function") throw new TypeError("Object.observe cannot deliver to non-function");
            if (O.isFrozen && O.isFrozen(handler)) throw new TypeError("Object.observe cannot deliver to a frozen function object");
            if (acceptList === _undefined) acceptList = defaultAcceptList; else if (!acceptList || typeof acceptList !== "object") throw new TypeError("Third argument to Object.observe must be an array of strings.");
            doObserve(object, handler, acceptList);
            return object;
        };
        O.unobserve = function unobserve(object, handler) {
            if (object === null || typeof object !== "object" && typeof object !== "function") throw new TypeError("Object.unobserve cannot unobserve non-object");
            if (typeof handler !== "function") throw new TypeError("Object.unobserve cannot deliver to non-function");
            var hdata = handlers.get(handler), odata;
            if (hdata && (odata = hdata.observed.get(object))) {
                hdata.observed.forEach(function(odata, object) {
                    performPropertyChecks(odata.data, object);
                });
                nextFrame(function() {
                    deliverHandlerRecords(hdata, handler);
                });
                if (hdata.observed.size === 1 && hdata.observed.has(object)) handlers["delete"](handler); else hdata.observed["delete"](object);
                if (odata.data.handlers.size === 1) observed["delete"](object); else odata.data.handlers["delete"](handler);
            }
            return object;
        };
        O.getNotifier = function getNotifier(object) {
            if (object === null || typeof object !== "object" && typeof object !== "function") throw new TypeError("Object.getNotifier cannot getNotifier non-object");
            if (O.isFrozen && O.isFrozen(object)) return null;
            return retrieveNotifier(object);
        };
        O.deliverChangeRecords = function deliverChangeRecords(handler) {
            if (typeof handler !== "function") throw new TypeError("Object.deliverChangeRecords cannot deliver to non-function");
            var hdata = handlers.get(handler);
            if (hdata) {
                hdata.observed.forEach(function(odata, object) {
                    performPropertyChecks(odata.data, object);
                });
                deliverHandlerRecords(hdata, handler);
            }
        };
    }(Object, Array, this);
}, function(module, exports, __webpack_require__) {
    "use strict";
    (function(process) {
        var pathtoRegexp = __webpack_require__(39);
        module.exports = page;
        var clickEvent = "undefined" !== typeof document && document.ontouchstart ? "touchstart" : "click";
        var location = "undefined" !== typeof window && (window.history.location || window.location);
        var dispatch = true;
        var decodeURLComponents = true;
        var base = "";
        var running;
        var hashbang = false;
        var prevContext;
        function page(path, fn) {
            if ("function" === typeof path) {
                return page("*", path);
            }
            if ("function" === typeof fn) {
                var route = new Route(path);
                for (var i = 1; i < arguments.length; ++i) {
                    page.callbacks.push(route.middleware(arguments[i]));
                }
            } else if ("string" === typeof path) {
                page["string" === typeof fn ? "redirect" : "show"](path, fn);
            } else {
                page.start(path);
            }
        }
        page.callbacks = [];
        page.exits = [];
        page.current = "";
        page.len = 0;
        page.base = function(path) {
            if (0 === arguments.length) return base;
            base = path;
        };
        page.start = function(options) {
            options = options || {};
            if (running) return;
            running = true;
            if (false === options.dispatch) dispatch = false;
            if (false === options.decodeURLComponents) decodeURLComponents = false;
            if (false !== options.popstate) window.addEventListener("popstate", onpopstate, false);
            if (false !== options.click) {
                document.addEventListener(clickEvent, onclick, false);
            }
            if (true === options.hashbang) hashbang = true;
            if (!dispatch) return;
            var url = hashbang && ~location.hash.indexOf("#!") ? location.hash.substr(2) + location.search : location.pathname + location.search + location.hash;
            page.replace(url, null, true, dispatch);
        };
        page.stop = function() {
            if (!running) return;
            page.current = "";
            page.len = 0;
            running = false;
            document.removeEventListener(clickEvent, onclick, false);
            window.removeEventListener("popstate", onpopstate, false);
        };
        page.show = function(path, state, dispatch, push) {
            var ctx = new Context(path, state);
            page.current = ctx.path;
            if (false !== dispatch) page.dispatch(ctx);
            if (false !== ctx.handled && false !== push) ctx.pushState();
            return ctx;
        };
        page.back = function(path, state) {
            if (page.len > 0) {
                history.back();
                page.len--;
            } else if (path) {
                setTimeout(function() {
                    page.show(path, state);
                });
            } else {
                setTimeout(function() {
                    page.show(base, state);
                });
            }
        };
        page.redirect = function(from, to) {
            if ("string" === typeof from && "string" === typeof to) {
                page(from, function(e) {
                    setTimeout(function() {
                        page.replace(to);
                    }, 0);
                });
            }
            if ("string" === typeof from && "undefined" === typeof to) {
                setTimeout(function() {
                    page.replace(from);
                }, 0);
            }
        };
        page.replace = function(path, state, init, dispatch) {
            var ctx = new Context(path, state);
            page.current = ctx.path;
            ctx.init = init;
            ctx.save();
            if (false !== dispatch) page.dispatch(ctx);
            return ctx;
        };
        page.dispatch = function(ctx) {
            var prev = prevContext, i = 0, j = 0;
            prevContext = ctx;
            function nextExit() {
                var fn = page.exits[j++];
                if (!fn) return nextEnter();
                fn(prev, nextExit);
            }
            function nextEnter() {
                var fn = page.callbacks[i++];
                if (ctx.path !== page.current) {
                    ctx.handled = false;
                    return;
                }
                if (!fn) return unhandled(ctx);
                fn(ctx, nextEnter);
            }
            if (prev) {
                nextExit();
            } else {
                nextEnter();
            }
        };
        function unhandled(ctx) {
            if (ctx.handled) return;
            var current;
            if (hashbang) {
                current = base + location.hash.replace("#!", "");
            } else {
                current = location.pathname + location.search;
            }
            if (current === ctx.canonicalPath) return;
            page.stop();
            ctx.handled = false;
            location.href = ctx.canonicalPath;
        }
        page.exit = function(path, fn) {
            if (typeof path === "function") {
                return page.exit("*", path);
            }
            var route = new Route(path);
            for (var i = 1; i < arguments.length; ++i) {
                page.exits.push(route.middleware(arguments[i]));
            }
        };
        function decodeURLEncodedURIComponent(val) {
            if (typeof val !== "string") {
                return val;
            }
            return decodeURLComponents ? decodeURIComponent(val.replace(/\+/g, " ")) : val;
        }
        function Context(path, state) {
            if ("/" === path[0] && 0 !== path.indexOf(base)) path = base + (hashbang ? "#!" : "") + path;
            var i = path.indexOf("?");
            this.canonicalPath = path;
            this.path = path.replace(base, "") || "/";
            if (hashbang) this.path = this.path.replace("#!", "") || "/";
            this.title = document.title;
            this.state = state || {};
            this.state.path = path;
            this.querystring = ~i ? decodeURLEncodedURIComponent(path.slice(i + 1)) : "";
            this.pathname = decodeURLEncodedURIComponent(~i ? path.slice(0, i) : path);
            this.params = {};
            this.hash = "";
            if (!hashbang) {
                if (!~this.path.indexOf("#")) return;
                var parts = this.path.split("#");
                this.path = parts[0];
                this.hash = decodeURLEncodedURIComponent(parts[1]) || "";
                this.querystring = this.querystring.split("#")[0];
            }
        }
        page.Context = Context;
        Context.prototype.pushState = function() {
            page.len++;
            history.pushState(this.state, this.title, hashbang && this.path !== "/" ? "#!" + this.path : this.canonicalPath);
        };
        Context.prototype.save = function() {
            history.replaceState(this.state, this.title, hashbang && this.path !== "/" ? "#!" + this.path : this.canonicalPath);
        };
        function Route(path, options) {
            options = options || {};
            this.path = path === "*" ? "(.*)" : path;
            this.method = "GET";
            this.regexp = pathtoRegexp(this.path, this.keys = [], options);
        }
        page.Route = Route;
        Route.prototype.middleware = function(fn) {
            var self = this;
            return function(ctx, next) {
                if (self.match(ctx.path, ctx.params)) return fn(ctx, next);
                next();
            };
        };
        Route.prototype.match = function(path, params) {
            var keys = this.keys, qsIndex = path.indexOf("?"), pathname = ~qsIndex ? path.slice(0, qsIndex) : path, m = this.regexp.exec(decodeURIComponent(pathname));
            if (!m) return false;
            for (var i = 1, len = m.length; i < len; ++i) {
                var key = keys[i - 1];
                var val = decodeURLEncodedURIComponent(m[i]);
                if (val !== undefined || !hasOwnProperty.call(params, key.name)) {
                    params[key.name] = val;
                }
            }
            return true;
        };
        var onpopstate = function() {
            var loaded = false;
            if ("undefined" === typeof window) {
                return;
            }
            if (document.readyState === "complete") {
                loaded = true;
            } else {
                window.addEventListener("load", function() {
                    setTimeout(function() {
                        loaded = true;
                    }, 0);
                });
            }
            return function onpopstate(e) {
                if (!loaded) return;
                if (e.state) {
                    var path = e.state.path;
                    page.replace(path, e.state);
                } else {
                    page.show(location.pathname + location.hash, undefined, undefined, false);
                }
            };
        }();
        function onclick(e) {
            if (1 !== which(e)) return;
            if (e.metaKey || e.ctrlKey || e.shiftKey) return;
            if (e.defaultPrevented) return;
            var el = e.path ? e.path[0] : e.target;
            while (el && "A" !== el.nodeName) el = el.parentNode;
            if (!el || "A" !== el.nodeName) return;
            if (el.hasAttribute("download") || el.getAttribute("rel") === "external") return;
            var link = el.getAttribute("href");
            if (!hashbang && el.pathname === location.pathname && (el.hash || "#" === link)) return;
            if (link && link.indexOf("mailto:") > -1) return;
            if (el.target) return;
            if (!sameOrigin(el.href)) return;
            var path = el.pathname + el.search + (el.hash || "");
            if (typeof process !== "undefined" && path.match(/^\/[a-zA-Z]:\//)) {
                path = path.replace(/^\/[a-zA-Z]:\//, "/");
            }
            var orig = path;
            if (path.indexOf(base) === 0) {
                path = path.substr(base.length);
            }
            if (hashbang) path = path.replace("#!", "");
            if (base && orig === path) return;
            e.preventDefault();
            page.show(orig);
        }
        function which(e) {
            e = e || window.event;
            return null === e.which ? e.button : e.which;
        }
        function sameOrigin(href) {
            var origin = location.protocol + "//" + location.hostname;
            if (location.port) origin += ":" + location.port;
            return href && 0 === href.indexOf(origin);
        }
        page.sameOrigin = sameOrigin;
    }).call(exports, __webpack_require__(8));
}, function(module, exports, __webpack_require__) {
    var isarray = __webpack_require__(40);
    module.exports = pathToRegexp;
    module.exports.parse = parse;
    module.exports.compile = compile;
    module.exports.tokensToFunction = tokensToFunction;
    module.exports.tokensToRegExp = tokensToRegExp;
    var PATH_REGEXP = new RegExp([ "(\\\\.)", "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))" ].join("|"), "g");
    function parse(str) {
        var tokens = [];
        var key = 0;
        var index = 0;
        var path = "";
        var res;
        while ((res = PATH_REGEXP.exec(str)) != null) {
            var m = res[0];
            var escaped = res[1];
            var offset = res.index;
            path += str.slice(index, offset);
            index = offset + m.length;
            if (escaped) {
                path += escaped[1];
                continue;
            }
            if (path) {
                tokens.push(path);
                path = "";
            }
            var prefix = res[2];
            var name = res[3];
            var capture = res[4];
            var group = res[5];
            var suffix = res[6];
            var asterisk = res[7];
            var repeat = suffix === "+" || suffix === "*";
            var optional = suffix === "?" || suffix === "*";
            var delimiter = prefix || "/";
            var pattern = capture || group || (asterisk ? ".*" : "[^" + delimiter + "]+?");
            tokens.push({
                name: name || key++,
                prefix: prefix || "",
                delimiter: delimiter,
                optional: optional,
                repeat: repeat,
                pattern: escapeGroup(pattern)
            });
        }
        if (index < str.length) {
            path += str.substr(index);
        }
        if (path) {
            tokens.push(path);
        }
        return tokens;
    }
    function compile(str) {
        return tokensToFunction(parse(str));
    }
    function tokensToFunction(tokens) {
        var matches = new Array(tokens.length);
        for (var i = 0; i < tokens.length; i++) {
            if (typeof tokens[i] === "object") {
                matches[i] = new RegExp("^" + tokens[i].pattern + "$");
            }
        }
        return function(obj) {
            var path = "";
            var data = obj || {};
            for (var i = 0; i < tokens.length; i++) {
                var token = tokens[i];
                if (typeof token === "string") {
                    path += token;
                    continue;
                }
                var value = data[token.name];
                var segment;
                if (value == null) {
                    if (token.optional) {
                        continue;
                    } else {
                        throw new TypeError('Expected "' + token.name + '" to be defined');
                    }
                }
                if (isarray(value)) {
                    if (!token.repeat) {
                        throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"');
                    }
                    if (value.length === 0) {
                        if (token.optional) {
                            continue;
                        } else {
                            throw new TypeError('Expected "' + token.name + '" to not be empty');
                        }
                    }
                    for (var j = 0; j < value.length; j++) {
                        segment = encodeURIComponent(value[j]);
                        if (!matches[i].test(segment)) {
                            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
                        }
                        path += (j === 0 ? token.prefix : token.delimiter) + segment;
                    }
                    continue;
                }
                segment = encodeURIComponent(value);
                if (!matches[i].test(segment)) {
                    throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
                }
                path += token.prefix + segment;
            }
            return path;
        };
    }
    function escapeString(str) {
        return str.replace(/([.+*?=^!:${}()[\]|\/])/g, "\\$1");
    }
    function escapeGroup(group) {
        return group.replace(/([=!:$\/()])/g, "\\$1");
    }
    function attachKeys(re, keys) {
        re.keys = keys;
        return re;
    }
    function flags(options) {
        return options.sensitive ? "" : "i";
    }
    function regexpToRegexp(path, keys) {
        var groups = path.source.match(/\((?!\?)/g);
        if (groups) {
            for (var i = 0; i < groups.length; i++) {
                keys.push({
                    name: i,
                    prefix: null,
                    delimiter: null,
                    optional: false,
                    repeat: false,
                    pattern: null
                });
            }
        }
        return attachKeys(path, keys);
    }
    function arrayToRegexp(path, keys, options) {
        var parts = [];
        for (var i = 0; i < path.length; i++) {
            parts.push(pathToRegexp(path[i], keys, options).source);
        }
        var regexp = new RegExp("(?:" + parts.join("|") + ")", flags(options));
        return attachKeys(regexp, keys);
    }
    function stringToRegexp(path, keys, options) {
        var tokens = parse(path);
        var re = tokensToRegExp(tokens, options);
        for (var i = 0; i < tokens.length; i++) {
            if (typeof tokens[i] !== "string") {
                keys.push(tokens[i]);
            }
        }
        return attachKeys(re, keys);
    }
    function tokensToRegExp(tokens, options) {
        options = options || {};
        var strict = options.strict;
        var end = options.end !== false;
        var route = "";
        var lastToken = tokens[tokens.length - 1];
        var endsWithSlash = typeof lastToken === "string" && /\/$/.test(lastToken);
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
                route += escapeString(token);
            } else {
                var prefix = escapeString(token.prefix);
                var capture = token.pattern;
                if (token.repeat) {
                    capture += "(?:" + prefix + capture + ")*";
                }
                if (token.optional) {
                    if (prefix) {
                        capture = "(?:" + prefix + "(" + capture + "))?";
                    } else {
                        capture = "(" + capture + ")?";
                    }
                } else {
                    capture = prefix + "(" + capture + ")";
                }
                route += capture;
            }
        }
        if (!strict) {
            route = (endsWithSlash ? route.slice(0, -2) : route) + "(?:\\/(?=$))?";
        }
        if (end) {
            route += "$";
        } else {
            route += strict && endsWithSlash ? "" : "(?=\\/|$)";
        }
        return new RegExp("^" + route, flags(options));
    }
    function pathToRegexp(path, keys, options) {
        keys = keys || [];
        if (!isarray(keys)) {
            options = keys;
            keys = [];
        } else if (!options) {
            options = {};
        }
        if (path instanceof RegExp) {
            return regexpToRegexp(path, keys, options);
        }
        if (isarray(path)) {
            return arrayToRegexp(path, keys, options);
        }
        return stringToRegexp(path, keys, options);
    }
}, function(module, exports) {
    module.exports = Array.isArray || function(arr) {
        return Object.prototype.toString.call(arr) == "[object Array]";
    };
}, function(module, exports, __webpack_require__) {
    var createElement = __webpack_require__(12);
    module.exports = createElement;
}, function(module, exports, __webpack_require__) {
    var diff = __webpack_require__(55);
    module.exports = diff;
}, function(module, exports, __webpack_require__) {
    var h = __webpack_require__(52);
    module.exports = h;
}, function(module, exports, __webpack_require__) {
    var diff = __webpack_require__(42);
    var patch = __webpack_require__(45);
    var h = __webpack_require__(43);
    var create = __webpack_require__(41);
    var VNode = __webpack_require__(14);
    var VText = __webpack_require__(16);
    module.exports = {
        diff: diff,
        patch: patch,
        h: h,
        create: create,
        VNode: VNode,
        VText: VText
    };
}, function(module, exports, __webpack_require__) {
    var patch = __webpack_require__(48);
    module.exports = patch;
}, function(module, exports) {
    var noChild = {};
    module.exports = domIndex;
    function domIndex(rootNode, tree, indices, nodes) {
        if (!indices || indices.length === 0) {
            return {};
        } else {
            indices.sort(ascending);
            return recurse(rootNode, tree, indices, nodes, 0);
        }
    }
    function recurse(rootNode, tree, indices, nodes, rootIndex) {
        nodes = nodes || {};
        if (rootNode) {
            if (indexInRange(indices, rootIndex, rootIndex)) {
                nodes[rootIndex] = rootNode;
            }
            var vChildren = tree.children;
            if (vChildren) {
                var childNodes = rootNode.childNodes;
                for (var i = 0; i < tree.children.length; i++) {
                    rootIndex += 1;
                    var vChild = vChildren[i] || noChild;
                    var nextIndex = rootIndex + (vChild.count || 0);
                    if (indexInRange(indices, rootIndex, nextIndex)) {
                        recurse(childNodes[i], vChild, indices, nodes, rootIndex);
                    }
                    rootIndex = nextIndex;
                }
            }
        }
        return nodes;
    }
    function indexInRange(indices, left, right) {
        if (indices.length === 0) {
            return false;
        }
        var minIndex = 0;
        var maxIndex = indices.length - 1;
        var currentIndex;
        var currentItem;
        while (minIndex <= maxIndex) {
            currentIndex = (maxIndex + minIndex) / 2 >> 0;
            currentItem = indices[currentIndex];
            if (minIndex === maxIndex) {
                return currentItem >= left && currentItem <= right;
            } else if (currentItem < left) {
                minIndex = currentIndex + 1;
            } else if (currentItem > right) {
                maxIndex = currentIndex - 1;
            } else {
                return true;
            }
        }
        return false;
    }
    function ascending(a, b) {
        return a > b ? 1 : -1;
    }
}, function(module, exports, __webpack_require__) {
    var applyProperties = __webpack_require__(11);
    var isWidget = __webpack_require__(0);
    var VPatch = __webpack_require__(15);
    var updateWidget = __webpack_require__(49);
    module.exports = applyPatch;
    function applyPatch(vpatch, domNode, renderOptions) {
        var type = vpatch.type;
        var vNode = vpatch.vNode;
        var patch = vpatch.patch;
        switch (type) {
          case VPatch.REMOVE:
            return removeNode(domNode, vNode);

          case VPatch.INSERT:
            return insertNode(domNode, patch, renderOptions);

          case VPatch.VTEXT:
            return stringPatch(domNode, vNode, patch, renderOptions);

          case VPatch.WIDGET:
            return widgetPatch(domNode, vNode, patch, renderOptions);

          case VPatch.VNODE:
            return vNodePatch(domNode, vNode, patch, renderOptions);

          case VPatch.ORDER:
            reorderChildren(domNode, patch);
            return domNode;

          case VPatch.PROPS:
            applyProperties(domNode, patch, vNode.properties);
            return domNode;

          case VPatch.THUNK:
            return replaceRoot(domNode, renderOptions.patch(domNode, patch, renderOptions));

          default:
            return domNode;
        }
    }
    function removeNode(domNode, vNode) {
        var parentNode = domNode.parentNode;
        if (parentNode) {
            parentNode.removeChild(domNode);
        }
        destroyWidget(domNode, vNode);
        return null;
    }
    function insertNode(parentNode, vNode, renderOptions) {
        var newNode = renderOptions.render(vNode, renderOptions);
        if (parentNode) {
            parentNode.appendChild(newNode);
        }
        return parentNode;
    }
    function stringPatch(domNode, leftVNode, vText, renderOptions) {
        var newNode;
        if (domNode.nodeType === 3) {
            domNode.replaceData(0, domNode.length, vText.text);
            newNode = domNode;
        } else {
            var parentNode = domNode.parentNode;
            newNode = renderOptions.render(vText, renderOptions);
            if (parentNode && newNode !== domNode) {
                parentNode.replaceChild(newNode, domNode);
            }
        }
        return newNode;
    }
    function widgetPatch(domNode, leftVNode, widget, renderOptions) {
        var updating = updateWidget(leftVNode, widget);
        var newNode;
        if (updating) {
            newNode = widget.update(leftVNode, domNode) || domNode;
        } else {
            newNode = renderOptions.render(widget, renderOptions);
        }
        var parentNode = domNode.parentNode;
        if (parentNode && newNode !== domNode) {
            parentNode.replaceChild(newNode, domNode);
        }
        if (!updating) {
            destroyWidget(domNode, leftVNode);
        }
        return newNode;
    }
    function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
        var parentNode = domNode.parentNode;
        var newNode = renderOptions.render(vNode, renderOptions);
        if (parentNode && newNode !== domNode) {
            parentNode.replaceChild(newNode, domNode);
        }
        return newNode;
    }
    function destroyWidget(domNode, w) {
        if (typeof w.destroy === "function" && isWidget(w)) {
            w.destroy(domNode);
        }
    }
    function reorderChildren(domNode, moves) {
        var childNodes = domNode.childNodes;
        var keyMap = {};
        var node;
        var remove;
        var insert;
        for (var i = 0; i < moves.removes.length; i++) {
            remove = moves.removes[i];
            node = childNodes[remove.from];
            if (remove.key) {
                keyMap[remove.key] = node;
            }
            domNode.removeChild(node);
        }
        var length = childNodes.length;
        for (var j = 0; j < moves.inserts.length; j++) {
            insert = moves.inserts[j];
            node = keyMap[insert.key];
            domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to]);
        }
    }
    function replaceRoot(oldRoot, newRoot) {
        if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
            oldRoot.parentNode.replaceChild(newRoot, oldRoot);
        }
        return newRoot;
    }
}, function(module, exports, __webpack_require__) {
    var document = __webpack_require__(9);
    var isArray = __webpack_require__(7);
    var render = __webpack_require__(12);
    var domIndex = __webpack_require__(46);
    var patchOp = __webpack_require__(47);
    module.exports = patch;
    function patch(rootNode, patches, renderOptions) {
        renderOptions = renderOptions || {};
        renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch ? renderOptions.patch : patchRecursive;
        renderOptions.render = renderOptions.render || render;
        return renderOptions.patch(rootNode, patches, renderOptions);
    }
    function patchRecursive(rootNode, patches, renderOptions) {
        var indices = patchIndices(patches);
        if (indices.length === 0) {
            return rootNode;
        }
        var index = domIndex(rootNode, patches.a, indices);
        var ownerDocument = rootNode.ownerDocument;
        if (!renderOptions.document && ownerDocument !== document) {
            renderOptions.document = ownerDocument;
        }
        for (var i = 0; i < indices.length; i++) {
            var nodeIndex = indices[i];
            rootNode = applyPatch(rootNode, index[nodeIndex], patches[nodeIndex], renderOptions);
        }
        return rootNode;
    }
    function applyPatch(rootNode, domNode, patchList, renderOptions) {
        if (!domNode) {
            return rootNode;
        }
        var newNode;
        if (isArray(patchList)) {
            for (var i = 0; i < patchList.length; i++) {
                newNode = patchOp(patchList[i], domNode, renderOptions);
                if (domNode === rootNode) {
                    rootNode = newNode;
                }
            }
        } else {
            newNode = patchOp(patchList, domNode, renderOptions);
            if (domNode === rootNode) {
                rootNode = newNode;
            }
        }
        return rootNode;
    }
    function patchIndices(patches) {
        var indices = [];
        for (var key in patches) {
            if (key !== "a") {
                indices.push(Number(key));
            }
        }
        return indices;
    }
}, function(module, exports, __webpack_require__) {
    var isWidget = __webpack_require__(0);
    module.exports = updateWidget;
    function updateWidget(a, b) {
        if (isWidget(a) && isWidget(b)) {
            if ("name" in a && "name" in b) {
                return a.id === b.id;
            } else {
                return a.init === b.init;
            }
        }
        return false;
    }
}, function(module, exports, __webpack_require__) {
    "use strict";
    var EvStore = __webpack_require__(32);
    module.exports = EvHook;
    function EvHook(value) {
        if (!(this instanceof EvHook)) {
            return new EvHook(value);
        }
        this.value = value;
    }
    EvHook.prototype.hook = function(node, propertyName) {
        var es = EvStore(node);
        var propName = propertyName.substr(3);
        es[propName] = this.value;
    };
    EvHook.prototype.unhook = function(node, propertyName) {
        var es = EvStore(node);
        var propName = propertyName.substr(3);
        es[propName] = undefined;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = SoftSetHook;
    function SoftSetHook(value) {
        if (!(this instanceof SoftSetHook)) {
            return new SoftSetHook(value);
        }
        this.value = value;
    }
    SoftSetHook.prototype.hook = function(node, propertyName) {
        if (node[propertyName] !== this.value) {
            node[propertyName] = this.value;
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var isArray = __webpack_require__(7);
    var VNode = __webpack_require__(14);
    var VText = __webpack_require__(16);
    var isVNode = __webpack_require__(1);
    var isVText = __webpack_require__(5);
    var isWidget = __webpack_require__(0);
    var isHook = __webpack_require__(4);
    var isVThunk = __webpack_require__(3);
    var parseTag = __webpack_require__(53);
    var softSetHook = __webpack_require__(51);
    var evHook = __webpack_require__(50);
    module.exports = h;
    function h(tagName, properties, children) {
        var childNodes = [];
        var tag, props, key, namespace;
        if (!children && isChildren(properties)) {
            children = properties;
            props = {};
        }
        props = props || properties || {};
        tag = parseTag(tagName, props);
        if (props.hasOwnProperty("key")) {
            key = props.key;
            props.key = undefined;
        }
        if (props.hasOwnProperty("namespace")) {
            namespace = props.namespace;
            props.namespace = undefined;
        }
        if (tag === "INPUT" && !namespace && props.hasOwnProperty("value") && props.value !== undefined && !isHook(props.value)) {
            props.value = softSetHook(props.value);
        }
        transformProperties(props);
        if (children !== undefined && children !== null) {
            addChild(children, childNodes, tag, props);
        }
        return new VNode(tag, props, childNodes, key, namespace);
    }
    function addChild(c, childNodes, tag, props) {
        if (typeof c === "string") {
            childNodes.push(new VText(c));
        } else if (typeof c === "number") {
            childNodes.push(new VText(String(c)));
        } else if (isChild(c)) {
            childNodes.push(c);
        } else if (isArray(c)) {
            for (var i = 0; i < c.length; i++) {
                addChild(c[i], childNodes, tag, props);
            }
        } else if (c === null || c === undefined) {
            return;
        } else {
            throw UnexpectedVirtualElement({
                foreignObject: c,
                parentVnode: {
                    tagName: tag,
                    properties: props
                }
            });
        }
    }
    function transformProperties(props) {
        for (var propName in props) {
            if (props.hasOwnProperty(propName)) {
                var value = props[propName];
                if (isHook(value)) {
                    continue;
                }
                if (propName.substr(0, 3) === "ev-") {
                    props[propName] = evHook(value);
                }
            }
        }
    }
    function isChild(x) {
        return isVNode(x) || isVText(x) || isWidget(x) || isVThunk(x);
    }
    function isChildren(x) {
        return typeof x === "string" || isArray(x) || isChild(x);
    }
    function UnexpectedVirtualElement(data) {
        var err = new Error();
        err.type = "virtual-hyperscript.unexpected.virtual-element";
        err.message = "Unexpected virtual child passed to h().\n" + "Expected a VNode / Vthunk / VWidget / string but:\n" + "got:\n" + errorString(data.foreignObject) + ".\n" + "The parent vnode is:\n" + errorString(data.parentVnode);
        "\n" + "Suggested fix: change your `h(..., [ ... ])` callsite.";
        err.foreignObject = data.foreignObject;
        err.parentVnode = data.parentVnode;
        return err;
    }
    function errorString(obj) {
        try {
            return JSON.stringify(obj, null, "    ");
        } catch (e) {
            return String(obj);
        }
    }
}, function(module, exports, __webpack_require__) {
    "use strict";
    var split = __webpack_require__(31);
    var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
    var notClassId = /^\.|#/;
    module.exports = parseTag;
    function parseTag(tag, props) {
        if (!tag) {
            return "DIV";
        }
        var noId = !props.hasOwnProperty("id");
        var tagParts = split(tag, classIdSplit);
        var tagName = null;
        if (notClassId.test(tagParts[1])) {
            tagName = "DIV";
        }
        var classes, part, type, i;
        for (i = 0; i < tagParts.length; i++) {
            part = tagParts[i];
            if (!part) {
                continue;
            }
            type = part.charAt(0);
            if (!tagName) {
                tagName = part;
            } else if (type === ".") {
                classes = classes || [];
                classes.push(part.substring(1, part.length));
            } else if (type === "#" && noId) {
                props.id = part.substring(1, part.length);
            }
        }
        if (classes) {
            if (props.className) {
                classes.push(props.className);
            }
            props.className = classes.join(" ");
        }
        return props.namespace ? tagName : tagName.toUpperCase();
    }
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(10);
    var isHook = __webpack_require__(4);
    module.exports = diffProps;
    function diffProps(a, b) {
        var diff;
        for (var aKey in a) {
            if (!(aKey in b)) {
                diff = diff || {};
                diff[aKey] = undefined;
            }
            var aValue = a[aKey];
            var bValue = b[aKey];
            if (aValue === bValue) {
                continue;
            } else if (isObject(aValue) && isObject(bValue)) {
                if (getPrototype(bValue) !== getPrototype(aValue)) {
                    diff = diff || {};
                    diff[aKey] = bValue;
                } else if (isHook(bValue)) {
                    diff = diff || {};
                    diff[aKey] = bValue;
                } else {
                    var objectDiff = diffProps(aValue, bValue);
                    if (objectDiff) {
                        diff = diff || {};
                        diff[aKey] = objectDiff;
                    }
                }
            } else {
                diff = diff || {};
                diff[aKey] = bValue;
            }
        }
        for (var bKey in b) {
            if (!(bKey in a)) {
                diff = diff || {};
                diff[bKey] = b[bKey];
            }
        }
        return diff;
    }
    function getPrototype(value) {
        if (Object.getPrototypeOf) {
            return Object.getPrototypeOf(value);
        } else if (value.__proto__) {
            return value.__proto__;
        } else if (value.constructor) {
            return value.constructor.prototype;
        }
    }
}, function(module, exports, __webpack_require__) {
    var isArray = __webpack_require__(7);
    var VPatch = __webpack_require__(15);
    var isVNode = __webpack_require__(1);
    var isVText = __webpack_require__(5);
    var isWidget = __webpack_require__(0);
    var isThunk = __webpack_require__(3);
    var handleThunk = __webpack_require__(13);
    var diffProps = __webpack_require__(54);
    module.exports = diff;
    function diff(a, b) {
        var patch = {
            a: a
        };
        walk(a, b, patch, 0);
        return patch;
    }
    function walk(a, b, patch, index) {
        if (a === b) {
            return;
        }
        var apply = patch[index];
        var applyClear = false;
        if (isThunk(a) || isThunk(b)) {
            thunks(a, b, patch, index);
        } else if (b == null) {
            if (!isWidget(a)) {
                clearState(a, patch, index);
                apply = patch[index];
            }
            apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b));
        } else if (isVNode(b)) {
            if (isVNode(a)) {
                if (a.tagName === b.tagName && a.namespace === b.namespace && a.key === b.key) {
                    var propsPatch = diffProps(a.properties, b.properties);
                    if (propsPatch) {
                        apply = appendPatch(apply, new VPatch(VPatch.PROPS, a, propsPatch));
                    }
                    apply = diffChildren(a, b, patch, apply, index);
                } else {
                    apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b));
                    applyClear = true;
                }
            } else {
                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b));
                applyClear = true;
            }
        } else if (isVText(b)) {
            if (!isVText(a)) {
                apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b));
                applyClear = true;
            } else if (a.text !== b.text) {
                apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b));
            }
        } else if (isWidget(b)) {
            if (!isWidget(a)) {
                applyClear = true;
            }
            apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b));
        }
        if (apply) {
            patch[index] = apply;
        }
        if (applyClear) {
            clearState(a, patch, index);
        }
    }
    function diffChildren(a, b, patch, apply, index) {
        var aChildren = a.children;
        var orderedSet = reorder(aChildren, b.children);
        var bChildren = orderedSet.children;
        var aLen = aChildren.length;
        var bLen = bChildren.length;
        var len = aLen > bLen ? aLen : bLen;
        for (var i = 0; i < len; i++) {
            var leftNode = aChildren[i];
            var rightNode = bChildren[i];
            index += 1;
            if (!leftNode) {
                if (rightNode) {
                    apply = appendPatch(apply, new VPatch(VPatch.INSERT, null, rightNode));
                }
            } else {
                walk(leftNode, rightNode, patch, index);
            }
            if (isVNode(leftNode) && leftNode.count) {
                index += leftNode.count;
            }
        }
        if (orderedSet.moves) {
            apply = appendPatch(apply, new VPatch(VPatch.ORDER, a, orderedSet.moves));
        }
        return apply;
    }
    function clearState(vNode, patch, index) {
        unhook(vNode, patch, index);
        destroyWidgets(vNode, patch, index);
    }
    function destroyWidgets(vNode, patch, index) {
        if (isWidget(vNode)) {
            if (typeof vNode.destroy === "function") {
                patch[index] = appendPatch(patch[index], new VPatch(VPatch.REMOVE, vNode, null));
            }
        } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
            var children = vNode.children;
            var len = children.length;
            for (var i = 0; i < len; i++) {
                var child = children[i];
                index += 1;
                destroyWidgets(child, patch, index);
                if (isVNode(child) && child.count) {
                    index += child.count;
                }
            }
        } else if (isThunk(vNode)) {
            thunks(vNode, null, patch, index);
        }
    }
    function thunks(a, b, patch, index) {
        var nodes = handleThunk(a, b);
        var thunkPatch = diff(nodes.a, nodes.b);
        if (hasPatches(thunkPatch)) {
            patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch);
        }
    }
    function hasPatches(patch) {
        for (var index in patch) {
            if (index !== "a") {
                return true;
            }
        }
        return false;
    }
    function unhook(vNode, patch, index) {
        if (isVNode(vNode)) {
            if (vNode.hooks) {
                patch[index] = appendPatch(patch[index], new VPatch(VPatch.PROPS, vNode, undefinedKeys(vNode.hooks)));
            }
            if (vNode.descendantHooks || vNode.hasThunks) {
                var children = vNode.children;
                var len = children.length;
                for (var i = 0; i < len; i++) {
                    var child = children[i];
                    index += 1;
                    unhook(child, patch, index);
                    if (isVNode(child) && child.count) {
                        index += child.count;
                    }
                }
            }
        } else if (isThunk(vNode)) {
            thunks(vNode, null, patch, index);
        }
    }
    function undefinedKeys(obj) {
        var result = {};
        for (var key in obj) {
            result[key] = undefined;
        }
        return result;
    }
    function reorder(aChildren, bChildren) {
        var bChildIndex = keyIndex(bChildren);
        var bKeys = bChildIndex.keys;
        var bFree = bChildIndex.free;
        if (bFree.length === bChildren.length) {
            return {
                children: bChildren,
                moves: null
            };
        }
        var aChildIndex = keyIndex(aChildren);
        var aKeys = aChildIndex.keys;
        var aFree = aChildIndex.free;
        if (aFree.length === aChildren.length) {
            return {
                children: bChildren,
                moves: null
            };
        }
        var newChildren = [];
        var freeIndex = 0;
        var freeCount = bFree.length;
        var deletedItems = 0;
        for (var i = 0; i < aChildren.length; i++) {
            var aItem = aChildren[i];
            var itemIndex;
            if (aItem.key) {
                if (bKeys.hasOwnProperty(aItem.key)) {
                    itemIndex = bKeys[aItem.key];
                    newChildren.push(bChildren[itemIndex]);
                } else {
                    itemIndex = i - deletedItems++;
                    newChildren.push(null);
                }
            } else {
                if (freeIndex < freeCount) {
                    itemIndex = bFree[freeIndex++];
                    newChildren.push(bChildren[itemIndex]);
                } else {
                    itemIndex = i - deletedItems++;
                    newChildren.push(null);
                }
            }
        }
        var lastFreeIndex = freeIndex >= bFree.length ? bChildren.length : bFree[freeIndex];
        for (var j = 0; j < bChildren.length; j++) {
            var newItem = bChildren[j];
            if (newItem.key) {
                if (!aKeys.hasOwnProperty(newItem.key)) {
                    newChildren.push(newItem);
                }
            } else if (j >= lastFreeIndex) {
                newChildren.push(newItem);
            }
        }
        var simulate = newChildren.slice();
        var simulateIndex = 0;
        var removes = [];
        var inserts = [];
        var simulateItem;
        for (var k = 0; k < bChildren.length; ) {
            var wantedItem = bChildren[k];
            simulateItem = simulate[simulateIndex];
            while (simulateItem === null && simulate.length) {
                removes.push(remove(simulate, simulateIndex, null));
                simulateItem = simulate[simulateIndex];
            }
            if (!simulateItem || simulateItem.key !== wantedItem.key) {
                if (wantedItem.key) {
                    if (simulateItem && simulateItem.key) {
                        if (bKeys[simulateItem.key] !== k + 1) {
                            removes.push(remove(simulate, simulateIndex, simulateItem.key));
                            simulateItem = simulate[simulateIndex];
                            if (!simulateItem || simulateItem.key !== wantedItem.key) {
                                inserts.push({
                                    key: wantedItem.key,
                                    to: k
                                });
                            } else {
                                simulateIndex++;
                            }
                        } else {
                            inserts.push({
                                key: wantedItem.key,
                                to: k
                            });
                        }
                    } else {
                        inserts.push({
                            key: wantedItem.key,
                            to: k
                        });
                    }
                    k++;
                } else if (simulateItem && simulateItem.key) {
                    removes.push(remove(simulate, simulateIndex, simulateItem.key));
                }
            } else {
                simulateIndex++;
                k++;
            }
        }
        while (simulateIndex < simulate.length) {
            simulateItem = simulate[simulateIndex];
            removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key));
        }
        if (removes.length === deletedItems && !inserts.length) {
            return {
                children: newChildren,
                moves: null
            };
        }
        return {
            children: newChildren,
            moves: {
                removes: removes,
                inserts: inserts
            }
        };
    }
    function remove(arr, index, key) {
        arr.splice(index, 1);
        return {
            from: index,
            key: key
        };
    }
    function keyIndex(children) {
        var keys = {};
        var free = [];
        var length = children.length;
        for (var i = 0; i < length; i++) {
            var child = children[i];
            if (child.key) {
                keys[child.key] = i;
            } else {
                free.push(i);
            }
        }
        return {
            keys: keys,
            free: free
        };
    }
    function appendPatch(apply, patch) {
        if (apply) {
            if (isArray(apply)) {
                apply.push(patch);
            } else {
                apply = [ apply, patch ];
            }
            return apply;
        } else {
            return patch;
        }
    }
}, function(module, exports) {} ]);