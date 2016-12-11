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
            events: null,
            listen: null,
            permis: {},
            animate: null,
            config: {},
            scrollbar: false,
            items: []
        };
        this.options = $.extend(true, options, opts);
        this.setElement(this.options.el);
        var content = this.render();
        if (Lego.config.isOpenVirtualDom && typeof content !== "string") {
            var treeNode = this._getVdom(content);
            this.rootNode = Lego.createElement(treeNode);
            this.$el[this.options.insert](this.rootNode);
        }
        if (typeof content === "string") {
            this._renderHtml(content);
        }
        this._observe();
    }
    if (Events$$1) View.__proto__ = Events$$1;
    View.prototype = Object.create(Events$$1 && Events$$1.prototype);
    View.prototype.constructor = View;
    View.prototype._getVdom = function _getVdom(content) {
        var nodeTag = this.options.tagName;
        var attrObj = {
            id: this.options.id
        };
        return h(nodeTag, attrObj, [ content ]);
    };
    View.prototype._renderHtml = function _renderHtml(content) {
        var $content = $(document.createElement(this.options.tagName)).html(content);
        $content.attr("id", this.options.id);
        this.$el[this.options.insert]($content);
    };
    View.prototype._observe = function _observe() {
        var that = this;
        if (this.options.data) {
            Object.observe(this.options.data, function(changes) {
                changes.forEach(function(change, i) {
                    debug.log(change);
                    if (Lego.config.isOpenVirtualDom) {
                        var treeNode = this._getVdom();
                        var patches = diff(that.oldTree, treeNode);
                        that.rootNode = patch(that.rootNode, patches);
                        that.oldTree = treeNode;
                    }
                    if (typeof that.render() === "string") {
                        that._renderHtml(that.render());
                    }
                });
            });
        }
    };
    View.prototype.setElement = function setElement(element) {
        this.undelegateEvents();
        this._setElement(element);
        this.delegateEvents();
        return this;
    };
    View.prototype._setElement = function _setElement(el) {
        this.$el = el instanceof Lego.$ ? el : Lego.$(el);
        this.el = this.$el[0];
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
        this.$el.on(eventName + ".delegateEvents" + this.options.id, selector, listener);
        return this;
    };
    View.prototype.undelegateEvents = function undelegateEvents() {
        if (this.$el) {
            this.$el.off(".delegateEvents" + this.options.id);
        }
        return this;
    };
    View.prototype.undelegate = function undelegate(eventName, selector, listener) {
        this.$el.off(eventName + ".delegateEvents" + this.options.id, selector, listener);
        return this;
    };
    View.prototype.$ = function $(selector) {
        return this.$el.find(selector);
    };
    View.prototype.render = function render() {
        return this;
    };
    View.prototype.remove = function remove() {
        this.removeAllListeners();
        this.undelegateEvents();
        this.$el.children().remove();
    };
    return View;
}(Events);

module.exports = View;
