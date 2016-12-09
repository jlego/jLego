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
        if (opts === void 0) opts = {};
        Events$$1.call(this);
        var that = this;
        var options = {
            el: "",
            context: null,
            tagName: "div",
            events: null,
            listen: null,
            permis: {},
            animate: null,
            config: {},
            scrollbar: false,
            items: []
        };
        this.options = Lego.$.extend(true, options, opts);
        this._ensureElement();
        if (this.options.data) {
            Object.observe(this.options.data, function(changes) {
                changes.forEach(function(change, i) {
                    console.log(change);
                    that.render();
                });
            });
        }
    }
    if (Events$$1) View.__proto__ = Events$$1;
    View.prototype = Object.create(Events$$1 && Events$$1.prototype);
    View.prototype.constructor = View;
    View.prototype.setElement = function setElement(element) {
        this.undelegateEvents();
        this._setElement(element);
        this.delegateEvents();
        return this;
    };
    View.prototype.delegateEvents = function delegateEvents() {
        var this$1 = this;
        var events = this.options.events;
        var delegateEventSplitter = /^(\S+)\s*(.*)$/;
        if (!events) {
            return this;
        }
        this.undelegateEvents();
        for (var key in events) {
            var method = events[key];
            if (typeof method !== "function") {
                method = this$1[method];
            }
            if (!method) {
                continue;
            }
            var match = key.match(delegateEventSplitter);
            this$1.delegate(match[1], match[2], method.bind(this$1));
        }
        return this;
    };
    View.prototype.delegate = function delegate(eventName, selector, listener) {
        this.$el.on(eventName + ".delegateEvents" + this.options.alias, selector, listener);
        return this;
    };
    View.prototype.undelegateEvents = function undelegateEvents() {
        if (this.$el) {
            this.$el.off(".delegateEvents" + this.options.alias);
        }
        return this;
    };
    View.prototype.undelegate = function undelegate(eventName, selector, listener) {
        this.$el.off(eventName + ".delegateEvents" + this.options.alias, selector, listener);
        return this;
    };
    View.prototype.$ = function $(selector) {
        return this.$el.find(selector);
    };
    View.prototype._setElement = function _setElement(el) {
        this.$el = el instanceof Lego.$ ? el : Lego.$(el);
        this.el = this.$el[0];
    };
    View.prototype._ensureElement = function _ensureElement() {
        if (!this.options.el) {
            this.setElement(document.createElement(this.options.tagName));
        } else {
            this.setElement(this.options.el);
        }
    };
    View.prototype.render = function render() {
        return this;
    };
    View.prototype.remove = function remove() {
        this.removeAllListeners();
        this.$el.remove();
    };
    return View;
}(Events);

module.exports = View;
