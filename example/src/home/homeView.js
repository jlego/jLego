import BaseView from '../../../dist/view';

class HomeView extends BaseView {
    constructor(options = {}) {
        options.events = {
            'click #test': 'theClick'
        };
        super(options);
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
    	return HBY.createElement(rootNode);
    }
    theClick(event){
    	console.warn('ooooooooooo');
    }
}
export default HomeView;
