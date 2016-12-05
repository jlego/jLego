/**
 * lego.js v0.0.6
 * (c) 2016 Evan You
 * @license MIT
 */
"use strict";

var View = function View(options) {
    if (options === void 0) options = {};
    var defaults = {
        el: "",
        tagName: "",
        events: {},
        permis: {},
        animate: null,
        config: {},
        scrollbar: false,
        items: []
    };
    this.options = Object.assign(defaults, options);
    this.options.data = options.data || null;
};

View.prototype.render = function render() {
    return null;
};

module.exports = View;
