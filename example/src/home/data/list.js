class ListData extends HBY.Data {
    constructor(opts = {}) {
        const options = {
            'test': {
                url: './content.json',
                listTarget: 'data',
                model: {
                    first: '',
                    last: '',
                    id: 0
                },
                // reset: true
            },
            'ok': {
                url: './content.json'
            }
        };
        HBY.$.extend(true, options, opts);
        super(options);
    }
    parse(data) {
        return data[0].data;
    }
}
export default new ListData();
