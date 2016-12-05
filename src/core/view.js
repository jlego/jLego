class View {
	/**
	 * [constructor description]
	 * @param  {Object} option [description]
	 * @return {[type]}        [description]
	 */
    constructor(options = {}) {
        let defaults = {
            el: '',
            tagName: '',
            events: {},
            permis: {},
            animate: null,
            config: {},
            scrollbar: false,
            items: []
        };
        this.options = Object.assign(defaults, options);
        this.options.data = options.data || null;
    }
    /**
     * render 渲染视图
     * @return {[type]} [description]
     */
    render() {
        return null;
    }
}
export default View;