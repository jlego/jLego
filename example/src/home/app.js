import homeView from './homeView';
import listView from './listView';

class HomeRouter {
    constructor() {
        return {
            '/home': [this.list, this.home],
            '/home/list': this.list,
            '/home/detail/:id': this.detail,
        };
    }
    home() {
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
        // new homeView({ id: 20 });
    }
    list() {
        console.warn('dddddddddddddd');
    }
    detail(id) {
        console.warn('pppppppppp');
    }
}
HBY['app'] = new HomeRouter();