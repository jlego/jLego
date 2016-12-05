/**
 * lego.js v0.0.6
 * (c) 2016 Evan You
 * @license MIT
 */
"use strict";

function _interopDefault(ex) {
    return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
}

var h = _interopDefault(require("virtual-dom/h"));

var virtualDom_diff = require("virtual-dom/diff");

var virtualDom_createElement = require("virtual-dom/create-element");

var virtualDom_patch = require("virtual-dom/patch");

var View = function View(option) {
    if (option === void 0) option = {};
    window.h = h;
    var defaults = {
        el: "",
        tagName: "",
        on: {},
        permis: {},
        animate: null,
        config: {},
        scrollbar: false,
        items: [],
        data: null
    };
    this.options = Object.assign(defaults, option);
};

View.prototype.render = function render() {
    return null;
};

module.exports = View;
