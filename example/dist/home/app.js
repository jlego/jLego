/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _homeView = __webpack_require__(1);

	var _homeView2 = _interopRequireDefault(_homeView);

	var _listView = __webpack_require__(3);

	var _listView2 = _interopRequireDefault(_listView);

	var _listData = __webpack_require__(4);

	var _listData2 = _interopRequireDefault(_listData);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HomeRouter = function () {
	    function HomeRouter() {
	        _classCallCheck(this, HomeRouter);

	        return {
	            '/home': [this.list],
	            '/home/list': this.list,
	            '/home/detail/:id': this.detail
	        };
	    }

	    _createClass(HomeRouter, [{
	        key: 'home',
	        value: function home() {
	            // console.warn('kkkkkkkkk');
	            HBY.create({
	                view: _listView2.default,
	                id: 20,
	                data: [{ first: 'home', last: 'Bond' }, { first: 'test', last: 'bbbb' }],
	                items: [{
	                    el: '#home',
	                    view: _homeView2.default,
	                    id: 30,
	                    data: [{ first: 'home2', last: 'Bond2' }, { first: 'test2', last: 'bbbb2' }]
	                }, {
	                    el: '#test',
	                    view: _homeView2.default,
	                    id: 40,
	                    data: [{ first: 'home3', last: 'Bond3' }, { first: 'test3', last: 'bbbb3' }]
	                }]
	            });
	            // console.warn(Array.isArray([1,2]));
	            // new homeView({ id: 20 });
	        }
	    }, {
	        key: 'list',
	        value: function list() {
	            _listData2.default.fetchData(['test', 'ok'], function (resp) {
	                var data = HBY.getDatas('test');
	                console.warn('dddddddddddddd', resp, HBY.getDatas('test'));
	                HBY.create({
	                    view: _listView2.default,
	                    id: 20,
	                    data: data
	                });
	            });
	        }
	    }, {
	        key: 'detail',
	        value: function detail(id) {
	            console.warn('pppppppppp');
	        }
	    }]);

	    return HomeRouter;
	}();

	HBY['app'] = new HomeRouter();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _view = __webpack_require__(2);

	var _view2 = _interopRequireDefault(_view);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var HomeView = function (_BaseView) {
	    _inherits(HomeView, _BaseView);

	    function HomeView() {
	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, HomeView);

	        options.events = {
	            'click #400': 'theClick'
	        };
	        return _possibleConstructorReturn(this, (HomeView.__proto__ || Object.getPrototypeOf(HomeView)).call(this, options));
	    }

	    _createClass(HomeView, [{
	        key: 'render',
	        value: function render() {
	            var data = this.options.data || [],
	                that = this,
	                subDom = [];
	            // const tmpl = addrs => `
	            //   <table>
	            //   ${addrs.map(addr => `
	            //     <tr><td><a href="#/home/read/3">${addr.first}</a></td></tr>
	            //     <tr><td><a href="#/test/2">${addr.last}_${this.options.id}</a></td></tr>
	            //   `).join('')}
	            //   </table>`;
	            // return tmpl(data);

	            data.forEach(function (model, i) {
	                subDom.push(HBY.h('a#' + that.options.id + i, {
	                    href: 'javascript:;',
	                    style: {
	                        display: 'block'
	                    }
	                }, [model.last]));
	            });
	            var rootNode = HBY.h('div#uuu88', subDom);
	            return HBY.createElement(rootNode);
	        }
	    }, {
	        key: 'theClick',
	        value: function theClick(event) {
	            console.warn('ooooooooooo');
	        }
	    }]);

	    return HomeView;
	}(_view2.default);

	exports.default = HomeView;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * lego.js v0.0.6
	 * (c) 2016 Evan You
	 * @license MIT
	 */
	"use strict";

	var View = function View(options) {
	    if (options === void 0) options = {};
	    var defaults = {
	        el: "",
	        tagName: "",
	        events: {},
	        permis: {},
	        animate: null,
	        config: {},
	        scrollbar: false,
	        items: []
	    };
	    this.options = Object.assign(defaults, options);
	    this.options.data = options.data || null;
	};

	View.prototype.render = function render() {
	    return null;
	};

	module.exports = View;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _view = __webpack_require__(2);

	var _view2 = _interopRequireDefault(_view);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ListView = function (_BaseView) {
	    _inherits(ListView, _BaseView);

	    function ListView() {
	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, ListView);

	        return _possibleConstructorReturn(this, (ListView.__proto__ || Object.getPrototypeOf(ListView)).call(this, options));
	    }

	    _createClass(ListView, [{
	        key: 'render',
	        value: function render() {
	            var data = this.options.data || [],
	                subDom = [];

	            data.forEach(function (model, i) {
	                subDom.push(HBY.h('div#' + model.first, {
	                    href: 'javascript:;',
	                    style: {
	                        display: 'block'
	                    }
	                }, [model.last]));
	            });
	            var rootNode = HBY.h('div#uuu', subDom);
	            return HBY.createElement(rootNode);
	        }
	    }]);

	    return ListView;
	}(_view2.default);

	exports.default = ListView;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _api = __webpack_require__(5);

	var _api2 = _interopRequireDefault(_api);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ListData = function (_BaseApi) {
	    _inherits(ListData, _BaseApi);

	    function ListData() {
	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, ListData);

	        var api = {
	            'test': {
	                url: './content.json',
	                model: {}
	            },
	            'ok': {
	                url: './content.json'
	            }
	        };
	        HBY.util.extend(api, options, true);
	        return _possibleConstructorReturn(this, (ListData.__proto__ || Object.getPrototypeOf(ListData)).call(this, api));
	    }

	    return ListData;
	}(_api2.default);

	exports.default = new ListData();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, module, process) {/**
	 * lego.js v0.0.6
	 * (c) 2016 Evan You
	 * @license MIT
	 */
	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var whatwgFetch = __webpack_require__(8);

	function __async(g) {
	    return new Promise(function (s, j) {
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

	!function (global) {
	    "use strict";

	    var hasOwn = Object.prototype.hasOwnProperty;
	    var undefined;
	    var $Symbol = typeof Symbol === "function" ? Symbol : {};
	    var iteratorSymbol = $Symbol.iterator || "@@iterator";
	    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	    var inModule = ( false ? "undefined" : _typeof(module)) === "object";
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
	        ["next", "throw", "return"].forEach(function (method) {
	            prototype[method] = function (arg) {
	                return this._invoke(method, arg);
	            };
	        });
	    }
	    runtime.isGeneratorFunction = function (genFun) {
	        var ctor = typeof genFun === "function" && genFun.constructor;
	        return ctor ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
	    };
	    runtime.mark = function (genFun) {
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
	    runtime.awrap = function (arg) {
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
	                    return Promise.resolve(value.arg).then(function (value) {
	                        invoke("next", value, resolve, reject);
	                    }, function (err) {
	                        invoke("throw", err, resolve, reject);
	                    });
	                }
	                return Promise.resolve(value).then(function (unwrapped) {
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
	                return new Promise(function (resolve, reject) {
	                    invoke(method, arg, resolve, reject);
	                });
	            }
	            return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	        }
	        this._invoke = enqueue;
	    }
	    defineIteratorMethods(AsyncIterator.prototype);
	    runtime.async = function (innerFn, outerFn, self, tryLocsList) {
	        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
	        return runtime.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
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
	    Gp[iteratorSymbol] = function () {
	        return this;
	    };
	    Gp[toStringTagSymbol] = "Generator";
	    Gp.toString = function () {
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
	        this.tryEntries = [{
	            tryLoc: "root"
	        }];
	        tryLocsList.forEach(pushTryEntry, this);
	        this.reset(true);
	    }
	    runtime.keys = function (object) {
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
	                var i = -1,
	                    next = function next() {
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

	var Api = function Api(options) {
	    var this$1 = this;
	    if (options === void 0) options = {};
	    this.datas = Lego.getDatas();
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
	    apiNameArr = Array.isArray(apiNameArr) ? apiNameArr : [apiNameArr];
	    this.__fetch(apiNameArr).then(function (data) {
	        apiNameArr.forEach(function (apiName, index) {
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
	                        promisesArr = apiNameArr.map(function (apiName) {
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
	        }, callee$1$0, this, [[1, 14]]);
	    }).call(this));
	};

	Api.prototype.parse = function parse(respArr) {
	    return respArr;
	};

	module.exports = Api;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(6)(module), __webpack_require__(7)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
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
	    while(len) {
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

	process.nextTick = function (fun) {
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

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 8 */
/***/ function(module, exports) {

	(function(self) {
	  'use strict';

	  if (self.fetch) {
	    return
	  }

	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }

	  if (support.arrayBuffer) {
	    var viewClasses = [
	      '[object Int8Array]',
	      '[object Uint8Array]',
	      '[object Uint8ClampedArray]',
	      '[object Int16Array]',
	      '[object Uint16Array]',
	      '[object Int32Array]',
	      '[object Uint32Array]',
	      '[object Float32Array]',
	      '[object Float64Array]'
	    ]

	    var isDataView = function(obj) {
	      return obj && DataView.prototype.isPrototypeOf(obj)
	    }

	    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
	      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
	    }
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }

	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }

	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }

	    return iterator
	  }

	  function Headers(headers) {
	    this.map = {}

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)

	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var oldValue = this.map[name]
	    this.map[name] = oldValue ? oldValue+','+value : value
	  }

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }

	  Headers.prototype.get = function(name) {
	    name = normalizeName(name)
	    return this.has(name) ? this.map[name] : null
	  }

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = normalizeValue(value)
	  }

	  Headers.prototype.forEach = function(callback, thisArg) {
	    for (var name in this.map) {
	      if (this.map.hasOwnProperty(name)) {
	        callback.call(thisArg, this.map[name], name, this)
	      }
	    }
	  }

	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }

	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }

	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }

	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    var promise = fileReaderReady(reader)
	    reader.readAsArrayBuffer(blob)
	    return promise
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    var promise = fileReaderReady(reader)
	    reader.readAsText(blob)
	    return promise
	  }

	  function readArrayBufferAsText(buf) {
	    var view = new Uint8Array(buf)
	    var chars = new Array(view.length)

	    for (var i = 0; i < view.length; i++) {
	      chars[i] = String.fromCharCode(view[i])
	    }
	    return chars.join('')
	  }

	  function bufferClone(buf) {
	    if (buf.slice) {
	      return buf.slice(0)
	    } else {
	      var view = new Uint8Array(buf.byteLength)
	      view.set(new Uint8Array(buf))
	      return view.buffer
	    }
	  }

	  function Body() {
	    this.bodyUsed = false

	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (!body) {
	        this._bodyText = ''
	      } else if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
	        this._bodyArrayBuffer = bufferClone(body.buffer)
	        // IE 10-11 can't handle a DataView body.
	        this._bodyInit = new Blob([this._bodyArrayBuffer])
	      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
	        this._bodyArrayBuffer = bufferClone(body)
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }

	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
	      }
	    }

	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyArrayBuffer) {
	          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }

	      this.arrayBuffer = function() {
	        if (this._bodyArrayBuffer) {
	          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
	        } else {
	          return this.blob().then(readBlobAsArrayBuffer)
	        }
	      }
	    }

	    this.text = function() {
	      var rejected = consumed(this)
	      if (rejected) {
	        return rejected
	      }

	      if (this._bodyBlob) {
	        return readBlobAsText(this._bodyBlob)
	      } else if (this._bodyArrayBuffer) {
	        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
	      } else if (this._bodyFormData) {
	        throw new Error('could not read FormData body as text')
	      } else {
	        return Promise.resolve(this._bodyText)
	      }
	    }

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }

	  function Request(input, options) {
	    options = options || {}
	    var body = options.body

	    if (typeof input === 'string') {
	      this.url = input
	    } else {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body && input._bodyInit != null) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    }

	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }

	  Request.prototype.clone = function() {
	    return new Request(this, { body: this._bodyInit })
	  }

	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }

	  function parseHeaders(rawHeaders) {
	    var headers = new Headers()
	    rawHeaders.split('\r\n').forEach(function(line) {
	      var parts = line.split(':')
	      var key = parts.shift().trim()
	      if (key) {
	        var value = parts.join(':').trim()
	        headers.append(key, value)
	      }
	    })
	    return headers
	  }

	  Body.call(Request.prototype)

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }

	    this.type = 'default'
	    this.status = 'status' in options ? options.status : 200
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = 'statusText' in options ? options.statusText : 'OK'
	    this.headers = new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }

	  Body.call(Response.prototype)

	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }

	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }

	  var redirectStatuses = [301, 302, 303, 307, 308]

	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }

	    return new Response(null, {status: status, headers: {location: url}})
	  }

	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response

	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request = new Request(input, init)
	      var xhr = new XMLHttpRequest()

	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
	        }
	        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }

	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.open(request.method, request.url, true)

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ }
/******/ ]);