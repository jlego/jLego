// import BaseData from '../../../dist/data';

class ListData extends HBY.Data {
    constructor(options = {}) {
        const api = {
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
        HBY.$.extend(true, api, options);
        super(api);
    }
    parse(data){
        return data;
    }
}
export default new ListData();
