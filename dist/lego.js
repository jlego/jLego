/**
 * lego.js v0.1.0
 * (c) 2016 Ronghui Yu
 * @license MIT
 */
"use strict";

function _interopDefault(ex) {
    return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
}

var Events = _interopDefault(require("events"));

var director = require("director");

var object_observe = require("object.observe");

var hyperx = _interopDefault(require("hyperx"));

var vdom = _interopDefault(require("virtual-dom"));

window.hx = hyperx(vdom.h);

var View = function View(opts) {
    var this$1 = this;
    if (opts === void 0) opts = {};
    var that = this;
    this.options = {
        events: null,
        listen: null,
        config: {}
    };
    Lego.$.extend(true, this.options, opts);
    this.Eventer = Lego.Eventer;
    this.setElement(this.options.el);
    this.data = this.options.data || this.data || {};
    this.server = null;
    this.isloaded = false;
    this._renderRootNode();
    this._observe();
    if (this.options.dataSource) {
        var dataSource = this.options.dataSource;
        if (dataSource.server) {
            if (typeof dataSource.server == "function") {
                this.server = new dataSource.server();
            } else {
                this.server = dataSource.server;
            }
            this.server.fetch(dataSource.api, function(resp) {
                if (Array.isArray(resp)) {
                    this$1.data.list = resp;
                } else {
                    this$1.data = resp;
                }
                this$1.refresh();
            });
        }
    } else {
        this._renderComponents();
    }
};

View.prototype._renderRootNode = function _renderRootNode() {
    var content = this.render();
    this.oldNode = content;
    this.rootNode = vdom.create(content);
    this.$el[this.options.insert](this.rootNode);
};

View.prototype._renderComponents = function _renderComponents() {
    var that = this;
    if (this.options.components.length && !this.isloaded) {
        this.isloaded = true;
        this.options.components.forEach(function(item, i) {
            Lego.create(item);
        });
    }
};

View.prototype._observe = function _observe() {
    var that = this;
    if (this.data && typeof this.data === "object") {
        Object.observe(this.data, function(changes) {
            var newNode = that.render();
            var patches = vdom.diff(that.oldNode, newNode);
            that.rootNode = vdom.patch(that.rootNode, patches);
            that.oldNode = newNode;
            that._renderComponents();
        });
    }
};

View.prototype.setElement = function setElement(element) {
    this.unEvents();
    this._setElement(element);
    this.delegateEvents();
    return this;
};

View.prototype._setElement = function _setElement(el) {
    this.$el = el instanceof Lego.$ ? el : Lego.$(el);
    this.el = this.$el[0];
};

View.prototype.delegateEvents = function delegateEvents() {
    var this$1 = this;
    var events = this.options.events;
    var delegateEventSplitter = /^(\S+)\s*(.*)$/;
    if (!events) {
        return this;
    }
    this.unEvents();
    for (var key in events) {
        var method = events[key];
        if (typeof method !== "function") {
            method = this$1[method];
        }
        if (!method) {
            continue;
        }
        var match = key.match(delegateEventSplitter);
        this$1.delegate(match[1], match[2], method.bind(this$1));
    }
    return this;
};

View.prototype.delegate = function delegate(eventName, selector, listener) {
    this.$el.on(eventName + ".delegateEvents" + this.options.id, selector, listener);
    return this;
};

View.prototype.unEvents = function unEvents() {
    if (this.$el) {
        this.$el.off(".delegateEvents" + this.options.id);
    }
    return this;
};

View.prototype.undelegate = function undelegate(eventName, selector, listener) {
    this.$el.off(eventName + ".delegateEvents" + this.options.id, selector, listener);
    return this;
};

View.prototype.$ = function $(selector) {
    return this.$el.find(selector);
};

View.prototype.render = function render() {
    return "";
};

View.prototype.refresh = function refresh() {
    this.data.__v = Lego.randomKey();
};

View.prototype.remove = function remove() {
    this.unEvents();
    this.$el.children().remove();
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
    this.Eventer = Lego.Eventer;
    for (var key in opts) {
        this$1.datas.set(key, opts[key]);
        this$1.datas.get(key).data = {};
    }
};

Data.prototype.setOptions = function setOptions(apiName, opts) {
    if (opts === void 0) opts = {};
    if (!this.datas.get(apiName)) {
        return this;
    }
    var newOpts = Lego.$.extend(true, this.datas.get(apiName), opts);
    this.datas.set(apiName, newOpts);
    return this;
};

Data.prototype.fetch = function fetch(apiNameArr, callback) {
    var that = this;
    apiNameArr = Array.isArray(apiNameArr) ? apiNameArr : [ apiNameArr ];
    this.__fetch(apiNameArr).then(function(datas) {
        apiNameArr.forEach(function(apiName, index) {
            var data = datas[index];
            var listTarget = that.datas.get(apiName).listTarget;
            var model = that.datas.get(apiName).model;
            if (data) {
                if (listTarget && Array.isArray(data[listTarget]) && model) {
                    data[listTarget].forEach(function(item, i) {
                        data[listTarget][i] = Lego.$.extend({}, model, item);
                    });
                }
                if (!listTarget && Array.isArray(data) && !model) {
                    data.forEach(function(item, i) {
                        data[i] = Lego.$.extend({}, model, item);
                    });
                }
            }
            that.datas.get(apiName).data = data;
        });
        if (typeof callback == "function") {
            callback(that.parse(datas));
        }
    });
};

Data.prototype.__fetch = function __fetch(apiNameArr) {
    return __async(regeneratorRuntime.mark(function callee$1$0() {
        var that, results, promisesArr, promise, t$2$0, t$2$1, res;
        return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
            var this$1 = this;
            while (1) {
                switch (context$2$0.prev = context$2$0.next) {
                  case 0:
                    that = this$1, results = [];
                    context$2$0.prev = 1;
                    promisesArr = apiNameArr.map(function(apiName) {
                        return __async(regeneratorRuntime.mark(function callee$3$0() {
                            var option, req, response;
                            return regeneratorRuntime.wrap(function callee$3$0$(context$4$0) {
                                while (1) {
                                    switch (context$4$0.prev = context$4$0.next) {
                                      case 0:
                                        option = that.datas.get(apiName) || {};
                                        if (!(!Lego.$.isEmptyObject(option.data) && !option.reset)) {
                                            context$4$0.next = 7;
                                            break;
                                        }
                                        context$4$0.next = 4;
                                        return option.data;

                                      case 4:
                                        return context$4$0.abrupt("return", context$4$0.sent);

                                      case 7:
                                        if (!(that.datas.has(apiName) && option.url && (Lego.$.isEmptyObject(option.data) || option.reset))) {
                                            context$4$0.next = 13;
                                            break;
                                        }
                                        req = new Request(option.url, {
                                            method: option.method || "GET",
                                            headers: option.headers || "none",
                                            mode: "same-origin",
                                            credentials: "include",
                                            body: option.body || undefined
                                        });
                                        context$4$0.next = 11;
                                        return fetch(req);

                                      case 11:
                                        response = context$4$0.sent;
                                        return context$4$0.abrupt("return", response.json());

                                      case 13:
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

Data.prototype.parse = function parse(datas) {
    return datas;
};

Data.prototype.getData = function getData(apiName) {
    if (apiName) {
        return this.datas.get(apiName) ? this.datas.get(apiName) : {};
    } else {
        return this.datas;
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

var Lego$1 = function Lego$1(opts) {
    if (opts === void 0) opts = {};
    var that = this;
    this.config = {
        alias: "Lego",
        version: "1.0.0",
        $: null,
        isDebug: true,
        isAnimate: false,
        isPermit: false,
        isMultiWindow: false,
        isVDom: true,
        pageEl: "",
        defaultApp: "",
        rootUri: "",
        routerConfig: {},
        screenWidth: window.innerWidth
    };
    Object.assign(this.config, opts);
    this._debugger();
    if (this.config.$) {
        window.$ = this.$ = this.config.$;
    } else {
        debug.error("请先设置参数$");
        return;
    }
    this.$el = this.$;
    this.prevApp = "";
    this.currentApp = "index";
    this.Event = Events;
    this.Router = director.Router;
    this.View = View;
    this.Data = Data;
    this.views = {};
    this.datas = {};
    this.permis = {};
    this.timer = {};
    this.routers = new Map();
    this.Eventer = new Events();
    window[this.config.alias] = window.Lego = this;
    this.startApp(this.currentApp);
    return this;
};

Lego$1.prototype.create = function create(opts) {
    var this$1 = this;
    if (opts === void 0) opts = {};
    var that = this, options = {
        id: "",
        el: this.config.pageEl,
        tagName: "div",
        insert: "html",
        permis: null,
        view: null,
        components: [],
        events: {},
        listen: {},
        scrollbar: null,
        data: null,
        dataSource: null,
        onBefore: function onBefore() {},
        onAfter: function onAfter() {},
        onAnimateBefore: function onAnimateBefore() {},
        onAnimateAfter: function onAnimateAfter() {}
    };
    Object.assign(options, opts);
    options.id = options.id || (this.config.alias + window.location.hash.replace(/\//g, "_") + "_" + options.el).replace(/#/g, "");
    options.onBefore = options.onBefore.bind(this);
    options.onAfter = options.onAfter.bind(this);
    options.onAnimateBefore = options.onAnimateBefore.bind(this);
    options.onAnimateAfter = options.onAnimateAfter.bind(this);
    if (options.permis) {
        var module = options.permis.module, operate = options.permis.operate, hide = options.permis.hide, userId = options.permis.userid || 0;
        if (hide) {
            if (!this.permis.check(module, operate, userId)) {
                return;
            }
        }
    }
    typeof options.onBefore === "function" && options.onBefore();
    if (this.views[this.prevApp].has(options.el) && !this.config.isMultiWindow) {
        this.views[this.prevApp].get(options.el).unEvents();
        this.views[this.prevApp].delete(options.el);
    }
    if (this.views[this.currentApp].has(options.el) && !this.config.isMultiWindow) {
        this.views[this.currentApp].get(options.el).unEvents();
        this.views[this.currentApp].delete(options.el);
    }
    var viewObj = new options.view(options);
    this.views[this.currentApp].set(options.el, viewObj);
    if (!this.$.isEmptyObject(options.listen)) {
        for (var key in options.listen) {
            this$1.Eventer.removeListener(key);
            this$1.Eventer.on(key, options.listen[key]);
        }
    }
    typeof options.onAfter === "function" && options.onAfter(viewObj);
    return viewObj;
};

Lego$1.init = function init(opts) {
    if (opts === void 0) opts = {};
    new this(opts);
};

Lego$1.prototype.randomKey = function randomKey(len) {
    len = len || 32;
    var $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var maxPos = $chars.length;
    var pwd = "";
    for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
};

Lego$1.prototype._debugger = function _debugger() {
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

Lego$1.prototype._initObj = function _initObj(appName) {
    this.views[appName] = this.views[appName] || new Map();
    this.timer[appName] = this.timer[appName] || new Map();
};

Lego$1.prototype._clearObj = function _clearObj(appName) {
    var that = this;
    if (this.prevApp !== this.currentApp) {
        this.timer[appName].forEach(function(value, key) {
            clearTimeout(value);
            clearInterval(value);
            that.timer[appName].delete(key);
        });
    }
};

Lego$1.prototype.startApp = function startApp(appPath, opts) {
    if (opts === void 0) opts = {};
    var options = {
        onBefore: function onBefore() {},
        onAfter: function onAfter() {}
    }, that = this, appName, index;
    Object.assign(options, opts);
    var hash = window.location.hash.replace(/#/, "");
    var newHash = hash.indexOf("/") == 0 ? hash.replace(/\//, "") : "";
    newHash = newHash !== "index" ? newHash : "";
    appPath = appPath || newHash || this.config.defaultApp;
    appName = appPath.indexOf("/") > 0 ? appPath.split("/")[0] : appPath;
    this.prevApp = this.currentApp;
    this.currentApp = appName;
    this._initObj(appName);
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
            if (appPath && appName !== "index") {
                that.routers.get(appName).setRoute(appPath);
            }
            that._clearObj(that.prevApp);
            if (typeof options.onAfter == "function") {
                options.onAfter(e);
            }
        },
        error: function(e) {
            debug.error("Failed to load application module!");
        }
    });
};

Lego$1.prototype.getUrlParam = function getUrlParam(name) {
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

Lego$1.prototype.trigger = function trigger(event, data) {
    this.Eventer.emit(event, data);
};

Lego$1.prototype.getAppName = function getAppName() {
    var hash = window.location.hash.replace(/#/, "");
    hash = hash.indexOf("/") == 0 ? hash.replace(/\//, "") : "";
    return hash.split("/")[0] || this.config.defaultApp;
};

Lego$1.prototype.getView = function getView(el, appName) {
    if (appName === void 0) appName = this.getAppName();
    el = el instanceof this.$ ? el : this.$(el);
    if (el.length && this.views[appName].get(el)) {
        return this.views[appName].get(el);
    }
    return null;
};

Lego$1.prototype.setTimer = function setTimer(name, timer) {
    if (name && timer) {
        var oldTimerMap = this.timer[this.getAppName()], oldTimer = oldTimerMap.get(name);
        if (oldTimer) {
            clearTimeout(oldTimer);
            clearInterval(oldTimer);
            oldTimerMap.clear();
        }
        oldTimerMap.set(name, timer);
    }
};

Lego$1.prototype.router = function router(routerOption) {
    var appName = this.currentApp;
    if (appName == "index") {
        return;
    }
    if (!this.routers.has(appName)) {
        var routerObj = this.Router(routerOption).init();
        this.routers.set(appName, routerObj);
    }
    return this.routers.get(appName);
};

module.exports = Lego$1;
