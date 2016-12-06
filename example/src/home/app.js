import homeView from './homeView';
import listView from './listView';
import dataList from './listData';

class HomeRouter {
    constructor() {
        return {
            '/home': [this.list],
            '/home/list': this.list,
            '/home/detail/:id': this.detail,
        };
    }
    home() {
        // console.warn('kkkkkkkkk');
        HBY.create({
            view: listView,
            id: 20,
            data: [
                { first: 'home', last: 'Bond' },
                { first: 'test', last: 'bbbb' },
            ],
            items: [{
                el: '#home',
                view: homeView,
                id: 30,
                data: [
                    { first: 'home2', last: 'Bond2' },
                    { first: 'test2', last: 'bbbb2' },
                ]
            }, {
                el: '#test',
                view: homeView,
                id: 40,
                data: [
                    { first: 'home3', last: 'Bond3' },
                    { first: 'test3', last: 'bbbb3' },
                ]
            }]
        });
        // console.warn(Array.isArray([1,2]));
        // new homeView({ id: 20 });
    }
    list() {
        dataList.fetchData(['test', 'ok'], (resp) => {
            let data = HBY.currentDatas().get('test').data;
            console.warn('dddddddddddddd', resp, HBY.currentDatas().get('test'));
            HBY.create({
                view: listView,
                id: 20,
                data: data
            });
        });
    }
    detail(id) {
        console.warn('pppppppppp');
    }
}
HBY['app'] = new HomeRouter();