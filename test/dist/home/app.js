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

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _homeView = __webpack_require__(1);

	var _homeView2 = _interopRequireDefault(_homeView);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HomeRouter = function () {
	    function HomeRouter(name) {
	        _classCallCheck(this, HomeRouter);

	        return {
	            '/home/:id': this.home,
	            '/home/read/:id': this.detail
	        };
	    }

	    _createClass(HomeRouter, [{
	        key: 'home',
	        value: function home(id) {
	            new _homeView2.default({ id: id });
	        }
	    }, {
	        key: 'detail',
	        value: function detail(id) {
	            // let leftNode = h("div.foo#dd", h('a', { href: '#/test/88' }, 'home'));

	            // let rootNode = createElement(leftNode);
	            // document.body.appendChild(rootNode);

	            // let patches = diff(leftNode, rightNode);
	            // patch(rootNode, patches);
	        }
	    }]);

	    return HomeRouter;
	}();

	exports.default = HomeRouter;

	HBY['app'] = new HomeRouter();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HomeView = function () {
	    function HomeView(option) {
	        _classCallCheck(this, HomeView);

	        this.id = option.id;
	        this.render();
	    }

	    _createClass(HomeView, [{
	        key: 'render',
	        value: function render() {
	            HBY.$(HBY.config.pageEl).html('ee<a href="#/test/read/3">bbbbbbbbb</a>eee' + this.id);
	        }
	    }]);

	    return HomeView;
	}();

	exports.default = HomeView;

/***/ }
/******/ ]);