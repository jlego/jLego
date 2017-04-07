import homeView from './view/home';
import listView from './view/list';
import listData from './data/list';

class Router {
    constructor() {
        return {
            '/test': this.index,
            '/test/list': [this.test, this.tabs]
        };
    }
    test(ctx, next){
        next();
    }
    index(){
        console.warn('7777777777777');
        Lego.create(listView, {
            el: Lego.config.pageEl,
            dataSource: {
                api: ['gg', 'ff'],
                server: listData
            }
        });
    }
    tabs(){
        Lego.create(listView, {
            el: Lego.config.pageEl,
            data: {
                list: [
                    { first: 'home', last: '99999' },
                    { first: 'test', last: 'mmmmm' }
                ]
            },
            components: [{
                el: '#home',
                data: [
                    { first: 'home2', last: '999992' },
                    { first: 'test2', last: 'mmmmm2' }
                ]
            }, {
                el: '#test',
                data: [
                    { first: 'home3', last: '999993' },
                    { first: 'test3', last: 'mmmmm3' }
                ]
            }]
        });
    }
}
Lego.router(new Router());
