import "object.observe";
import hyperx from 'hyperx';
import vdom from 'virtual-dom';
window.hx = hyperx(vdom.h);

window.delegateEventSplitter = /^(\S+)\s*(.*)$/;
class View {
	/**
	 * [constructor 构造函数]
	 * @param  {Object} option [description]
	 * @return {[type]}        [description]
	 */
    constructor(opts = {}) {
        const that = this;
        this.eventNameSpace = new Map();
        this.options = {
            events: null,
            listen: null,
            context: opts.context || document,
            components: []
        };
        Object.assign(this.options, opts);
        this.isLoaded = false;
        this.server = null;
        this._renderRootNode();
        this.setElement(this.options.el);
        this.options.data = typeof this.options.data == 'function' ? this.options.data() : (this.options.data || {});
        this._observe();
        this.fetch();
        this.setEvent();
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
                dataSource[apiName] = Lego.extend({}, dataSource.server.options[apiName], dataSource[apiName] || {}, opts);
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
     * [_renderRootNode 渲染当前视图dom根节点]
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
            for(let key in this.options.style){
                if(typeof this.options.style[key] == 'number'){
                    this.options.style[key] += 'px';
                }
                this.el.style[key] = this.options.style[key];
            }
        }
        if(this.options.attr){
            for(let key in this.options.attr){
                this.el.setAttribute(key, this.options.attr[key]);
            }
        }
        if(this.options.className){
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
                if(that.find(item.el).length){
                    const tagName = item.el ? that.find(item.el)[0].tagName.toLowerCase() : '';
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
     * [setEvent 设置dom]
     * @param {[type]} element [description]
     */
    setEvent() {
        this.unBindEvents();
        this.delegateEvents();
        return this;
    }
    /**
     * [_setElement 插入dom节点]
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
     * [delegateEvents 通过解析配置绑定事件]
     * @return {[type]} [description]
     */
    delegateEvents(isUnbind) {
        const events = this.options.events;
        if (!events) return this;
        for (let key in events) {
            let method = events[key];
            if (typeof method !== 'function') method = this[method];
            if (!method) continue;
            let match = key.match(delegateEventSplitter);
            this.bindEvents(match[1], match[2], method.bind(this), isUnbind);
        }
        return this;
    }
    /**
     * [handler description]
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    handler(event){
        let target = event.target,
            eventName = event.type,
            path = event.path,
            that = this,
            targetIndex = path.indexOf(target);
        if(this.eventNameSpace.has(eventName)){
            let selectorMap = this.eventNameSpace.get(eventName),
                resultArr = [];
            selectorMap.forEach((listener, selector) => {
                let els = selector ? this.el.querySelectorAll(selector) : [this.el];
                for(let i = 0; i < els.length; i++){
                    let elIndex = path.indexOf(els[i]);
                    if (elIndex >= targetIndex) {
                        resultArr.push({order: elIndex, listener: listener, target: els[i]});
                    }
                }
            });
            if(resultArr.length){
                resultArr.sort(function(a, b){
                    return a.order - b.order;
                });
                resultArr.forEach((value, index) => {
                    let listener = resultArr[index].listener;
                    if (typeof listener == "function") {
                        listener(event, resultArr[index].target);
                    }
                });
            }
        }
    }
    /**
     * [bindEvents 事件绑定]
     * @param  {[type]} eventName [description]
     * @param  {[type]} selector  [description]
     * @param  {[type]} listener  [description]
     * @return {[type]}           [description]
     */
    bindEvents(eventName, selector, listener, isUnbind = false){
        if(!eventName || !listener) return;
        if(!isUnbind){
            if(this.eventNameSpace.has(eventName)){
                this.eventNameSpace.get(eventName).set(selector, listener);
            }else{
                let subEvent = new Map();
                subEvent.set(selector, listener);
                this.eventNameSpace.set(eventName, subEvent);
                this.el.removeEventListener(eventName, this.handler.bind(this));
                this.el.addEventListener(eventName, this.handler.bind(this), false);
            }
        }else{
            if(this.eventNameSpace.has(eventName)){
                this.eventNameSpace.get(eventName).delete(selector);
            }
        }
        return this;
    }
    /**
     * [unBindEvents 取消所有绑定事件]
     * @return {[type]} [description]
     */
    unBindEvents() {
        this.delegateEvents(true);
        return this;
    }
    /**
     * [find 选择当前视图某节点]
     * @param  {[type]} selector [description]
     * @return {[type]}          [description]
     */
    find(selector) {
        return this.el.querySelectorAll(selector);
    }
    /**
     * [$ 简化jquery选择节点]
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
     * [renderBefore 渲染视图前回调]
     * @return {[type]} [description]
     */
    renderBefore(){
        return this;
    }
    /**
     * [renderAfter 渲染视图后回调]
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
        this.unBindEvents();
        // if(this.el.parentNode) this.el.parentNode.removeChild(this.el);
    }
}
export default View;