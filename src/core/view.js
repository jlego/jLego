class View {
	/**
	 * [constructor description]
	 * @param  {Object} option [description]
	 * @return {[type]}        [description]
	 */
    constructor(option = {}) {
        let defaults = {
            el: '',
            tagName: '',
            on: {},
            permis: {},
            animate: null,
            config: {},
            scrollbar: false,
            items: [],
            data: null,
        };
        this.options = Object.assign(defaults, option);
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