class ListView extends HBY.View {
    constructor(opts = {}) {
        const options = {
            events: {
                'click #test': 'theClick'
            },
            listen: {
                'data_update': (data) => {
                    debug.warn('pppppppppp', data);
                }
            }
        };
        HBY.$.extend(true, options, opts);
        super(options);
    }
    render() {
        let data = this.options.data.data || [],
            vDom = [];

        debug.warn('更新了视图', data);
        data.forEach((model, i) => {
            vDom.push(h('a#' + model.first, {
                href: '#/home/list',
                style: {
                    display: 'block'
                }
            }, [model.last]));
        });
        return vDom;
    }
    theClick(event){
        debug.warn('66666666666');
    }
}
export default ListView;
