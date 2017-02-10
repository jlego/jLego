class HomeView extends Lego.View {
    constructor(opts = {}) {
        const options = {
            events: {
                'click #400': 'theClick'
            }
        };
        Object.assign(options, opts);
        super(options);
    }
    render() {
        let data = this.options.data || [];
        console.warn('uuuuuuuuuuuuu', data);
        let vDom = hx`
        <div>
          ${data.map((model, i) => {
            return hx`<a href="#/home" style="display:block;">${model.first}</a>\n`
          })}
        </div>`;
        return vDom;
    }
    theClick(event){
        event.stopPropagation();
        // Lego.trigger('data_update', {aa: 1});
    }
}
Lego.components('home', HomeView);
export default HomeView;
