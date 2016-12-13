import homeView from './view/home';
import listView from './view/list';
import listData from './data/list';

HBY.router = {
    '/home' () {
        HBY.create({
            view: listView,
            dataSource: {
                api: ['test', 'ok'],
                server: listData
            }
        });
    },
    '/home/list' () {
        HBY.create({
            view: listView,
            data: {
                list: [
                    { first: 'home', last: 'Bond' },
                    { first: 'test', last: 'bbbb' },
                ]
            },
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
    },
    '/home/detail/:id' (id) {
        console.warn('pppppppppp');
    }
};