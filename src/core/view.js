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
            context: Lego,
            tagName: 'div',
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
        // 监听数据变化
        if(this.options.data){
            Object.observe(this.options.data, (changes) =>{
                changes.forEach(function(change, i){
                    console.log(change);
                    // that.render();
                });
                // let patches = diff(leftNode, rightNode);
                // patch(rootNode, patches);
            });
        }
        console.warn(this.options.context, this.$el);
        // 绑定事件
        this.$el.undelegate().off();
        if (options.events) {
            const eventSplitter = /\s+/;
            for(let key in options.events) {
                const callback = typeof options.events[key] == 'string' ? this[options.events[key]] : options.events[key];
                let _els;
                if (eventSplitter.test(key)) {
                    const nameArr = key.split(eventSplitter);
                    const selectorStr = nameArr.slice(1).join(' ');
                    key = nameArr[0];
                    if (typeof callback == 'function'){
                        this.$el.delegate(selectorStr, key, callback);
                    }
                }else{
                    if (typeof callback == 'function') this.$el.on(key, callback);
                }
            };
        }
        if(options.listen){
            for(let key in options.listen) {
                Lego.Eventer.removeListener(key, options.listen[key]);
                Lego.Eventer.on(key, options.listen[key]);
            }
        }
        // 是否渲染滚动条
        // if (defaults.scrollbar) {
        //     if (!$el.css('position')) $el.css('position', 'relative');
        //     $el.perfectScrollbar(defaults.scrollbar);
        //     $el.off("mousemove.ps").on("mousemove.ps", function() {
        //         $(this).perfectScrollbar('update');
        //     });
        // }
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
        this.$el = el instanceof Lego.$ ? el : this.options.context.$(el);
        this.el = this.$el[0];
    }
    /**
     * render 渲染视图
     * @return {[type]} [description]
     */
    render() {
        return null;
    }
    /**
     * [remove 销毁视图]
     * @return {[type]} [description]
     */
    remove(){
        // 清理全部事件监听
        this.removeAllListeners();
        if(this.options.listen){
            for(let key in this.options.listen) {
                Lego.Eventer.removeListener(key, this.options.listen[key]);
                Lego.Eventer.on(key, this.options.listen[key]);
            }
        }
        this.$el.off().remove();
    }
}
export default View;