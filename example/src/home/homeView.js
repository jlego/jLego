import BaseView from '../../../dist/view';

class HomeView extends BaseView {
    constructor(opts = {}) {
        opts.events = {
            'click #400': 'theClick'
        };
        super(opts);
    }
    render() {
        let data = this.options.data || [],
            that = this,
            subDom = [];

        data.forEach((model, i) => {
            subDom.push(HBY.h('a#' + that.options.id + i, {
                href: '#/home',
                style: {
                    display: 'block'
                }
            }, [model.last]));
        });
        let rootNode = HBY.h('div#uuu88', subDom);
        this.$el.html(HBY.createElement(rootNode));
    }
    theClick(event){
        event.stopPropagation();
        HBY.trigger('data_update', {aa: 1});
        return
    }
}
export default HomeView;
