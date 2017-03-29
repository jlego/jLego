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
    return __webpack_require__(__webpack_require__.s = 29);
})({
    23: function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var ListData = function(_Lego$Data) {
            _inherits(ListData, _Lego$Data);
            function ListData() {
                var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                _classCallCheck(this, ListData);
                var options = {
                    gg: {
                        url: "./content2.json",
                        listTarget: "data",
                        model: {
                            first: "",
                            last: "",
                            id: 0
                        }
                    },
                    ff: {
                        url: "./content2.json"
                    }
                };
                Lego.extend(options, opts);
                return _possibleConstructorReturn(this, (ListData.__proto__ || Object.getPrototypeOf(ListData)).call(this, options));
            }
            _createClass(ListData, [ {
                key: "parse",
                value: function parse(datas) {
                    return datas[0].data;
                }
            } ]);
            return ListData;
        }(Lego.Data);
        exports.default = new ListData();
    },
    24: function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        var _templateObject = _taggedTemplateLiteral([ "\n        <div>\n          ", "\n        </div>" ], [ "\n        <div>\n          ", "\n        </div>" ]), _templateObject2 = _taggedTemplateLiteral([ '<a id="', '" href="javascript:;" onclick=', ' style="display:block;">', "</a>\n" ], [ '<a id="', '" href="javascript:;" onclick=', ' style="display:block;">', "</a>\\n" ]);
        function _taggedTemplateLiteral(strings, raw) {
            return Object.freeze(Object.defineProperties(strings, {
                raw: {
                    value: Object.freeze(raw)
                }
            }));
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var HomeView = function(_Lego$View) {
            _inherits(HomeView, _Lego$View);
            function HomeView() {
                var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                _classCallCheck(this, HomeView);
                var options = {
                    events: {
                        "click #400": "theClick"
                    }
                };
                Object.assign(options, opts);
                return _possibleConstructorReturn(this, (HomeView.__proto__ || Object.getPrototypeOf(HomeView)).call(this, options));
            }
            _createClass(HomeView, [ {
                key: "render",
                value: function render() {
                    var _this2 = this;
                    var data = this.options.data || [];
                    var vDom = hx(_templateObject, data.map(function(model, i) {
                        return hx(_templateObject2, model.first, _this2.theClick.bind(_this2), model.last);
                    }));
                    return vDom;
                }
            }, {
                key: "theClick",
                value: function theClick(event) {
                    event.stopPropagation();
                    Lego.Eventer.trigger("data_update", {
                        aa: 1
                    }, 66);
                }
            } ]);
            return HomeView;
        }(Lego.View);
        Lego.components("home2", HomeView);
        exports.default = HomeView;
    },
    25: function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        var _templateObject = _taggedTemplateLiteral([ '\n        <div class="page-container" id="page-container">\n          ', "\n        </div>" ], [ '\n        <div class="page-container" id="page-container">\n          ', "\n        </div>" ]), _templateObject2 = _taggedTemplateLiteral([ '<a id="', '" href="javascript:;" onclick=', ' style="display:block;">', "</a>\n" ], [ '<a id="', '" href="javascript:;" onclick=', ' style="display:block;">', "</a>\\n" ]);
        function _taggedTemplateLiteral(strings, raw) {
            return Object.freeze(Object.defineProperties(strings, {
                raw: {
                    value: Object.freeze(raw)
                }
            }));
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var ListView = function(_Lego$View) {
            _inherits(ListView, _Lego$View);
            function ListView() {
                var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                _classCallCheck(this, ListView);
                var options = {
                    listener: {
                        data_update: function data_update(data, data2) {
                            debug.warn("ttttttttttt", data, data2);
                        }
                    }
                };
                Object.assign(options, opts);
                return _possibleConstructorReturn(this, (ListView.__proto__ || Object.getPrototypeOf(ListView)).call(this, options));
            }
            _createClass(ListView, [ {
                key: "render",
                value: function render() {
                    var _this2 = this;
                    var data = this.options.data || [];
                    var vDom = hx(_templateObject, data.map(function(model, i) {
                        return hx(_templateObject2, model.first, _this2.theClick.bind(_this2), model.last);
                    }));
                    return vDom;
                }
            }, {
                key: "theClick",
                value: function theClick(event) {
                    debug.warn("66666666666");
                    Lego.Eventer.trigger("data_update", {
                        aa: 1
                    }, 66);
                }
            } ]);
            return ListView;
        }(Lego.View);
        Lego.components("list2", ListView);
        exports.default = ListView;
    },
    29: function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        var _home = __webpack_require__(24);
        var _home2 = _interopRequireDefault(_home);
        var _list = __webpack_require__(25);
        var _list2 = _interopRequireDefault(_list);
        var _list3 = __webpack_require__(23);
        var _list4 = _interopRequireDefault(_list3);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var Router = function() {
            function Router() {
                _classCallCheck(this, Router);
                return {
                    "/test": this.index,
                    "/test/list": this.tabs
                };
            }
            _createClass(Router, [ {
                key: "index",
                value: function index() {
                    console.warn("7777777777777");
                    Lego.create(_list2.default, {
                        el: Lego.config.pageEl,
                        dataSource: {
                            api: [ "gg", "ff" ],
                            server: _list4.default
                        }
                    });
                }
            }, {
                key: "tabs",
                value: function tabs() {
                    Lego.create(_list2.default, {
                        el: Lego.config.pageEl,
                        data: {
                            list: [ {
                                first: "home",
                                last: "99999"
                            }, {
                                first: "test",
                                last: "mmmmm"
                            } ]
                        },
                        components: [ {
                            el: "#home",
                            data: [ {
                                first: "home2",
                                last: "999992"
                            }, {
                                first: "test2",
                                last: "mmmmm2"
                            } ]
                        }, {
                            el: "#test",
                            data: [ {
                                first: "home3",
                                last: "999993"
                            }, {
                                first: "test3",
                                last: "mmmmm3"
                            } ]
                        } ]
                    });
                }
            } ]);
            return Router;
        }();
        Lego.router(new Router());
    }
});