// 界面框架入口
import mainView from './main';
import menuView from './menu';

Lego.create(mainView, {
    el: 'body',
    components: [{
    	el: '#sidebar',
        scrollbar: true
    }]
});
Lego.startApp();