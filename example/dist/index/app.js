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
    return __webpack_require__(__webpack_require__.s = 27);
})({
    21: function(module, exports, __webpack_require__) {
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
        var _templateObject = _taggedTemplateLiteral([ '\n        <div id="app" class="app-navbar-fixed app-sidebar-fixed">\n            <menu id="sidebar"></menu>\n            <div class="app-content">\n                <header class="navbar navbar-default navbar-static-top">\n                    <div class="navbar-header">\n                        <a class="navbar-brand" href="#">\n                            <img src="asset/img/logo.png" alt="" />\n                        </a>\n                    </div>\n                    <div class="navbar-collapse collapse">\n                        <ul class="nav navbar-right">\n                            <li class="dropdown">\n                                <a href="#" class="dropdown-toggle"><i class="glyphicon glyphicon-qrcode"></i> 邀请码 </a>\n                                <ul class="dropdown-menu">\n                                    <li style="text-align:center;"><div id="inviteCodeImg" style="margin:10px;"></div></li>\n                                    <li style="display:none;"><a href="javascript:;" style="text-align:center;" id="copyLink">复制链接</a></li>\n                                </ul>\n                            </li>\n                            <li class="dropdown">\n                                <a href="#" class="dropdown-toggle"><i class="hby-staff"></i>\n                                <span class="caret"></span></a>\n                                <ul class="dropdown-menu">\n                                    <li><a href="javascript:;" id="modifyPassword"><i class="glyphicon glyphicon-lock"></i> 修改密码</a></li>\n                                    <li><a href="/j_acegi_logout"><i class="glyphicon glyphicon-off"></i> 退出登录</a></li>\n                                </ul>\n                            </li>\n                        </ul>\n                        <div class="search-form" style="display:none;">\n                            <a class="s-open" href="#">\n                                <i class="ti-search"></i>\n                            </a>\n                            <form class="navbar-form" role="search">\n                                <a class="s-remove" href="#" target=".navbar-form">\n                                    <i class="ti-close"></i>\n                                </a>\n                                <div class="form-group">\n                                    <input type="text" class="form-control" placeholder="搜索">\n                                    <button class="btn search-button" type="submit">\n                                        <i class="ti-search"></i>\n                                    </button>\n                                </div>\n                            </form>\n                        </div>\n                    </div>\n                </header>\n                <div class="main-content">\n                    <div class="wrap-content container-fluid" id="container">\n                        <div id="page-container"></div>\n                    </div>\n                </div>\n            </div>\n            <footer>\n                <div class="footer-inner">\n                    <div class="pull-left">\n                        &copy; <span class="current-year"></span><span class="text-bold text-uppercase">Lego</span>. <span>All rights reserved</span>\n                    </div>\n                    <div class="pull-right">\n                        <span class="go-top"><i class="ti-angle-up"></i></span>\n                    </div>\n                </div>\n            </footer>\n        </div>\n        ' ], [ '\n        <div id="app" class="app-navbar-fixed app-sidebar-fixed">\n            <menu id="sidebar"></menu>\n            <div class="app-content">\n                <header class="navbar navbar-default navbar-static-top">\n                    <div class="navbar-header">\n                        <a class="navbar-brand" href="#">\n                            <img src="asset/img/logo.png" alt="" />\n                        </a>\n                    </div>\n                    <div class="navbar-collapse collapse">\n                        <ul class="nav navbar-right">\n                            <li class="dropdown">\n                                <a href="#" class="dropdown-toggle"><i class="glyphicon glyphicon-qrcode"></i> 邀请码 </a>\n                                <ul class="dropdown-menu">\n                                    <li style="text-align:center;"><div id="inviteCodeImg" style="margin:10px;"></div></li>\n                                    <li style="display:none;"><a href="javascript:;" style="text-align:center;" id="copyLink">复制链接</a></li>\n                                </ul>\n                            </li>\n                            <li class="dropdown">\n                                <a href="#" class="dropdown-toggle"><i class="hby-staff"></i>\n                                <span class="caret"></span></a>\n                                <ul class="dropdown-menu">\n                                    <li><a href="javascript:;" id="modifyPassword"><i class="glyphicon glyphicon-lock"></i> 修改密码</a></li>\n                                    <li><a href="/j_acegi_logout"><i class="glyphicon glyphicon-off"></i> 退出登录</a></li>\n                                </ul>\n                            </li>\n                        </ul>\n                        <div class="search-form" style="display:none;">\n                            <a class="s-open" href="#">\n                                <i class="ti-search"></i>\n                            </a>\n                            <form class="navbar-form" role="search">\n                                <a class="s-remove" href="#" target=".navbar-form">\n                                    <i class="ti-close"></i>\n                                </a>\n                                <div class="form-group">\n                                    <input type="text" class="form-control" placeholder="搜索">\n                                    <button class="btn search-button" type="submit">\n                                        <i class="ti-search"></i>\n                                    </button>\n                                </div>\n                            </form>\n                        </div>\n                    </div>\n                </header>\n                <div class="main-content">\n                    <div class="wrap-content container-fluid" id="container">\n                        <div id="page-container"></div>\n                    </div>\n                </div>\n            </div>\n            <footer>\n                <div class="footer-inner">\n                    <div class="pull-left">\n                        &copy; <span class="current-year"></span><span class="text-bold text-uppercase">Lego</span>. <span>All rights reserved</span>\n                    </div>\n                    <div class="pull-right">\n                        <span class="go-top"><i class="ti-angle-up"></i></span>\n                    </div>\n                </div>\n            </footer>\n        </div>\n        ' ]);
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
        var MainView = function(_Lego$View) {
            _inherits(MainView, _Lego$View);
            function MainView() {
                var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                _classCallCheck(this, MainView);
                var options = {
                    events: {}
                };
                Object.assign(options, opts);
                return _possibleConstructorReturn(this, (MainView.__proto__ || Object.getPrototypeOf(MainView)).call(this, options));
            }
            _createClass(MainView, [ {
                key: "render",
                value: function render() {
                    var tmpl = hx(_templateObject);
                    return tmpl;
                }
            }, {
                key: "clickNav",
                value: function clickNav(event) {
                    var target = Lego.$(event.currentTarget), app = target.data("app");
                    Lego.startApp(app);
                }
            } ]);
            return MainView;
        }(Lego.View);
        exports.default = MainView;
    },
    22: function(module, exports, __webpack_require__) {
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
        var _templateObject = _taggedTemplateLiteral([ '\n        <div class="sidebar app-aside" id="sidebar">\n        <div class="sidebar-container perfect-scrollbar ps-container ps-active-y">\n            <nav>\n                <ul class="main-navigation-menu">\n                    <li data-permis=\'{"module":"Home", "operate":"Query", "hide":1}\' id="nav_home">\n                        <a href="javascript:Lego.startApp(\'home\');">\n                            <div class="item-content">\n                                <div class="item-media">\n                                    <i class="hby-home"></i>\n                                </div>\n                                <div class="item-inner">\n                                    <span class="title"> 首页 </span>\n                                </div>\n                            </div>\n                        </a>\n                    </li>\n                    <li data-permis=\'{"module":"Register", "operate":"Query", "hide":1}\' id="nav_register">\n                        <a href="javascript:Lego.startApp(\'test\');">\n                            <div class="item-content">\n                                <div class="item-media">\n                                    <i class="glyphicon glyphicon-list-alt"></i>\n                                </div>\n                                <div class="item-inner">\n                                    <span class="title"> 注册管理 </span>\n                                </div>\n                            </div>\n                        </a>\n                    </li>\n                    <li data-permis=\'{"module":"Customer", "operate":"Query", "hide":1}\' id="nav_customer">\n                        <a href="javascript:Lego.startApp(\'test\');">\n                            <div class="item-content">\n                                <div class="item-media">\n                                    <i class="hby-customer"></i>\n                                </div>\n                                <div class="item-inner">\n                                    <span class="title"> 客户管理 </span>\n                                </div>\n                            </div>\n                        </a>\n                    </li>\n                    <li data-permis=\'{"module":"Order", "operate":"Query", "hide":1}\' id="nav_order">\n                        <a href="javascript:Lego.startApp(\'test\');">\n                            <div class="item-content">\n                                <div class="item-media">\n                                    <i class="hby-order"></i>\n                                </div>\n                                <div class="item-inner">\n                                    <span class="title"> 订单管理 </span>\n                                </div>\n                            </div>\n                        </a>\n                    </li>\n                    <li data-permis=\'{"module":"Channel", "operate":"Query", "hide":1}\' id="nav_channel">\n                        <a href="javascript:Lego.startApp(\'test\');">\n                            <div class="item-content">\n                                <div class="item-media">\n                                    <i class="hby-channel"></i>\n                                </div>\n                                <div class="item-inner">\n                                    <span class="title"> 渠道管理 </span>\n                                </div>\n                            </div>\n                        </a>\n                    </li>\n                    <li data-permis=\'{"module":"Finance", "operate":"Query", "hide":1}\' id="nav_finance">\n                        <a href="javascript:Lego.startApp(\'test\');">\n                            <div class="item-content">\n                                <div class="item-media">\n                                    <i class="hby-finance"></i>\n                                </div>\n                                <div class="item-inner">\n                                    <span class="title"> 财务管理 </span>\n                                </div>\n                            </div>\n                        </a>\n                    </li>\n                    <li data-permis=\'{"module":"Consumption", "operate":"Query", "hide":1}\' id="nav_expenses">\n                        <a href="javascript:Lego.startApp(\'test\');">\n                            <div class="item-content">\n                                <div class="item-media">\n                                    <i class="glyphicon glyphicon-usd"></i>\n                                </div>\n                                <div class="item-inner">\n                                    <span class="title"> 消费记录 </span>\n                                </div>\n                            </div>\n                        </a>\n                    </li>\n                    <li data-permis=\'{"module":"Product", "operate":"Query", "hide":1}\' id="nav_product">\n                        <a href="javascript:Lego.startApp(\'test\');">\n                            <div class="item-content">\n                                <div class="item-media">\n                                    <i class="hby-product"></i>\n                                </div>\n                                <div class="item-inner">\n                                    <span class="title"> 产品管理 </span>\n                                </div>\n                            </div>\n                        </a>\n                    </li>\n                    <li data-permis=\'{"module":"Operation", "operate":"Query", "hide":1}\' id="nav_operation">\n                        <a href="javascript:Lego.startApp(\'test\');">\n                            <div class="item-content">\n                                <div class="item-media">\n                                    <i class="glyphicon glyphicon-dashboard"></i>\n                                </div>\n                                <div class="item-inner">\n                                    <span class="title"> 运营管理 </span>\n                                </div>\n                            </div>\n                        </a>\n                    </li>\n                    <li data-permis=\'{"module":"Organization", "operate":"Query", "hide":1}\' id="nav_organization">\n                        <a href="javascript:Lego.startApp(\'test\');">\n                            <div class="item-content">\n                                <div class="item-media">\n                                    <i class="hby-admin"></i>\n                                </div>\n                                <div class="item-inner">\n                                    <span class="title"> 后台管理 </span>\n                                </div>\n                            </div>\n                        </a>\n                    </li>\n                </ul>\n            </nav>\n        </div>\n        </div>\n        ' ], [ '\n        <div class="sidebar app-aside" id="sidebar">\n        <div class="sidebar-container perfect-scrollbar ps-container ps-active-y">\n            <nav>\n                <ul class="main-navigation-menu">\n                    <li data-permis=\'{"module":"Home", "operate":"Query", "hide":1}\' id="nav_home">\n                        <a href="javascript:Lego.startApp(\'home\');">\n                            <div class="item-content">\n                                <div class="item-media">\n                                    <i class="hby-home"></i>\n                                </div>\n                                <div class="item-inner">\n                                    <span class="title"> 首页 </span>\n                                </div>\n                            </div>\n                        </a>\n                    </li>\n                    <li data-permis=\'{"module":"Register", "operate":"Query", "hide":1}\' id="nav_register">\n                        <a href="javascript:Lego.startApp(\'test\');">\n                            <div class="item-content">\n                                <div class="item-media">\n                                    <i class="glyphicon glyphicon-list-alt"></i>\n                                </div>\n                                <div class="item-inner">\n                                    <span class="title"> 注册管理 </span>\n                                </div>\n                            </div>\n                        </a>\n                    </li>\n                    <li data-permis=\'{"module":"Customer", "operate":"Query", "hide":1}\' id="nav_customer">\n                        <a href="javascript:Lego.startApp(\'test\');">\n                            <div class="item-content">\n                                <div class="item-media">\n                                    <i class="hby-customer"></i>\n                                </div>\n                                <div class="item-inner">\n                                    <span class="title"> 客户管理 </span>\n                                </div>\n                            </div>\n                        </a>\n                    </li>\n                    <li data-permis=\'{"module":"Order", "operate":"Query", "hide":1}\' id="nav_order">\n                        <a href="javascript:Lego.startApp(\'test\');">\n                            <div class="item-content">\n                                <div class="item-media">\n                                    <i class="hby-order"></i>\n                                </div>\n                                <div class="item-inner">\n                                    <span class="title"> 订单管理 </span>\n                                </div>\n                            </div>\n                        </a>\n                    </li>\n                    <li data-permis=\'{"module":"Channel", "operate":"Query", "hide":1}\' id="nav_channel">\n                        <a href="javascript:Lego.startApp(\'test\');">\n                            <div class="item-content">\n                                <div class="item-media">\n                                    <i class="hby-channel"></i>\n                                </div>\n                                <div class="item-inner">\n                                    <span class="title"> 渠道管理 </span>\n                                </div>\n                            </div>\n                        </a>\n                    </li>\n                    <li data-permis=\'{"module":"Finance", "operate":"Query", "hide":1}\' id="nav_finance">\n                        <a href="javascript:Lego.startApp(\'test\');">\n                            <div class="item-content">\n                                <div class="item-media">\n                                    <i class="hby-finance"></i>\n                                </div>\n                                <div class="item-inner">\n                                    <span class="title"> 财务管理 </span>\n                                </div>\n                            </div>\n                        </a>\n                    </li>\n                    <li data-permis=\'{"module":"Consumption", "operate":"Query", "hide":1}\' id="nav_expenses">\n                        <a href="javascript:Lego.startApp(\'test\');">\n                            <div class="item-content">\n                                <div class="item-media">\n                                    <i class="glyphicon glyphicon-usd"></i>\n                                </div>\n                                <div class="item-inner">\n                                    <span class="title"> 消费记录 </span>\n                                </div>\n                            </div>\n                        </a>\n                    </li>\n                    <li data-permis=\'{"module":"Product", "operate":"Query", "hide":1}\' id="nav_product">\n                        <a href="javascript:Lego.startApp(\'test\');">\n                            <div class="item-content">\n                                <div class="item-media">\n                                    <i class="hby-product"></i>\n                                </div>\n                                <div class="item-inner">\n                                    <span class="title"> 产品管理 </span>\n                                </div>\n                            </div>\n                        </a>\n                    </li>\n                    <li data-permis=\'{"module":"Operation", "operate":"Query", "hide":1}\' id="nav_operation">\n                        <a href="javascript:Lego.startApp(\'test\');">\n                            <div class="item-content">\n                                <div class="item-media">\n                                    <i class="glyphicon glyphicon-dashboard"></i>\n                                </div>\n                                <div class="item-inner">\n                                    <span class="title"> 运营管理 </span>\n                                </div>\n                            </div>\n                        </a>\n                    </li>\n                    <li data-permis=\'{"module":"Organization", "operate":"Query", "hide":1}\' id="nav_organization">\n                        <a href="javascript:Lego.startApp(\'test\');">\n                            <div class="item-content">\n                                <div class="item-media">\n                                    <i class="hby-admin"></i>\n                                </div>\n                                <div class="item-inner">\n                                    <span class="title"> 后台管理 </span>\n                                </div>\n                            </div>\n                        </a>\n                    </li>\n                </ul>\n            </nav>\n        </div>\n        </div>\n        ' ]);
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
        var MenuView = function(_Lego$View) {
            _inherits(MenuView, _Lego$View);
            function MenuView() {
                var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                _classCallCheck(this, MenuView);
                var options = {
                    events: {}
                };
                Object.assign(options, opts);
                return _possibleConstructorReturn(this, (MenuView.__proto__ || Object.getPrototypeOf(MenuView)).call(this, options));
            }
            _createClass(MenuView, [ {
                key: "render",
                value: function render() {
                    var tmpl = hx(_templateObject);
                    return tmpl;
                }
            } ]);
            return MenuView;
        }(Lego.View);
        Lego.components("menu", MenuView);
        exports.default = MenuView;
    },
    27: function(module, exports, __webpack_require__) {
        "use strict";
        var _main = __webpack_require__(21);
        var _main2 = _interopRequireDefault(_main);
        var _menu = __webpack_require__(22);
        var _menu2 = _interopRequireDefault(_menu);
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        Lego.create(_main2.default, {
            el: "body",
            components: [ {
                el: "#sidebar",
                scrollbar: true
            } ]
        });
        Lego.startApp();
    }
});