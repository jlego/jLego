import Events from "events";
import "object.observe";

class View extends Events {
	/**
	 * [constructor description]
	 * @param  {Object} option [description]
	 * @return {[type]}        [description]
	 */
    constructor(options = {}) {
        let defaults = {
            el: '',
            tagName: 'div',
            events: {},
            listen: null,
            permis: {},
            animate: null,
            config: {},
            scrollbar: false,
            items: []
        };
        this.options = Lego.$.extend(true, defaults, options);
        this.options.data = options.data || null;
        const el = defaults.el;
        this.$el = el instanceof Lego.$ ? el : Lego.$(el);
        super();
        // 监听数据变化
        if(this.options.data){
            Object.observe(this.options.data, (changes) =>{
                changes.forEach(function(change, i){
                    console.log(change);
                });
                // let patches = diff(leftNode, rightNode);
                // patch(rootNode, patches);
            });
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
                Lego.Eventer.removeListener(key, options.listen[key]);
                Lego.Eventer.on(key, options.listen[key]);
            }
        }
        this.$el.off().remove();
    }
}
export default View;