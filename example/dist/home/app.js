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

	var _home = __webpack_require__(1);

	var _home2 = _interopRequireDefault(_home);

	var _list = __webpack_require__(2);

	var _list2 = _interopRequireDefault(_list);

	var _list3 = __webpack_require__(3);

	var _list4 = _interopRequireDefault(_list3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	HBY.router = {
	    '/home': function home() {
	        HBY.create({
	            view: _list2.default,
	            dataSource: {
	                api: ['test', 'ok'],
	                server: _list4.default
	            },
	            onAfter: function onAfter(self) {
	                var i = 0;
	                setInterval(function () {
	                    self.data.list[0].last = i;
	                    self.refresh();
	                    i++;
	                }, 3000);
	            }
	        });
	        // setTimeout(function(){
	        //     theView.data.list[0].last = '4444444';
	        //     theView.data._version = HBY.randomKey();
	        //     console.warn(theView.data.list[0].last);
	        // }, 3000);
	    },
	    '/home/list': function homeList() {
	        HBY.create({
	            view: _list2.default,
	            data: {
	                list: [{ first: 'home', last: 'Bond' }, { first: 'test', last: 'bbbb' }]
	            },
	            components: [{
	                el: '#home',
	                view: _home2.default,
	                data: [{ first: 'home2', last: 'Bond2' }, { first: 'test2', last: 'bbbb2' }]
	            }, {
	                el: '#test',
	                view: _home2.default,
	                data: [{ first: 'home3', last: 'Bond3' }, { first: 'test3', last: 'bbbb3' }]
	            }]
	        });
	    },
	    '/home/detail/:id': function homeDetailId(id) {
	        console.warn('pppppppppp');
	    }
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var HomeView = function (_HBY$View) {
	    _inherits(HomeView, _HBY$View);

	    function HomeView() {
	        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, HomeView);

	        var options = {
	            // el: 'div#uuu88',
	            events: {
	                'click #400': 'theClick'
	            }
	        };
	        HBY.$.extend(true, options, opts);
	        return _possibleConstructorReturn(this, (HomeView.__proto__ || Object.getPrototypeOf(HomeView)).call(this, options));
	    }

	    _createClass(HomeView, [{
	        key: 'render',
	        value: function render() {
	            var data = this.options.data || [],
	                that = this,
	                vDom = [];

	            data.forEach(function (model, i) {
	                vDom.push(h('a#' + model.first + i, {
	                    href: '#/home',
	                    style: {
	                        display: 'block'
	                    }
	                }, [model.last]));
	            });
	            return vDom;
	        }
	    }, {
	        key: 'theClick',
	        value: function theClick(event) {
	            event.stopPropagation();
	            HBY.trigger('data_update', { aa: 1 });
	        }
	    }]);

	    return HomeView;
	}(HBY.View);

	exports.default = HomeView;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ListView = function (_HBY$View) {
	    _inherits(ListView, _HBY$View);

	    function ListView() {
	        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, ListView);

	        var options = {
	            events: {
	                'click #test': 'theClick'
	            },
	            listen: {
	                'data_update': function data_update(data) {
	                    debug.warn('pppppppppp', data);
	                }
	            }
	        };
	        HBY.$.extend(true, options, opts);
	        return _possibleConstructorReturn(this, (ListView.__proto__ || Object.getPrototypeOf(ListView)).call(this, options));
	    }

	    _createClass(ListView, [{
	        key: 'render',
	        value: function render() {
	            var data = this.data.list || [],
	                vDom = [];

	            debug.warn('更新了视图', data);
	            data.forEach(function (model, i) {
	                vDom.push(h('a#' + model.first, {
	                    href: '#/home/list',
	                    style: {
	                        display: 'block'
	                    }
	                }, [model.last]));
	            });
	            return vDom;
	        }
	    }, {
	        key: 'theClick',
	        value: function theClick(event) {
	            debug.warn('66666666666');
	        }
	    }]);

	    return ListView;
	}(HBY.View);

	exports.default = ListView;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ListData = function (_HBY$Data) {
	    _inherits(ListData, _HBY$Data);

	    function ListData() {
	        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, ListData);

	        var options = {
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
	        HBY.$.extend(true, options, opts);
	        return _possibleConstructorReturn(this, (ListData.__proto__ || Object.getPrototypeOf(ListData)).call(this, options));
	    }

	    _createClass(ListData, [{
	        key: 'parse',
	        value: function parse(datas) {
	            console.warn(datas);
	            return datas[0].data;
	        }
	    }]);

	    return ListData;
	}(HBY.Data);

	exports.default = new ListData();

/***/ }
/******/ ]);