import BaseView from '../../../dist/view';

class ListView extends BaseView {
    constructor(opts = {}) {
        opts.events = {
            'click #test': 'theClick'
        };
        opts.listen = {
            'data_update': (data) => {
                console.warn('pppppppppp', data);
            }
        };
        super(opts);
    }
    render() {
        let data = this.options.data.data || [],
            subDom = [];
        // console.warn('刷新了视图', data);

        data.forEach((model, i) => {
            subDom.push(HBY.h('a#' + model.first, {
                href: '#/home/list',
                style: {
                    display: 'block'
                }
            }, [model.last]));
        });
        let rootNode = HBY.h('div#uuu', subDom);
        this.$el.html(HBY.createElement(rootNode));
    }
    theClick(event){
        console.warn('66666666666');
    }
}
export default ListView;
