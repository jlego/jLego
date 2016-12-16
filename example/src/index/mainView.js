class MainView extends HBY.View {
    constructor(opts = {}) {
        const options = {
            events: {
                // 'click nav a': 'clickNav'
            }
        };
        HBY.$.extend(true, options, opts);
        super(options);
    }
    render() {
        const tmpl = hx`<div>
        <nav>
            <ul>
                <li><a href="javascript:HBY.startApp('home');">菜单一</a></li>
                <li><a href="javascript:HBY.startApp('test');">菜单二</a></li>
            </ul>
        </nav>
        <content id="content"></content>
        </div>`;
        return tmpl;
    }
    clickNav(event){
        const target = HBY.$(event.currentTarget),
            app = target.data('app');
        HBY.startApp(app);
    }
}
export default MainView;