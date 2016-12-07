import homeView from './homeView';
import listView from './listView';
import dataList from './listData';

class HomeRouter {
    constructor() {
        return {
            '/home': [this.list],
            '/home/list': this.home,
            '/home/detail/:id': this.detail,
        };
    }
    home() {
        HBY.create({
            alias: 'home_1',
            view: listView,
            id: 20,
            data: [
                { first: 'home', last: 'Bond' },
                { first: 'test', last: 'bbbb' },
            ],
            items: [{
                alias: 'home_1_0',
                el: '#home',
                view: homeView,
                id: 30,
                data: [
                    { first: 'home2', last: 'Bond2' },
                    { first: 'test2', last: 'bbbb2' },
                ]
            }, {
                alias: 'home_1_1',
                el: '#test',
                view: homeView,
                id: 40,
                data: [
                    { first: 'home3', last: 'Bond3' },
                    { first: 'test3', last: 'bbbb3' },
                ]
            }]
        });
        // let data = HBY.getData('test').data;
        // data[0].mm = 'only you';
        // console.warn(data);
        // new homeView({ id: 20 });
    }
    list() {
        dataList.api(['test', 'ok'], (resp) => {
            let data = HBY.getData('test').data;
            HBY.create({
                alias: 'list_1',
                view: listView,
                id: 20,
                data: data
            });
            // console.warn('dddddddddddddd', resp, HBY.getData('ok'));
        });
    }
    detail(id) {
        console.warn('pppppppppp');
    }
}
HBY['app'] = new HomeRouter();
