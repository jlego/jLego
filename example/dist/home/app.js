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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HomeRouter = function () {
	    function HomeRouter() {
	        _classCallCheck(this, HomeRouter);

	        return {
	            '/home': [this.list, this.home],
	            '/home/list': this.list,
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
	            // new homeView({ id: 20 });
	        }
	    }, {
	        key: 'list',
	        value: function list() {
	            console.warn('dddddddddddddd');
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

/***/ }
/******/ ]);