import BaseView from '../../../dist/view';

class ListView extends BaseView {
    constructor(opts = {}) {
        const options = {
            events: {
                'click #test': 'theClick'
            },
            listen: {
                'data_update': (data) => {
                    console.warn('pppppppppp', data);
                }
            }
        };
        $.extend(true, options, opts);
        super(options);
    }
    render() {
        let data = this.options.data.data || [],
            vDom = [];

        data.forEach((model, i) => {
            vDom.push(h('a#' + model.first, {
                href: '#/home/list',
                style: {
                    display: 'block'
                }
            }, [model.last]));
        });
        return vDom;
    }
    theClick(event){
        console.warn('66666666666');
    }
}
export default ListView;
