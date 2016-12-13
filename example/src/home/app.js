import homeView from './homeView';
import listView from './listView';
import listData from './listData';

HBY.router = {
    '/home' () {
        // listData.api(['test', 'ok'], (resp) => {
        //     let data = HBY.getData('test');
        //     HBY.create({
        //         view: listView,
        //         data: data
        //     });
        // });
        HBY.create({
            view: listView,
            dataOption: {
                api: 'test',
                auto: true,
                depend: ['ok'],
                source: listData
            }
            // data: 'test'
        });
        // listData.load();
        // console.warn(listData.api(['test', 'ok']).get('test').data);
    },
    '/home/list' () {
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
    '/home/detail/:id' (id) {
        console.warn('pppppppppp');
    }
};