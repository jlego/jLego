import "object.observe";
import hyperx from 'hyperx';
import vdom from 'virtual-dom';
window.hx = hyperx(vdom.h);

class View {
	/**
	 * [constructor description]
	 * @param  {Object} option [description]
	 * @return {[type]}        [description]
	 */
    constructor(opts = {}) {
        const that = this;
        this.options = {
            events: null,
            listen: null,
            context: opts.context || window,
            components: []
        };
        Object.assign(this.options, opts);
        this.Eventer = Lego.Eventer;
        this.server = null;
        this._renderRootNode();
        this.setElement(this.options.el);
        this.setEvent(this.options.el);
        this.options.data = this.options.data || {};
        this._observe();
        this.fetch();
    }
    /**
     * [fetch 拉取数据]
     * @return {[type]} [description]
     */
    fetch(){
        if(this.options.dataSource){
            const dataSource = this.options.dataSource;
            if(dataSource.server){
                if(typeof dataSource.server == 'function'){
                    this.server = new dataSource.server();
                }else{
                    this.server = dataSource.server;
                }
                this.server.fetch(dataSource.api, (resp) => {
                    this.options.data = resp;
                    this.refresh();
                });
            }
        }else{
            this._renderComponents();
        }
    }
    /**
     * [_renderRootNode description]
     * @return {[type]} [description]
     */
    _renderRootNode(){
        this.renderBefore();
        const content = this.render();
        if(content){
            this.oldNode = content;
            this.rootNode = vdom.create(content);
            this.$el = $(this.rootNode);
        }else{
            this.$el = $('<div></div>');
        }
        if(this.options.id || this.options.el){
            if(this.options.id){
                this.$el.attr('id', this.options.id);
            }else{
                if((new RegExp(/#/)).test(this.options.el)){
                    const theId = this.options.el.replace(/#/, '');
                    this.$el.attr('id', theId);
                    this.options.id = theId;
                }
            }
        }
        this.$el.attr('view-id', this.options.vid);
        if(this.options.style){
            this.$el.css(this.options.style);
        }
        if(this.options.attr){
            this.$el.attr(this.options.attr);
        }
        if(this.options.className){
            this.$el.addClass(this.options.className);
        }
        this.el = this.$el[0];
        this.renderAfter();
    }
    /**
     * [_renderComponents 渲染组件]
     * @return {[type]} [description]
     */
    _renderComponents(){
        const that = this;
        if(this.options.components.length) {
            this.options.components.forEach(function(item, i){
                if(that.$(item.el).length){
                    const tagName = item.el ? that.$(item.el)[0].tagName.toLowerCase() : '';
                    if(tagName){
                        item.context = that;
                        Lego.create(Lego.UI[tagName], item);
                    }
                }
            });
        }
    }
    /**
     * [_observe 监听数据变化并刷新视图]
     * @return {[type]} [description]
     */
    _observe(){
        const that = this;
        if(this.options && typeof this.options === 'object'){
            Object.observe(this.options, (changes) =>{
                // debug.log(changes);
                that.renderBefore();
                const newNode = this.render();
                let patches = vdom.diff(that.oldNode, newNode);
                that.rootNode = vdom.patch(that.rootNode, patches);
                that.oldNode = newNode;
                that._renderComponents();
                that.renderAfter();
            });
        }
    }
    /**
     * [setEvent description]
     * @param {[type]} element [description]
     */
    setEvent(el) {
        this.unEvents();
        this.delegateEvents();
        return this;
    }
    /**
     * [_setElement description]
     * @param {[type]} el [description]
     */
    setElement(el){
        if(el) {
            this._$el = el instanceof window.$ ? el : window.$(el);
            if(el == 'body'){
                this._$el.html(this.$el);
            }else{
                this._$el.replaceWith(this.$el);
            }
        }
    }
    /**
     * [delegateEvents description]
     * @return {[type]} [description]
     */
    delegateEvents() {
        const events = this.options.events;
        const delegateEventSplitter = /^(\S+)\s*(.*)$/;
        if (!events) return this;
        this.unEvents();
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
        this.$el.on(eventName + '.delegateEvents' + this.options.vid, selector, listener);
        return this;
    }
    /**
     * [unEvents description]
     * @return {[type]} [description]
     */
    unEvents() {
        if (this.$el) this.$el.off('.delegateEvents' + this.options.vid);
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
        this.$el.off(eventName + '.delegateEvents' + this.options.vid, selector, listener);
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
        return '';
    }
    /**
     * [renderBefore description]
     * @return {[type]} [description]
     */
    renderBefore(){
        return this;
    }
    /**
     * [renderAfter description]
     * @return {[type]} [description]
     */
    renderAfter(){
        return this;
    }
    /**
     * [refresh 刷新视图]
     * @return {[type]} [description]
     */
    refresh() {
        this.options.__v = Lego.randomKey();
    }
    /**
     * [remove 销毁视图]
     * @return {[type]} [description]
     */
    remove(){
        this.unEvents();
        Lego.views[Lego.getAppName()].delete(this.el);
        this.$el.remove();
    }
}
export default View;