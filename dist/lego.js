/**
 * lego.js v0.0.6
 * (c) 2016 Evan You
 * @license MIT
 */
"use strict";

function _interopDefault(ex) {
    return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
}

var EventClass = _interopDefault(require("events"));

var Lego = function Lego(name) {
    this.name = name;
};

Lego.prototype.sayhi = function sayhi(id) {
    var tmpl = function(addrs) {
        return "\n          <table>\n          " + addrs.map(function(addr) {
            return '\n            <tr><td><a href="#/home/read/3">' + addr.first + '</a></td></tr>\n            <tr><td><a href="#/test/2">' + addr.last + "_" + id + "</a></td></tr>\n          ";
        }).join("") + "\n          </table>\n        ";
    };
    var data = [ {
        first: "home1",
        last: "Bond"
    }, {
        first: "test",
        last: "bbbb"
    } ];
    var anyObject = new EventClass();
    anyObject.on("change", function(data) {
        console.log("change event :", data);
    });
    anyObject.emit("change", "Hello 3778 !");
    return tmpl(data);
};

module.exports = Lego;
