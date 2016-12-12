import homeView from './homeView';
import listView from './listView';
import dataList from './listData';

HBY.router = {
    '/home'() {
        dataList.api(['test', 'ok'], (resp) => {
            let data = HBY.getData('test');
            HBY.create({
                view: listView,
                data: data
            });
        });
    },
    '/home/list'() {
        HBY.create({
            view: listView,
            data: {
                data: [
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
    '/home/detail/:id'(id) {
        console.warn('pppppppppp');
    }
};