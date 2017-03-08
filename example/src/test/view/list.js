class ListView extends Lego.View {
    constructor(opts = {}) {
        const options = {
            // events: {
            //     'click #test': 'theClick'
            // },
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
        let vDom = hx`
        <div class="page-container" id="page-container">
          ${data.map((model, i) => {
            return hx`<a id="${model.first}" href="javascript:;" onclick=${this.theClick.bind(this)} style="display:block;">${model.last}</a>\n`
          })}
        </div>`;
        return vDom;
    }
    theClick(event){
        debug.warn('66666666666');
        Lego.Eventer.trigger('data_update', {aa: 1}, 66);
    }
}
Lego.components('list2', ListView);
export default ListView;
