import BaseView from '../../../dist/view';

class HomeView extends BaseView {
    constructor(opts = {}) {
        const options = {
            // el: 'div#uuu88',
            events: {
                'click #400': 'theClick'
            }
        };
        $.extend(true, options, opts);
        super(options);
    }
    render() {
        let data = this.options.data || [],
            that = this,
            vDom = [];

        data.forEach((model, i) => {
            vDom.push(h('a#' + model.first + i, {
                href: '#/home',
                style: {
                    display: 'block'
                }
            }, [model.last]));
        });
        return vDom;
    }
    theClick(event){
        event.stopPropagation();
        HBY.trigger('data_update', {aa: 1});
    }
}
export default HomeView;
