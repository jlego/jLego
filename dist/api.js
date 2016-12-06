/**
 * lego.js v0.0.6
 * (c) 2016 Evan You
 * @license MIT
 */
"use strict";

var whatwgFetch = require("whatwg-fetch");

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

var Api = function Api(options) {
    var this$1 = this;
    if (options === void 0) options = {};
    this.datas = Lego.currentDatas();
    for (var key in options) {
        if (this$1.datas.has(key)) {
            Lego.util.extend(this$1.datas.get(key), options[key], true);
        } else {
            this$1.datas.set(key, options[key]);
        }
    }
};

Api.prototype.fetchData = function fetchData(apiNameArr, callback) {
    var that = this;
    apiNameArr = Array.isArray(apiNameArr) ? apiNameArr : [ apiNameArr ];
    this.__fetch(apiNameArr).then(function(data) {
        apiNameArr.forEach(function(apiName, index) {
            if (Array.isArray(data[index])) {
                that.datas.get(apiName).data = data[index];
            } else {
                if (data[index]) {
                    Lego.util.extend(that.datas.get(apiName).data, data[index], true);
                }
            }
        });
        if (typeof callback == "function") {
            callback(that.parse(data));
        }
    });
};

Api.prototype.__fetch = function __fetch(apiNameArr) {
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
                                        if (!(option.data && !option.reset)) {
                                            context$4$0.next = 7;
                                            break;
                                        }
                                        context$4$0.next = 4;
                                        return option.data;

                                      case 4:
                                        return context$4$0.abrupt("return", context$4$0.sent);

                                      case 7:
                                        if (!(that.datas.has(apiName) && option.url && (!option.data || option.reset))) {
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

Api.prototype.parse = function parse(respArr) {
    return respArr;
};

module.exports = Api;
