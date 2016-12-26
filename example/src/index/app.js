// 界面框架入口
import mainView from './main';
import menuView from './menu';

HBY.components('menu', menuView);
HBY.create(mainView, {
    el: 'body',
    components: [{
    	el: '#sidebar',
        scrollbar: true
    }]
});
HBY.startApp();