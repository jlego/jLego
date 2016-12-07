/**
 * view.js v0.0.6
 * (c) 2016 Evan You
 * @license MIT
 */
"use strict";

function _interopDefault(ex) {
    return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
}

var Events = _interopDefault(require("events"));

var object_observe = require("object.observe");

var View = function(Events$$1) {
    function View(options) {
        if (options === void 0) options = {};
        var defaults = {
            el: "",
            tagName: "",
            events: {},
            permis: {},
            animate: null,
            config: {},
            scrollbar: false,
            items: [],
            data: null
        };
        this.options = Lego.$.extend(true, defaults, options);
        this.options.data = options.data || null;
        var el = defaults.el;
        var $el = el instanceof Lego.$ ? el : Lego.$(el);
        Events$$1.call(this);
        if (this.options.data) {
            Object.observe(this.options.data, function(changes) {
                console.log(changes);
            });
        }
    }
    if (Events$$1) View.__proto__ = Events$$1;
    View.prototype = Object.create(Events$$1 && Events$$1.prototype);
    View.prototype.constructor = View;
    View.prototype.render = function render() {
        return null;
    };
    View.prototype.destory = function destory() {
        this.removeAllListeners();
        $el.off().remove();
    };
    return View;
}(Events);

module.exports = View;
