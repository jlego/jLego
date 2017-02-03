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
            context: opts.context || document,
            components: []
        };
        Object.assign(this.options, opts);
        this.Eventer = Lego.Eventer;
        this.server = null;
        this._renderRootNode();
        this.setElement(this.options.el);
        this.setEvent(this.options.el);
        this.options.data = typeof this.options.data == 'function' ? this.options.data() : (this.options.data || {});
        this._observe();
        this.fetch();
    }
    /**
     * [fetch 拉取数据]
     * @return {[type]} [description]
     */
    fetch(opts = {}){
        if(this.options.dataSource){
            const dataSource = this.options.dataSource;
            dataSource.api = Array.isArray(dataSource.api) ? dataSource.api : [dataSource.api];
            dataSource.api.forEach(apiName => {
                dataSource[apiName] = Lego.extend(dataSource.server.options[apiName], dataSource[apiName] || {}, opts);
            });
            if(dataSource.server){
                let server = null;
                if(typeof dataSource.server == 'function'){
                    server = new dataSource.server();
                }else{
                    server = dataSource.server;
                }
                server.fetch(dataSource.api, {
                    view: this
                }, (resp) => {
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
            this.el = this.rootNode;
        }else{
            this.el = document.createElement('<div></div>');
        }
        if(this.options.id || this.options.el){
            if(this.options.id){
                this.el.setAttribute('id', this.options.id);
            }else{
                if((new RegExp(/#/)).test(this.options.el)){
                    const theId = this.options.el.replace(/#/, '');
                    this.el.setAttribute('id', theId);
                    this.options.id = theId;
                }
            }
        }
        this.el.setAttribute('view-id', this.options.vid);
        if(this.options.style){
            // this.$el.css(this.options.style);
            for(let key in this.options.style){
                this.el.style[key] = this.options.style[key];
            }
        }
        if(this.options.attr){
            // this.el.setAttribute(this.options.attr);
            for(let key in this.options.attr){
                this.el.setAttribute(key, this.options.attr[key]);
            }
        }
        if(this.options.className){
            // this.$el.addClass(this.options.className);
            this.el.className += this.options.className;
        }
        this.$el = window.$ ? window.$(this.el) : {};
        this.renderAfter();
    }
    /**
     * [_renderComponents 渲染组件]
     * @return {[type]} [description]
     */
    _renderComponents(){
        const that = this;
        let components = this.options.components;
        components = typeof components == 'function' ? components(this.options) : (Array.isArray(components) ? components : [components]);
        if(components.length) {
            components.forEach(function(item, i){
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
            let pEl = this.options.context.el || document,
                _el = typeof el == 'string' ? pEl.querySelector(el) : el;
            if(el == 'body'){
                let childs = _el.childNodes;  
                for(let i = childs.length - 1; i >= 0; i--){      
                    _el.removeChild(childs.item(i));      
                } 
                _el.appendChild(this.el);
            }else{
                _el.parentNode.replaceChild(this.el, _el);
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
        // this.$el.on(eventName + '.delegateEvents' + this.options.vid, selector, listener);
        let els = selector ? this.el.querySelectorAll(selector) : [this.el];
        for(let i = 0; i < els.length; i++){
            els[i]['on' + eventName] = listener;
        }
        return this;
    }
    /**
     * [unEvents description]
     * @return {[type]} [description]
     */
    unEvents() {
        // if (this.$el) this.$el.off('.delegateEvents' + this.options.vid);
        let el = this.el;
        for(let key in el){
            if(typeof el[key] == 'function' && key.indexOf('on') == 0){
                delete el[key];
            } 
        }
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
        // this.$el.off(eventName + '.delegateEvents' + this.options.vid, selector, listener);
        let els = selector ? this.el.querySelectorAll(selector) : [this.el];
        for(let i = 0; i < els.length; i++){
            delete els[i]['on' + eventName];
        }
        return this;
    }
    /**
     * [findEl description]
     * @param  {[type]} selector [description]
     * @return {[type]}          [description]
     */
    findEl(selector) {
        return this.el.querySelectorAll(selector);
    }
    /**
     * [$ description]
     * @param  {[type]} selector [description]
     * @return {[type]}          [description]
     */
    $(selector) {
        return window.$ ? this.$el.find(selector) : null;
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
        this.el.parentNode.removeChild(this.el);
    }
}
export default View;