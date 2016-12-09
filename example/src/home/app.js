import homeView from './homeView';
import listView from './listView';
import dataList from './listData';

class HomeRouter {
    constructor() {
        return {
            '/home': this.list,
            '/home/list': this.home,
            '/home/detail/:id': this.detail,
        };
    }
    home() {
        HBY.create({
            view: listView,
            id: 20,
            data: {data: [
                { first: 'home', last: 'Bond' },
                { first: 'test', last: 'bbbb' },
            ]},
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
        // console.warn('前', HBY.getView('list_1').options.data.data);
        // HBY.getView('list_1').options.data.status = 300;
            // console.warn('后',HBY.getView('list_1').options.data);
        // let data = HBY.getData('test').data;
        // data[0].mm = 'only you';
        // console.warn(data);
        // new homeView({ id: 20 });
    }
    list() {
        dataList.api(['test', 'ok'], (resp) => {
            let data = HBY.getData('test');
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
HBY.router = new HomeRouter();
