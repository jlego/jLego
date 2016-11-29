/**
 * lego.js v0.0.5
 * (c) 2016 Evan You
 * @license MIT
 */
"use strict";

var EventClass = function EventClass() {
    this.width = 10;
};

EventClass.prototype.ok = function ok() {
    return this.width;
};

var Lego = function Lego(name) {
    this.name = name;
};

Lego.prototype.sayhi = function sayhi() {
    var tmpl = function(addrs) {
        return "\n          <table>\n          " + addrs.map(function(addr) {
            return "\n            <tr><td>" + addr.first + "</td></tr>\n            <tr><td>" + addr.last + "</td></tr>\n          ";
        }).join("") + "\n          </table>\n        ";
    };
    var data = [ {
        first: "aaaa",
        last: "Bond"
    }, {
        first: "Lars",
        last: "bbbb"
    } ];
    var anyObject = new EventClass();
    console.warn(anyObject.ok());
    return tmpl(data);
};

module.exports = Lego;
