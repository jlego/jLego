import BaseView from '../../../dist/view';

class MainView extends BaseView {
    constructor(opts = {}) {
        opts.events = {
            'click nav a': 'clickNav'
        };
        super(opts);
    }
    render() {
        // const data = this.options.data || [];
        const tmpl = `
        <nav>
            <ul>
                <li><a href="javascript:;" data-app="home">菜单一</a></li>
                <li><a href="javascript:;" data-app="test/30">菜单二</a></li>
                <li><a href="javascript:;" data-app="home/list">菜单三</a></li>
            </ul>
        </nav>
        <content id="content"></content>`;
        this.$el.html(tmpl);
        return this;
    }
    clickNav(event){
        const target = HBY.$(event.currentTarget),
            app = target.data('app');
        HBY.startApp(app);
    }
}
export default MainView;