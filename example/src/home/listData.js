import BaseData from '../../../dist/data';

class ListData extends BaseData {
    constructor(options = {}) {
        let api = {
            'test': {
                url: './content.json',
                listTarget: 'data',
                model: {
                    first: '',
                    last: '',
                    id: 0
                }
            },
            'ok': {
                url: './content.json'
            }
        };
        HBY.$.extend(true, api, options);
        super(api);
    }
}
export default new ListData();
