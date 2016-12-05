import BaseView from '../../../dist/view';

class ListView extends BaseView {
    constructor(options = {}) {
        super(options);
    }
    render() {
        let data = this.options.data || [],
            subDom = [];

        data.forEach((model, i) => {
            subDom.push(HBY.h('div#' + model.first, {
                href: 'javascript:;',
                style: {
                    display: 'block'
                }
            }, [model.last]));
        });
        let rootNode = HBY.h('div#uuu', subDom);
    	return HBY.createElement(rootNode);
    }
}
export default ListView;
