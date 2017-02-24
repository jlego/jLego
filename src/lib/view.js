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
            context: opts.context || document,
            data: [],
            components: []
        };
        Object.assign(this.options, opts);
        // 监听器
        if(this.options.listener && Lego.Eventer){
            for(let key in this.options.listener){
                Lego.Eventer.on(key, this.options.listener[key]);
            }
        }
        this._renderRootNode();
        this.setElement(this.options.el);
        this._observe();
        this.components();
        this.fetch();
    }
    /**
     * [fetch 拉取数据]
     * @return {[type]} [description]
     */
    fetch(opts = {}){
        let that = this;
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
                server.fetch(dataSource.api, dataSource.isAjax && window.$ ? dataSource : {}, (resp) => {
                    this.options.data = resp;
                    this.dataReady();
                    this.components();
                    this.refresh();
                }, this);
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
        this.options.data = typeof this.options.data == 'function' ? this.options.data() : this.options.data;
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
        if(window.$) this.$el = window.$(this.el);
        this.renderAfter();
    }
    /**
     * [_renderComponents 渲染组件]
     * @return {[type]} [description]
     */
    _renderComponents(){
        const that = this;
        let components = this.options.components;
        components = Array.isArray(components) ? components : [components];
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
     * [addCom 添加视图子组件]
     * @param {[type]} comObj [description]
     */
    addCom(comObjs){
        let that = this;
        comObjs = Array.isArray(comObjs) ? comObjs : [comObjs];
        if(comObjs.length){
            comObjs.forEach(com => {
                if(!com.el) return;
                let hasOne = that.options.components.find(item => item.el == com.el);
                if(hasOne){
                    Lego.extend(hasOne, com);
                }else{
                    that.options.components.push(com);
                }
            });
        }
        return that.options.components;
    }
    /**
     * [_observe 监听数据变化并刷新视图]
     * @return {[type]} [description]
     */
    _observe(){
        const that = this;
        if(this.options && typeof this.options === 'object'){
            Object.observe(this.options, (changes) =>{
                this.options.data = typeof this.options.data == 'function' ? this.options.data() : this.options.data;
                this.renderBefore();
                const newNode = this.render();
                let patches = vdom.diff(this.oldNode, newNode);
                this.rootNode = vdom.patch(this.rootNode, patches);
                this.oldNode = newNode;
                this._renderComponents();
                this.renderAfter();
            });
        }
    }
    /**
     * [_setElement 插入dom节点]
     * @param {[type]} el [description]
     */
    setElement(el){
        if(el) {
            let pEl = this.options.context.el || document,
                _el = typeof el == 'string' ? pEl.querySelector(el) : el;
            if(el == 'body' || this.options.insert == 'append' || this.options.insert == 'html'){
                if(this.options.insert !== 'append' || this.options.insert == 'html'){
                    let childs = _el.childNodes;
                    for(let i = childs.length - 1; i >= 0; i--){
                        _el.removeChild(childs.item(i));
                    }
                }
                _el.appendChild(this.el);
            }else{
                _el.parentNode.replaceChild(this.el, _el);
            }
        }
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
     * [components description]
     * @return {[type]} [description]
     */
    components(){
        return this;
    }
    /**
     * [dataReady 数据已加载完回调]
     * @return {[type]} [description]
     */
    dataReady(){
        return this;
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
        if(this.el) this.el.parentNode.removeChild(this.el);
    }
}
export default View;