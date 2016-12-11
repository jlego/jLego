import Events from "events";
import "object.observe";

class View extends Events {
	/**
	 * [constructor description]
	 * @param  {Object} option [description]
	 * @return {[type]}        [description]
	 */
    constructor(opts = {}) {
        super();
        const that = this;
        let options = {
            el: '',
            context: null,
            tagName: 'div',
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
        this._observe();
    }
    /**
     * [_observe 监听数据变化]
     * @return {[type]} [description]
     */
    _observe(){
        const that = this;
        if(this.options.data){
            Object.observe(this.options.data, (changes) =>{
                changes.forEach(function(change, i){
                    console.log(change);
                    that.render();
                });
                // let patches = diff(leftNode, rightNode);
                // patch(rootNode, patches);
            });
        }
    }
    /**
     * [setElement description]
     * @param {[type]} element [description]
     */
    setElement(element) {
        this.undelegateEvents();
        this._setElement(element);
        this.delegateEvents();
        return this;
    }

    delegateEvents() {
        const events = this.options.events;
        const delegateEventSplitter = /^(\S+)\s*(.*)$/;
        if (!events) return this;
        this.undelegateEvents();
        for (let key in events) {
            let method = events[key];
            if (typeof method !== 'function') method = this[method];
            if (!method) continue;
            let match = key.match(delegateEventSplitter);
            this.delegate(match[1], match[2], method.bind(this));
        }
        return this;
    }

    delegate(eventName, selector, listener) {
        this.$el.on(eventName + '.delegateEvents' + this.options.alias, selector, listener);
        return this;
    }

    undelegateEvents() {
        if (this.$el) this.$el.off('.delegateEvents' + this.options.alias);
        return this;
    }

    undelegate(eventName, selector, listener) {
        this.$el.off(eventName + '.delegateEvents' + this.options.alias, selector, listener);
        return this;
    }
    /**
     * [$ description]
     * @param  {[type]} selector [description]
     * @return {[type]}          [description]
     */
    $(selector) {
        return this.$el.find(selector);
    }
    /**
     * [_setElement description]
     * @param {[type]} el [description]
     */
    _setElement(el){
        this.$el = el instanceof Lego.$ ? el : Lego.$(el);
        this.el = this.$el[0];
    }
    /**
     * [_ensureElement description]
     * @return {[type]} [description]
     */
    _ensureElement() {
        if (!this.options.el) {
            this.setElement(document.createElement(this.options.tagName));
        } else {
            this.setElement(this.options.el);
        }
    }
    /**
     * render 渲染视图
     * @return {[type]} [description]
     */
    render() {
        return this;
    }
    /**
     * [remove 销毁视图]
     * @return {[type]} [description]
     */
    remove(){
        // 清理全部事件监听
        this.removeAllListeners();
        this.$el.remove();
    }
}
export default View;