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
/******/ ({

/***/ 0:
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
	            '/home/list': this.home,
	            '/home/detail/:id': this.detail
	        };
	    }

	    _createClass(HomeRouter, [{
	        key: 'home',
	        value: function home() {
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
	            var data = HBY.getData('test').data;
	            data[0].mm = 'only you';
	            console.warn(data);
	            // new homeView({ id: 20 });
	        }
	    }, {
	        key: 'list',
	        value: function list() {
	            _listData2.default.api(['test', 'ok'], function (resp) {
	                var data = HBY.getData('test').data;
	                HBY.create({
	                    view: _listView2.default,
	                    id: 20,
	                    data: data
	                });
	                console.warn('dddddddddddddd', resp, HBY.getData('ok'));
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

/***/ 1:
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
	            'click #test': 'theClick'
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

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * view.js v0.0.6
	 * (c) 2016 Evan You
	 * @license MIT
	 */
	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _interopDefault(ex) {
	    return ex && (typeof ex === "undefined" ? "undefined" : _typeof(ex)) === "object" && "default" in ex ? ex["default"] : ex;
	}

	var Events = _interopDefault(__webpack_require__(307));

	var object_observe = __webpack_require__(369);

	var View = function (Events$$1) {
	    function View(options) {
	        if (options === void 0) options = {};
	        var defaults = {
	            el: "",
	            tagName: "",
	            events: {},
	            permis: {},
	            animate: null,
	            config: {},
	            scrollbar: false,
	            items: [],
	            data: null
	        };
	        this.options = Lego.$.extend(true, defaults, options);
	        this.options.data = options.data || null;
	        var el = defaults.el;
	        var $el = el instanceof Lego.$ ? el : Lego.$(el);
	        Events$$1.call(this);
	        if (this.options.data) {
	            Object.observe(this.options.data, function (changes) {
	                console.log(changes);
	            });
	        }
	    }
	    if (Events$$1) View.__proto__ = Events$$1;
	    View.prototype = Object.create(Events$$1 && Events$$1.prototype);
	    View.prototype.constructor = View;
	    View.prototype.render = function render() {
	        return null;
	    };
	    View.prototype.destory = function destory() {
	        this.removeAllListeners();
	        $el.off().remove();
	    };
	    return View;
	}(Events);

	module.exports = View;

/***/ },

/***/ 3:
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

	        options.events = {
	            'click #test': 'theClick'
	        };
	        return _possibleConstructorReturn(this, (ListView.__proto__ || Object.getPrototypeOf(ListView)).call(this, options));
	    }

	    _createClass(ListView, [{
	        key: 'render',
	        value: function render() {

	            var object = { foo: null };
	            Object.observe(object, function (changes) {
	                console.log("Changes: ", changes);
	            });

	            object.foo = "bar";
	            object.foo = null;

	            var data = this.options.data || [],
	                subDom = [];

	            data.forEach(function (model, i) {
	                subDom.push(HBY.h('a#' + model.first, {
	                    href: '#/home/list',
	                    style: {
	                        display: 'block'
	                    }
	                }, [model.last]));
	            });
	            var rootNode = HBY.h('div#uuu', subDom);
	            return HBY.createElement(rootNode);
	        }
	    }, {
	        key: 'theClick',
	        value: function theClick(event) {
	            console.warn('eeeeeeeeeeeeee');
	        }
	    }]);

	    return ListView;
	}(_view2.default);

	exports.default = ListView;

/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _data = __webpack_require__(5);

	var _data2 = _interopRequireDefault(_data);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ListData = function (_BaseData) {
	    _inherits(ListData, _BaseData);

	    function ListData() {
	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, ListData);

	        var api = {
	            'test': {
	                url: './content.json',
	                listTarget: 'data',
	                model: {
	                    first: '',
	                    last: '',
	                    id: 0
	                }
	            },
	            'ok': {
	                url: './content.json'
	            }
	        };
	        HBY.$.extend(true, api, options);
	        return _possibleConstructorReturn(this, (ListData.__proto__ || Object.getPrototypeOf(ListData)).call(this, api));
	    }

	    return ListData;
	}(_data2.default);

	exports.default = new ListData();

/***/ },

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, module, process) {/**
	 * data.js v0.0.6
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

	var Data = function Data(options) {
	    var this$1 = this;
	    if (options === void 0) options = {};
	    this.datas = Lego.getData();
	    for (var key in options) {
	        if (this$1.datas.has(key)) {
	            this$1.datas.set(key, Lego.$.extend(true, this$1.datas.get(key) || {}, options[key]));
	        } else {
	            this$1.datas.set(key, options[key]);
	        }
	        this$1.datas.get(key).data = this$1.datas.get(key).data || null;
	    }
	};

	Data.prototype.api = function api(apiNameArr, callback) {
	    var that = this;
	    apiNameArr = Array.isArray(apiNameArr) ? apiNameArr : [apiNameArr];
	    this.__fetch(apiNameArr).then(function (data) {
	        apiNameArr.forEach(function (apiName, index) {
	            var apiResp = data[index];
	            that.datas.get(apiName).data = apiResp;
	            if (apiResp && !Array.isArray(apiResp)) {
	                var listTarget = that.datas.get(apiName).listTarget,
	                    model = that.datas.get(apiName).model,
	                    datas = that.datas.get(apiName).data;
	                if (listTarget && Array.isArray(apiResp[listTarget]) && model) {
	                    apiResp[listTarget].forEach(function (item, i) {
	                        datas[listTarget][i] = Lego.$.extend({}, model, item);
	                    });
	                }
	            }
	        });
	        if (typeof callback == "function") {
	            callback(that.parse(data));
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

	Data.prototype.parse = function parse(respArr) {
	    return respArr;
	};

	module.exports = Data;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(6)(module), __webpack_require__(7)))

/***/ },

/***/ 6:
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

/***/ 7:
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

/***/ 8:
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


/***/ },

/***/ 307:
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },

/***/ 369:
/***/ function(module, exports) {

	/*!
	 * Object.observe polyfill - v0.2.4
	 * by Massimo Artizzu (MaxArt2501)
	 *
	 * https://github.com/MaxArt2501/object-observe
	 *
	 * Licensed under the MIT License
	 * See LICENSE for details
	 */

	// Some type definitions
	/**
	 * This represents the data relative to an observed object
	 * @typedef  {Object}                     ObjectData
	 * @property {Map<Handler, HandlerData>}  handlers
	 * @property {String[]}                   properties
	 * @property {*[]}                        values
	 * @property {Descriptor[]}               descriptors
	 * @property {Notifier}                   notifier
	 * @property {Boolean}                    frozen
	 * @property {Boolean}                    extensible
	 * @property {Object}                     proto
	 */
	/**
	 * Function definition of a handler
	 * @callback Handler
	 * @param {ChangeRecord[]}                changes
	*/
	/**
	 * This represents the data relative to an observed object and one of its
	 * handlers
	 * @typedef  {Object}                     HandlerData
	 * @property {Map<Object, ObservedData>}  observed
	 * @property {ChangeRecord[]}             changeRecords
	 */
	/**
	 * @typedef  {Object}                     ObservedData
	 * @property {String[]}                   acceptList
	 * @property {ObjectData}                 data
	*/
	/**
	 * Type definition for a change. Any other property can be added using
	 * the notify() or performChange() methods of the notifier.
	 * @typedef  {Object}                     ChangeRecord
	 * @property {String}                     type
	 * @property {Object}                     object
	 * @property {String}                     [name]
	 * @property {*}                          [oldValue]
	 * @property {Number}                     [index]
	 */
	/**
	 * Type definition for a notifier (what Object.getNotifier returns)
	 * @typedef  {Object}                     Notifier
	 * @property {Function}                   notify
	 * @property {Function}                   performChange
	 */
	/**
	 * Function called with Notifier.performChange. It may optionally return a
	 * ChangeRecord that gets automatically notified, but `type` and `object`
	 * properties are overridden.
	 * @callback Performer
	 * @returns {ChangeRecord|undefined}
	 */

	Object.observe || (function(O, A, root, _undefined) {
	    "use strict";

	        /**
	         * Relates observed objects and their data
	         * @type {Map<Object, ObjectData}
	         */
	    var observed,
	        /**
	         * List of handlers and their data
	         * @type {Map<Handler, Map<Object, HandlerData>>}
	         */
	        handlers,

	        defaultAcceptList = [ "add", "update", "delete", "reconfigure", "setPrototype", "preventExtensions" ];

	    // Functions for internal usage

	        /**
	         * Checks if the argument is an Array object. Polyfills Array.isArray.
	         * @function isArray
	         * @param {?*} object
	         * @returns {Boolean}
	         */
	    var isArray = A.isArray || (function(toString) {
	            return function (object) { return toString.call(object) === "[object Array]"; };
	        })(O.prototype.toString),

	        /**
	         * Returns the index of an item in a collection, or -1 if not found.
	         * Uses the generic Array.indexOf or Array.prototype.indexOf if available.
	         * @function inArray
	         * @param {Array} array
	         * @param {*} pivot           Item to look for
	         * @param {Number} [start=0]  Index to start from
	         * @returns {Number}
	         */
	        inArray = A.prototype.indexOf ? A.indexOf || function(array, pivot, start) {
	            return A.prototype.indexOf.call(array, pivot, start);
	        } : function(array, pivot, start) {
	            for (var i = start || 0; i < array.length; i++)
	                if (array[i] === pivot)
	                    return i;
	            return -1;
	        },

	        /**
	         * Returns an instance of Map, or a Map-like object is Map is not
	         * supported or doesn't support forEach()
	         * @function createMap
	         * @returns {Map}
	         */
	        createMap = root.Map === _undefined || !Map.prototype.forEach ? function() {
	            // Lightweight shim of Map. Lacks clear(), entries(), keys() and
	            // values() (the last 3 not supported by IE11, so can't use them),
	            // it doesn't handle the constructor's argument (like IE11) and of
	            // course it doesn't support for...of.
	            // Chrome 31-35 and Firefox 13-24 have a basic support of Map, but
	            // they lack forEach(), so their native implementation is bad for
	            // this polyfill. (Chrome 36+ supports Object.observe.)
	            var keys = [], values = [];

	            return {
	                size: 0,
	                has: function(key) { return inArray(keys, key) > -1; },
	                get: function(key) { return values[inArray(keys, key)]; },
	                set: function(key, value) {
	                    var i = inArray(keys, key);
	                    if (i === -1) {
	                        keys.push(key);
	                        values.push(value);
	                        this.size++;
	                    } else values[i] = value;
	                },
	                "delete": function(key) {
	                    var i = inArray(keys, key);
	                    if (i > -1) {
	                        keys.splice(i, 1);
	                        values.splice(i, 1);
	                        this.size--;
	                    }
	                },
	                forEach: function(callback/*, thisObj*/) {
	                    for (var i = 0; i < keys.length; i++)
	                        callback.call(arguments[1], values[i], keys[i], this);
	                }
	            };
	        } : function() { return new Map(); },

	        /**
	         * Simple shim for Object.getOwnPropertyNames when is not available
	         * Misses checks on object, don't use as a replacement of Object.keys/getOwnPropertyNames
	         * @function getProps
	         * @param {Object} object
	         * @returns {String[]}
	         */
	        getProps = O.getOwnPropertyNames ? (function() {
	            var func = O.getOwnPropertyNames;
	            try {
	                arguments.callee;
	            } catch (e) {
	                // Strict mode is supported

	                // In strict mode, we can't access to "arguments", "caller" and
	                // "callee" properties of functions. Object.getOwnPropertyNames
	                // returns [ "prototype", "length", "name" ] in Firefox; it returns
	                // "caller" and "arguments" too in Chrome and in Internet
	                // Explorer, so those values must be filtered.
	                var avoid = (func(inArray).join(" ") + " ").replace(/prototype |length |name /g, "").slice(0, -1).split(" ");
	                if (avoid.length) func = function(object) {
	                    var props = O.getOwnPropertyNames(object);
	                    if (typeof object === "function")
	                        for (var i = 0, j; i < avoid.length;)
	                            if ((j = inArray(props, avoid[i++])) > -1)
	                                props.splice(j, 1);

	                    return props;
	                };
	            }
	            return func;
	        })() : function(object) {
	            // Poor-mouth version with for...in (IE8-)
	            var props = [], prop, hop;
	            if ("hasOwnProperty" in object) {
	                for (prop in object)
	                    if (object.hasOwnProperty(prop))
	                        props.push(prop);
	            } else {
	                hop = O.hasOwnProperty;
	                for (prop in object)
	                    if (hop.call(object, prop))
	                        props.push(prop);
	            }

	            // Inserting a common non-enumerable property of arrays
	            if (isArray(object))
	                props.push("length");

	            return props;
	        },

	        /**
	         * Return the prototype of the object... if defined.
	         * @function getPrototype
	         * @param {Object} object
	         * @returns {Object}
	         */
	        getPrototype = O.getPrototypeOf,

	        /**
	         * Return the descriptor of the object... if defined.
	         * IE8 supports a (useless) Object.getOwnPropertyDescriptor for DOM
	         * nodes only, so defineProperties is checked instead.
	         * @function getDescriptor
	         * @param {Object} object
	         * @param {String} property
	         * @returns {Descriptor}
	         */
	        getDescriptor = O.defineProperties && O.getOwnPropertyDescriptor,

	        /**
	         * Sets up the next check and delivering iteration, using
	         * requestAnimationFrame or a (close) polyfill.
	         * @function nextFrame
	         * @param {function} func
	         * @returns {number}
	         */
	        nextFrame = root.requestAnimationFrame || root.webkitRequestAnimationFrame || (function() {
	            var initial = +new Date,
	                last = initial;
	            return function(func) {
	                return setTimeout(function() {
	                    func((last = +new Date) - initial);
	                }, 17);
	            };
	        })(),

	        /**
	         * Sets up the observation of an object
	         * @function doObserve
	         * @param {Object} object
	         * @param {Handler} handler
	         * @param {String[]} [acceptList]
	         */
	        doObserve = function(object, handler, acceptList) {
	            var data = observed.get(object);

	            if (data) {
	                performPropertyChecks(data, object);
	                setHandler(object, data, handler, acceptList);
	            } else {
	                data = createObjectData(object);
	                setHandler(object, data, handler, acceptList);

	                if (observed.size === 1)
	                    // Let the observation begin!
	                    nextFrame(runGlobalLoop);
	            }
	        },

	        /**
	         * Creates the initial data for an observed object
	         * @function createObjectData
	         * @param {Object} object
	         */
	        createObjectData = function(object, data) {
	            var props = getProps(object),
	                values = [], descs, i = 0,
	                data = {
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
	            } else while (i < props.length)
	                values[i] = object[props[i++]];

	            observed.set(object, data);

	            return data;
	        },

	        /**
	         * Performs basic property value change checks on an observed object
	         * @function performPropertyChecks
	         * @param {ObjectData} data
	         * @param {Object} object
	         * @param {String} [except]  Doesn't deliver the changes to the
	         *                           handlers that accept this type
	         */
	        performPropertyChecks = (function() {
	            var updateCheck = getDescriptor ? function(object, data, idx, except, descr) {
	                var key = data.properties[idx],
	                    value = object[key],
	                    ovalue = data.values[idx],
	                    odesc = data.descriptors[idx];

	                if ("value" in descr && (ovalue === value
	                        ? ovalue === 0 && 1/ovalue !== 1/value
	                        : ovalue === ovalue || value === value)) {
	                    addChangeRecord(object, data, {
	                        name: key,
	                        type: "update",
	                        object: object,
	                        oldValue: ovalue
	                    }, except);
	                    data.values[idx] = value;
	                }
	                if (odesc.configurable && (!descr.configurable
	                        || descr.writable !== odesc.writable
	                        || descr.enumerable !== odesc.enumerable
	                        || descr.get !== odesc.get
	                        || descr.set !== odesc.set)) {
	                    addChangeRecord(object, data, {
	                        name: key,
	                        type: "reconfigure",
	                        object: object,
	                        oldValue: ovalue
	                    }, except);
	                    data.descriptors[idx] = descr;
	                }
	            } : function(object, data, idx, except) {
	                var key = data.properties[idx],
	                    value = object[key],
	                    ovalue = data.values[idx];

	                if (ovalue === value ? ovalue === 0 && 1/ovalue !== 1/value
	                        : ovalue === ovalue || value === value) {
	                    addChangeRecord(object, data, {
	                        name: key,
	                        type: "update",
	                        object: object,
	                        oldValue: ovalue
	                    }, except);
	                    data.values[idx] = value;
	                }
	            };

	            // Checks if some property has been deleted
	            var deletionCheck = getDescriptor ? function(object, props, proplen, data, except) {
	                var i = props.length, descr;
	                while (proplen && i--) {
	                    if (props[i] !== null) {
	                        descr = getDescriptor(object, props[i]);
	                        proplen--;

	                        // If there's no descriptor, the property has really
	                        // been deleted; otherwise, it's been reconfigured so
	                        // that's not enumerable anymore
	                        if (descr) updateCheck(object, data, i, except, descr);
	                        else {
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
	                while (proplen && i--)
	                    if (props[i] !== null) {
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

	                var props, proplen, keys,
	                    values = data.values,
	                    descs = data.descriptors,
	                    i = 0, idx,
	                    key, value,
	                    proto, descr;

	                // If the object isn't extensible, we don't need to check for new
	                // or deleted properties
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

	                    // If the object is not extensible, but not frozen, we just have
	                    // to check for value changes
	                    for (; i < props.length; i++) {
	                        key = props[i];
	                        updateCheck(object, data, i, except, getDescriptor(object, key));
	                    }

	                    if (O.isFrozen(object))
	                        data.frozen = true;
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
	        })(),

	        /**
	         * Sets up the main loop for object observation and change notification
	         * It stops if no object is observed.
	         * @function runGlobalLoop
	         */
	        runGlobalLoop = function() {
	            if (observed.size) {
	                observed.forEach(performPropertyChecks);
	                handlers.forEach(deliverHandlerRecords);
	                nextFrame(runGlobalLoop);
	            }
	        },

	        /**
	         * Deliver the change records relative to a certain handler, and resets
	         * the record list.
	         * @param {HandlerData} hdata
	         * @param {Handler} handler
	         */
	        deliverHandlerRecords = function(hdata, handler) {
	            var records = hdata.changeRecords;
	            if (records.length) {
	                hdata.changeRecords = [];
	                handler(records);
	            }
	        },

	        /**
	         * Returns the notifier for an object - whether it's observed or not
	         * @function retrieveNotifier
	         * @param {Object} object
	         * @param {ObjectData} [data]
	         * @returns {Notifier}
	         */
	        retrieveNotifier = function(object, data) {
	            if (arguments.length < 2)
	                data = observed.get(object);

	            /** @type {Notifier} */
	            return data && data.notifier || {
	                /**
	                 * @method notify
	                 * @see http://arv.github.io/ecmascript-object-observe/#notifierprototype._notify
	                 * @memberof Notifier
	                 * @param {ChangeRecord} changeRecord
	                 */
	                notify: function(changeRecord) {
	                    changeRecord.type; // Just to check the property is there...

	                    // If there's no data, the object has been unobserved
	                    var data = observed.get(object);
	                    if (data) {
	                        var recordCopy = { object: object }, prop;
	                        for (prop in changeRecord)
	                            if (prop !== "object")
	                                recordCopy[prop] = changeRecord[prop];
	                        addChangeRecord(object, data, recordCopy);
	                    }
	                },

	                /**
	                 * @method performChange
	                 * @see http://arv.github.io/ecmascript-object-observe/#notifierprototype_.performchange
	                 * @memberof Notifier
	                 * @param {String} changeType
	                 * @param {Performer} func     The task performer
	                 * @param {*} [thisObj]        Used to set `this` when calling func
	                 */
	                performChange: function(changeType, func/*, thisObj*/) {
	                    if (typeof changeType !== "string")
	                        throw new TypeError("Invalid non-string changeType");

	                    if (typeof func !== "function")
	                        throw new TypeError("Cannot perform non-function");

	                    // If there's no data, the object has been unobserved
	                    var data = observed.get(object),
	                        prop, changeRecord,
	                        thisObj = arguments[2],
	                        result = thisObj === _undefined ? func() : func.call(thisObj);

	                    data && performPropertyChecks(data, object, changeType);

	                    // If there's no data, the object has been unobserved
	                    if (data && result && typeof result === "object") {
	                        changeRecord = { object: object, type: changeType };
	                        for (prop in result)
	                            if (prop !== "object" && prop !== "type")
	                                changeRecord[prop] = result[prop];
	                        addChangeRecord(object, data, changeRecord);
	                    }
	                }
	            };
	        },

	        /**
	         * Register (or redefines) an handler in the collection for a given
	         * object and a given type accept list.
	         * @function setHandler
	         * @param {Object} object
	         * @param {ObjectData} data
	         * @param {Handler} handler
	         * @param {String[]} acceptList
	         */
	        setHandler = function(object, data, handler, acceptList) {
	            var hdata = handlers.get(handler);
	            if (!hdata)
	                handlers.set(handler, hdata = {
	                    observed: createMap(),
	                    changeRecords: []
	                });
	            hdata.observed.set(object, {
	                acceptList: acceptList.slice(),
	                data: data
	            });
	            data.handlers.set(handler, hdata);
	        },

	        /**
	         * Adds a change record in a given ObjectData
	         * @function addChangeRecord
	         * @param {Object} object
	         * @param {ObjectData} data
	         * @param {ChangeRecord} changeRecord
	         * @param {String} [except]
	         */
	        addChangeRecord = function(object, data, changeRecord, except) {
	            data.handlers.forEach(function(hdata) {
	                var acceptList = hdata.observed.get(object).acceptList;
	                // If except is defined, Notifier.performChange has been
	                // called, with except as the type.
	                // All the handlers that accepts that type are skipped.
	                if ((typeof except !== "string"
	                        || inArray(acceptList, except) === -1)
	                        && inArray(acceptList, changeRecord.type) > -1)
	                    hdata.changeRecords.push(changeRecord);
	            });
	        };

	    observed = createMap();
	    handlers = createMap();

	    /**
	     * @function Object.observe
	     * @see http://arv.github.io/ecmascript-object-observe/#Object.observe
	     * @param {Object} object
	     * @param {Handler} handler
	     * @param {String[]} [acceptList]
	     * @throws {TypeError}
	     * @returns {Object}               The observed object
	     */
	    O.observe = function observe(object, handler, acceptList) {
	        if (!object || typeof object !== "object" && typeof object !== "function")
	            throw new TypeError("Object.observe cannot observe non-object");

	        if (typeof handler !== "function")
	            throw new TypeError("Object.observe cannot deliver to non-function");

	        if (O.isFrozen && O.isFrozen(handler))
	            throw new TypeError("Object.observe cannot deliver to a frozen function object");

	        if (acceptList === _undefined)
	            acceptList = defaultAcceptList;
	        else if (!acceptList || typeof acceptList !== "object")
	            throw new TypeError("Third argument to Object.observe must be an array of strings.");

	        doObserve(object, handler, acceptList);

	        return object;
	    };

	    /**
	     * @function Object.unobserve
	     * @see http://arv.github.io/ecmascript-object-observe/#Object.unobserve
	     * @param {Object} object
	     * @param {Handler} handler
	     * @throws {TypeError}
	     * @returns {Object}         The given object
	     */
	    O.unobserve = function unobserve(object, handler) {
	        if (object === null || typeof object !== "object" && typeof object !== "function")
	            throw new TypeError("Object.unobserve cannot unobserve non-object");

	        if (typeof handler !== "function")
	            throw new TypeError("Object.unobserve cannot deliver to non-function");

	        var hdata = handlers.get(handler), odata;

	        if (hdata && (odata = hdata.observed.get(object))) {
	            hdata.observed.forEach(function(odata, object) {
	                performPropertyChecks(odata.data, object);
	            });
	            nextFrame(function() {
	                deliverHandlerRecords(hdata, handler);
	            });

	            // In Firefox 13-18, size is a function, but createMap should fall
	            // back to the shim for those versions
	            if (hdata.observed.size === 1 && hdata.observed.has(object))
	                handlers["delete"](handler);
	            else hdata.observed["delete"](object);

	            if (odata.data.handlers.size === 1)
	                observed["delete"](object);
	            else odata.data.handlers["delete"](handler);
	        }

	        return object;
	    };

	    /**
	     * @function Object.getNotifier
	     * @see http://arv.github.io/ecmascript-object-observe/#GetNotifier
	     * @param {Object} object
	     * @throws {TypeError}
	     * @returns {Notifier}
	     */
	    O.getNotifier = function getNotifier(object) {
	        if (object === null || typeof object !== "object" && typeof object !== "function")
	            throw new TypeError("Object.getNotifier cannot getNotifier non-object");

	        if (O.isFrozen && O.isFrozen(object)) return null;

	        return retrieveNotifier(object);
	    };

	    /**
	     * @function Object.deliverChangeRecords
	     * @see http://arv.github.io/ecmascript-object-observe/#Object.deliverChangeRecords
	     * @see http://arv.github.io/ecmascript-object-observe/#DeliverChangeRecords
	     * @param {Handler} handler
	     * @throws {TypeError}
	     */
	    O.deliverChangeRecords = function deliverChangeRecords(handler) {
	        if (typeof handler !== "function")
	            throw new TypeError("Object.deliverChangeRecords cannot deliver to non-function");

	        var hdata = handlers.get(handler);
	        if (hdata) {
	            hdata.observed.forEach(function(odata, object) {
	                performPropertyChecks(odata.data, object);
	            });
	            deliverHandlerRecords(hdata, handler);
	        }
	    };

	})(Object, Array, this);


/***/ }

/******/ });