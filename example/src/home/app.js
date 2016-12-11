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
            data: {data: [
                { first: 'home', last: 'Bond' },
                { first: 'test', last: 'bbbb' },
            ]},
            components: [{
                el: '#home',
                view: homeView,
                data: [
                    { first: 'home2', last: 'Bond2' },
                    { first: 'test2', last: 'bbbb2' },
                ]
            }, {
                el: '#test',
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
