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
    function View(opts) {
        var this$1 = this;
        if (opts === void 0) opts = {};
        Events$$1.call(this);
        var that = this;
        var options = {
            el: "",
            context: Lego,
            tagName: "div",
            events: {},
            listen: null,
            permis: {},
            animate: null,
            config: {},
            scrollbar: false,
            items: []
        };
        this.options = Lego.$.extend(true, options, opts);
        this._setElement(options.el);
        if (this.options.data) {
            Object.observe(this.options.data, function(changes) {
                changes.forEach(function(change, i) {
                    console.log(change);
                });
            });
        }
        console.warn(this.options.context, this.$el);
        this.$el.undelegate().off();
        if (options.events) {
            var eventSplitter = /\s+/;
            for (var key in options.events) {
                var callback = typeof options.events[key] == "string" ? this$1[options.events[key]] : options.events[key];
                var _els = void 0;
                if (eventSplitter.test(key)) {
                    var nameArr = key.split(eventSplitter);
                    var selectorStr = nameArr.slice(1).join(" ");
                    key = nameArr[0];
                    if (typeof callback == "function") {
                        this$1.$el.delegate(selectorStr, key, callback);
                    }
                } else {
                    if (typeof callback == "function") {
                        this$1.$el.on(key, callback);
                    }
                }
            }
        }
        if (options.listen) {
            for (var key$1 in options.listen) {
                Lego.Eventer.removeListener(key$1, options.listen[key$1]);
                Lego.Eventer.on(key$1, options.listen[key$1]);
            }
        }
    }
    if (Events$$1) View.__proto__ = Events$$1;
    View.prototype = Object.create(Events$$1 && Events$$1.prototype);
    View.prototype.constructor = View;
    View.prototype.$ = function $(selector) {
        return this.$el.find(selector);
    };
    View.prototype._setElement = function _setElement(el) {
        this.$el = el instanceof Lego.$ ? el : this.options.context.$(el);
        this.el = this.$el[0];
    };
    View.prototype.render = function render() {
        return null;
    };
    View.prototype.remove = function remove() {
        var this$1 = this;
        this.removeAllListeners();
        if (this.options.listen) {
            for (var key in this.options.listen) {
                Lego.Eventer.removeListener(key, this$1.options.listen[key]);
                Lego.Eventer.on(key, this$1.options.listen[key]);
            }
        }
        this.$el.off().remove();
    };
    return View;
}(Events);

module.exports = View;
