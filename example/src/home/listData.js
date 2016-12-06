import BaseApi from '../../../dist/api';

class ListData extends BaseApi {
    constructor(options = {}) {
        let api = {
            'test': {
                url: './content.json',
                model: {}
            },
            'ok': {
                url: './content.json'
            }
        };
        HBY.util.extend(api, options, true);
        super(api);
    }
}
export default new ListData();
