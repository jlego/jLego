import homeView from './homeView';

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
            // el: '#content',
            view: homeView,
            id: 20,
            data: [
                { first: 'home1', last: 'Bond' },
                { first: 'test', last: 'bbbb' },
            ],
            items: []
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
