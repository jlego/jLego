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

	var _mainView = __webpack_require__(5);

	var _mainView2 = _interopRequireDefault(_mainView);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MainRouter = function () {
	    function MainRouter() {
	        _classCallCheck(this, MainRouter);

	        this.index();
	    }

	    _createClass(MainRouter, [{
	        key: 'index',
	        value: function index() {
	            // dataList.api(['test', 'ok'], (resp) => {
	            //     let data = HBY.getData('test').data;
	            HBY.create({
	                el: 'body',
	                view: _mainView2.default
	            });
	            // });
	            HBY.startApp();
	        }
	    }]);

	    return MainRouter;
	}();

	HBY.router = new MainRouter();

/***/ },

/***/ 5:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// import BaseView from '../../../dist/view';
	// import BaseView from 'lego-core/dist/view';

	var MainView = function (_HBY$View) {
	    _inherits(MainView, _HBY$View);

	    function MainView() {
	        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, MainView);

	        var options = {
	            events: {
	                'click nav a': 'clickNav'
	            }
	        };
	        HBY.$.extend(true, options, opts);
	        return _possibleConstructorReturn(this, (MainView.__proto__ || Object.getPrototypeOf(MainView)).call(this, options));
	    }

	    _createClass(MainView, [{
	        key: 'render',
	        value: function render() {
	            // const data = this.options.data || [];
	            var tmpl = '\n        <nav>\n            <ul>\n                <li><a href="javascript:;" data-app="home">\u83DC\u5355\u4E00</a></li>\n                <li><a href="javascript:;" data-app="test/30">\u83DC\u5355\u4E8C</a></li>\n                <li><a href="javascript:;" data-app="home/list">\u83DC\u5355\u4E09</a></li>\n            </ul>\n        </nav>\n        <content id="content"></content>';
	            return tmpl;
	        }
	    }, {
	        key: 'clickNav',
	        value: function clickNav(event) {
	            var target = HBY.$(event.currentTarget),
	                app = target.data('app');
	            HBY.startApp(app);
	        }
	    }]);

	    return MainView;
	}(HBY.View);

	exports.default = MainView;

/***/ }

/******/ });