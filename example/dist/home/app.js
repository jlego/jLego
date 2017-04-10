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
    return __webpack_require__(__webpack_require__.s = 26);
})({
    18: function(module, exports, __webpack_require__) {
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
                    test: {
                        url: "./content.json",
                        listTarget: "data",
                        model: {
                            first: "",
                            last: "",
                            id: 0
                        }
                    },
                    ok: {
                        url: "./content.json"
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
    19: function(module, exports, __webpack_require__) {
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
        var _templateObject = _taggedTemplateLiteral([ "\n        <div>\n          ", "\n        </div>" ], [ "\n        <div>\n          ", "\n        </div>" ]), _templateObject2 = _taggedTemplateLiteral([ '<a href="#/home" style="display:block;">', "</a>\n" ], [ '<a href="#/home" style="display:block;">', "</a>\\n" ]);
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
                    var data = this.options.data || [];
                    console.warn("uuuuuuuuuuuuu", data);
                    var vDom = hx(_templateObject, data.map(function(model, i) {
                        return hx(_templateObject2, model.first);
                    }));
                    return vDom;
                }
            }, {
                key: "theClick",
                value: function theClick(event) {
                    event.stopPropagation();
                }
            } ]);
            return HomeView;
        }(Lego.View);
        Lego.components("home", HomeView);
        exports.default = HomeView;
    },
    20: function(module, exports, __webpack_require__) {
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
        var _templateObject = _taggedTemplateLiteral([ '\n        <div class="page-container" id="page-container">\n          <h1>hello world!</h1>\n          ', '\n          <home id="test"></home>\n        </div>' ], [ '\n        <div class="page-container" id="page-container">\n          <h1>hello world!</h1>\n          ', '\n          <home id="test"></home>\n        </div>' ]), _templateObject2 = _taggedTemplateLiteral([ '<a href="javascript:;" style="display:block;">', "</a>\n" ], [ '<a href="javascript:;" style="display:block;">', "</a>\\n" ]);
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
                    events: {
                        "click a": "theClick"
                    },
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
                    var data = this.options.data || [];
                    debug.warn("更新了视图", data);
                    var vDom = hx(_templateObject, data.map(function(model, i) {
                        return hx(_templateObject2, model.last);
                    }));
                    return vDom;
                }
            }, {
                key: "theClick",
                value: function theClick(event) {
                    event.stopPropagation();
                    debug.warn("66666666666");
                }
            } ]);
            return ListView;
        }(Lego.View);
        Lego.components("list", ListView);
        exports.default = ListView;
    },
    26: function(module, exports, __webpack_require__) {
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
        var _home = __webpack_require__(19);
        var _home2 = _interopRequireDefault(_home);
        var _list = __webpack_require__(20);
        var _list2 = _interopRequireDefault(_list);
        var _list3 = __webpack_require__(18);
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
                    "/home": this.index,
                    "/home/list": this.tabs
                };
            }
            _createClass(Router, [ {
                key: "index",
                value: function index() {
                    console.warn("ppppppppppppppppp");
                    Lego.create(_list2.default, {
                        el: Lego.config.pageEl,
                        dataSource: {
                            api: [ "test", "ok" ],
                            server: _list4.default
                        },
                        onAfter: function onAfter(self) {
                            var i = 0;
                            Lego.setTimer("theTime", setInterval(function() {
                                self.options.data[0].last = i;
                                self.refresh();
                                i++;
                            }, 3e3));
                        },
                        components: [ {
                            el: "#test",
                            dataSource: {
                                api: [ "ok" ],
                                server: _list4.default
                            }
                        } ]
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
                                last: "Bond"
                            }, {
                                first: "test",
                                last: "bbbb"
                            } ]
                        },
                        components: [ {
                            el: "#home",
                            data: [ {
                                first: "home2",
                                last: "Bond2"
                            }, {
                                first: "test2",
                                last: "bbbb2"
                            } ]
                        }, {
                            el: "#test",
                            data: [ {
                                first: "home3",
                                last: "Bond3"
                            }, {
                                first: "test3",
                                last: "bbbb3"
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