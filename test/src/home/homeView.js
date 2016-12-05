import BaseView from '../../../dist/view';

class HomeView extends BaseView {
    constructor(option = {}) {
        super(option);
        option.on = {
        	'click': this.theClick
        };
        this.data = option.data;
    }
    render() {
        let data = this.data;
        const tmpl = addrs => `
          <table>
          ${addrs.map(addr => `
            <tr><td><a href="#/home/read/3">${addr.first}</a></td></tr>
            <tr><td><a href="#/test/2">${addr.last}_${this.options.id}</a></td></tr>
          `).join('')}
          </table>`;
        return tmpl(data);

        let dom = h('div#pp', {
    		key: 'uuu',
    		namespace: 'root/user',
    		'data-url': 'javascript:;',
    	}, ['dddd']);
    	return dom;
    }
    theClick(event){
    	console.warn('ooooooooooo');
    }
}
export default HomeView;
