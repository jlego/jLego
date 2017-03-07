class ListView extends Lego.View {
    constructor(opts = {}) {
        const options = {
            events: {
                'click a': 'theClick'
            },
            listener: {
                'data_update': (data, data2) => {
                    debug.warn('ttttttttttt', data, data2);
                }
            }
        };
        Object.assign(options, opts);
        super(options);
    }
    render() {
        let data = this.options.data || [];
        debug.warn('更新了视图', data);
        let vDom = hx`
        <div class="page-container" id="page-container">
          <h1>hello world!</h1>
          ${data.map((model, i) => {
            return hx`<a href="javascript:;" style="display:block;">${model.last}</a>\n`
          })}
          <home id="test"></home>
        </div>`;
        return vDom;
    }
    theClick(event){
        event.stopPropagation();
        debug.warn('66666666666');
    }
}
Lego.components('list', ListView);
export default ListView;
