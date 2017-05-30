import "object.observe";
import hyperx from 'hyperx';
import vdom from 'virtual-dom';
window.hx = hyperx(vdom.h);

class View {
	/**
	 * [constructor 构造函数]
	 * @param  {Object} option [description]
	 * @return {[type]}        [description]
	 */
    constructor(opts = {}) {
        const that = this;
        this.eventNameSpace = new Map();
        this.dataMap = new Map();
        opts.context = opts.context || document;
        opts.data = opts.data || null;
        opts.components = opts.components || [];
        this.options = opts;
        // 监听器
        if(this.options.listener && Lego.Eventer){
            for(let key in this.options.listener){
                Lego.Eventer.on(key, this.options.listener[key].bind(this));
            }
        }
        if(typeof this.options.renderBefore == 'function') this.options.renderBefore = this.options.renderBefore.bind(this);
        if(typeof this.options.renderAfter == 'function') this.options.renderAfter = this.options.renderAfter.bind(this);
        this._renderRootNode();
        this.setElement(this.options.el);
        this._observe();
        // this.components();
        this.fetch();
    }
    makeDatamap(data, modelkey = 'id', defaultModel = {}){
        if(Array.isArray(data)){
            data.forEach((item, index) => {
                if(typeof item == 'object' && !Array.isArray(item)){
                    if(item[modelkey]) item[modelkey] = item[modelkey].toString();
                    for(let key in item){
                        item[key] = item[key] || defaultModel[key];
                    }
                }
            });
            this.dataMap.clear();
            data.forEach((item, index) => {
                if(typeof item == 'object' && !Array.isArray(item)){
                    if(item[modelkey] || item[modelkey] == 0){
                        this.dataMap.set(item[modelkey], item);
                    }
                }
            });
        }
        return data;
    }
    /**
     * [fetch 拉取数据]
     * @return {[type]} [description]
     */
    fetch(opts = {}){
        let that = this;
        if(this.options.dataSource){
            if(this.options.loading) this._showLoading();
            const dataSource = this.options.dataSource;
            let api = '';
            dataSource.api = Array.isArray(dataSource.api) ? dataSource.api : [dataSource.api];
            if(dataSource.api.length == 1) api = dataSource.api[0];
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
                    if(api && Array.isArray(resp)){
                        let modelkey = 'id', defaultModel = {};
                        if(server.options[api]){
                            modelkey = server.options[api].modelkey;
                            defaultModel = server.options[api].defaultModel;
                        }
                        this.options.data = this.makeDatamap(resp, modelkey, defaultModel);
                    }else{
                        this.options.data = resp;
                    }
                    if(this.options.loading) this._hideLoading();
                    this.dataReady();
                    // this.components();
                    this.refresh();
                }, this);
            }
        }else{
            this._renderComponents();
        }
    }
    /**
     * 显示加载中
     */
    _showLoading(){}
    /**
     * 隐藏加载条
     */
    _hideLoading(){}
    /**
     * [_renderRootNode 渲染当前视图dom根节点]
     * @return {[type]} [description]
     */
    _renderRootNode(){
        let opts = this.options;
        if(opts.renderBefore) opts.renderBefore();
        this.renderBefore();
        opts.data = typeof opts.data == 'function' ? opts.data() : opts.data;
        opts.data = this.makeDatamap(opts.data);
        const content = this.render();
        if(content){
            this.oldNode = content;
            this.rootNode = vdom.create(content);
            this.el = this.rootNode;
        }else{
            this.el = document.createElement('<div></div>');
        }
        if(opts.id || opts.el){
            if(opts.id){
                this.el.setAttribute('id', opts.id);
            }else{
                if((new RegExp(/#/)).test(opts.el)){
                    const theId = opts.el.replace(/#/, '');
                    this.el.setAttribute('id', theId);
                    opts.id = theId;
                }
            }
        }
        this.el.setAttribute('view-id', opts.vid);
        if(opts.style){
            for(let key in opts.style){
                if(typeof opts.style[key] == 'number'){
                    opts.style[key] += 'px';
                }
                this.el.style[key] = opts.style[key];
            }
        }
        if(opts.attr){
            for(let key in opts.attr){
                this.el.setAttribute(key, opts.attr[key]);
            }
        }
        if(opts.className){
            this.el.className += ' ' + opts.className;
        }
        if(window.$) this.$el = window.$(this.el);
    }
    /**
     * [_renderComponents 渲染组件]
     * @return {[type]} [description]
     */
    _renderComponents(){
        let that = this,
            opts = this.options;
        this.components();
        let components = this.options.components;
        components = Array.isArray(components) ? components : [components];
        if(components.length) {
            components.forEach(function(item, i){
                if(that.$(item.el).length){
                    const tagName = item.el ? that.$(item.el)[0].tagName.toLowerCase() : '';
                    if(tagName){
                        item.context = that;
                        if(Lego.UI[tagName]) Lego.create(Lego.UI[tagName], item);
                    }
                }
            });
        }
        if(!opts.dataSource){
            if(opts.renderAfter) opts.renderAfter();
            this.renderAfter();
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
                    Object.assign(hasOne, com);
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
                if(typeof this.options.data == 'function') this.options.data = this.options.data();
                const newNode = this.render();
                let patches = vdom.diff(this.oldNode, newNode);
                this.rootNode = vdom.patch(this.rootNode, patches);
                this.el = this.rootNode;
                this.oldNode = newNode;
                this._renderComponents();
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
            if(el == 'body') this.options.insert = 'html';
            switch(this.options.insert){
                case 'html':
                    let childs = _el.childNodes;
                    for(let i = childs.length - 1; i >= 0; i--){
                        _el.removeChild(childs.item(i));
                    }
                    _el.appendChild(this.el);
                    break;
                case 'append':
                    _el.appendChild(this.el);
                    break;
                case 'prepend':
                    _el.insertBefore(this.el, _el.childNodes[0]);
                    break;
                default:
                    _el.parentNode.replaceChild(this.el, _el);
            }
        }
    }
    /**
     * [$ 选择当前视图某节点]
     * @param  {[type]} selector [description]
     * @return {[type]}          [description]
     */
    $(selector) {
        return this.$el ? this.$el.find(selector) : this.el.querySelectorAll(selector);
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
        if(this.el) this.el.remove();
    }
}
export default View;
