'use strict';

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
            Object.defineProperty(target, descriptor.key, descriptor); } }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor; }; }();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function"); } }

var Lego = function() {
    function Lego(name) {
        _classCallCheck(this, Lego);

        this.name = name;
    }

    _createClass(Lego, [{
        key: 'sayhi',
        value: function sayhi() {
            var tmpl = function tmpl(addrs) {
                return '\n          <table>\n          ' + addrs.map(function(addr) {
                    return '\n            <tr><td>' + addr.first + '</td></tr>\n            <tr><td>' + addr.last + '</td></tr>\n          ';
                }).join('') + '\n          </table>\n        ';
            };
            var data = [{ first: 'aaaa', last: 'Bond' }, { first: 'Lars', last: 'bbbb' }];
            return tmpl(data);
        }
    }]);

    return Lego;
}();

exports.default = Lego;
