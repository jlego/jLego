import BaseView from '../../../dist/view';

class ListView extends BaseView {
    constructor(options = {}) {
        options.events = {
            'click #test': 'theClick'
        };
        options.listen = {
            'data_update': (opts) => {
                console.warn('pppppppppp', opts);
            }
        };
        super(options);
    }
    render() {
        let data = this.options.data || [],
            subDom = [];

        data.forEach((model, i) => {
            subDom.push(HBY.h('a#' + model.first, {
                href: '#/home/list',
                style: {
                    display: 'block'
                }
            }, [model.last]));
        });
        let rootNode = HBY.h('div#uuu', subDom);
    	return HBY.createElement(rootNode);
    }
    theClick(event){
        console.warn('66666666666');
    }
}
export default ListView;
