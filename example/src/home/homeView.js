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
        // const tmpl = addrs => `
        //   <table>
        //   ${addrs.map(addr => `
        //     <tr><td><a href="#/home/read/3">${addr.first}</a></td></tr>
        //     <tr><td><a href="#/test/2">${addr.last}_${this.options.id}</a></td></tr>
        //   `).join('')}
        //   </table>`;
        // return tmpl(data);

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
        console.warn(this.$el);
        // return this;
    }
    theClick(event){
        event.stopPropagation();
        HBY.trigger('data_update', {aa: 1});
        return
    }
}
export default HomeView;
