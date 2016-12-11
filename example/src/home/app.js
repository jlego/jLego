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
            id: 'home',
            view: listView,
            data: {data: [
                { first: 'home_el', last: 'Bond' },
                { first: 'test_el', last: 'bbbb' },
            ]},
            items: [{
                id: 'home_1',
                el: '#home_el',
                view: homeView,
                data: [
                    { first: 'home2', last: 'Bond2' },
                    { first: 'test2', last: 'bbbb2' },
                ]
            }, {
                id: 'home_2',
                el: '#test_el',
                view: homeView,
                data: [
                    { first: 'home3', last: 'Bond3' },
                    { first: 'test3', last: 'bbbb3' },
                ]
            }]
        });
    }
    list() {
        dataList.api(['test', 'ok'], (resp) => {
            let data = HBY.getData('test');
            HBY.create({
                id: 'list',
                view: listView,
                data: data
            });
        });
    }
    detail(id) {
        console.warn('pppppppppp');
    }
}
HBY.router = new HomeRouter();
