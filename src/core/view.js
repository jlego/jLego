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
        const content = this.render();
        if(Lego.config.isOpenVirtualDom && typeof content !== 'string'){
            const treeNode = this._getVdom(content);
            this.rootNode = Lego.createElement(treeNode);
            this.$el[this.options.insert](this.rootNode);
        }
        if(typeof content === 'string'){
            this._renderHtml(content);
        }
        this._observe();
    }
    /**
     * [_getVdom description]
     * @return {[type]} [description]
     */
    _getVdom(content){
        let nodeTag = this.options.tagName;
        let attrObj = {
            id: this.options.id
        };
        return h(nodeTag, attrObj, [content]);
    }
    /**
     * [_renderHtml 刷新普通渲染视图]
     * @param  {[type]} content [description]
     * @return {[type]}         [description]
     */
    _renderHtml(content){
        const $content = $(document.createElement(this.options.tagName)).html(content);
        $content.attr('id', this.options.id);
        this.$el[this.options.insert]($content);
    }
    /**
     * [_observe 监听数据变化并刷新视图]
     * @return {[type]} [description]
     */
    _observe(){
        const that = this;
        if(this.options.data){
            Object.observe(this.options.data, (changes) =>{
                changes.forEach(function(change, i){
                    debug.log(change);
                    if(Lego.config.isOpenVirtualDom){
                        const treeNode = this._getVdom();
                        let patches = diff(that.oldTree, treeNode);
                        that.rootNode = patch(that.rootNode, patches);
                        that.oldTree = treeNode;
                    }
                    if(typeof that.render() === 'string'){
                        that._renderHtml(that.render());
                    }
                });
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
    /**
     * [_setElement description]
     * @param {[type]} el [description]
     */
    _setElement(el){
        this.$el = el instanceof Lego.$ ? el : Lego.$(el);
        this.el = this.$el[0];
    }
    /**
     * [delegateEvents description]
     * @return {[type]} [description]
     */
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
    /**
     * [delegate description]
     * @param  {[type]} eventName [description]
     * @param  {[type]} selector  [description]
     * @param  {[type]} listener  [description]
     * @return {[type]}           [description]
     */
    delegate(eventName, selector, listener) {
        this.$el.on(eventName + '.delegateEvents' + this.options.id, selector, listener);
        return this;
    }
    /**
     * [undelegateEvents description]
     * @return {[type]} [description]
     */
    undelegateEvents() {
        if (this.$el) this.$el.off('.delegateEvents' + this.options.id);
        return this;
    }
    /**
     * [undelegate description]
     * @param  {[type]} eventName [description]
     * @param  {[type]} selector  [description]
     * @param  {[type]} listener  [description]
     * @return {[type]}           [description]
     */
    undelegate(eventName, selector, listener) {
        this.$el.off(eventName + '.delegateEvents' + this.options.id, selector, listener);
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
        this.undelegateEvents();
        this.$el.children().remove();
    }
}
export default View;