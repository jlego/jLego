import mainView from './mainView';

class MainRouter {
    constructor() {
        this.index();
    }
    index() {
        // dataList.api(['test', 'ok'], (resp) => {
        //     let data = HBY.getData('test').data;
            HBY.create({
                alias: 'main',
                el: 'body',
                view: mainView,
                // id: 20,
                // data: data
            });
        // });
        HBY.startApp();
    }
}
HBY.router = new MainRouter();
