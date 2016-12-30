class ListView extends HBY.View {
    constructor(opts = {}) {
        const options = {
            events: {
                'click a': 'theClick'
            },
            listen: {
                'data_update': (data) => {
                    debug.warn('ttttttttttt', data);
                }
            }
        };
        Object.assign(options, opts);
        super(options);
    }
    render() {
        let data = this.options.data || [];
        debug.warn('更新了视图', data);
        let vDom = hx`<div>
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
        // this.remove();
        debug.warn('66666666666');
    }
}
export default ListView;
