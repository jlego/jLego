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
            permis: {},
            animate: null,
            config: {},
            scrollbar: false,
            items: []
        };
        this.options = Lego.$.extend(true, defaults, options);
        this.options.data = options.data || null;
        const el = defaults.el;
        let $el = el instanceof Lego.$ ? el : Lego.$(el);
        super();
        // 监听数据变化
        if(this.options.data){
            Object.observe(this.options.data, (changes) =>{
                console.log(changes);
                // let patches = diff(leftNode, rightNode);
                // patch(rootNode, patches);
            });
        }
        // this.on('data_update', (opts) => {
        //     console.warn(opts);
        // });
        // this.emit('data_update', {aa: 1});
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
     * [destory 销毁视图]
     * @return {[type]} [description]
     */
    destory(){
        // 清理全部事件监听
        this.removeAllListeners();
        $el.off().remove();
    }
}
export default View;