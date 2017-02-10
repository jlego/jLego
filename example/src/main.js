import Lego from '../../dist/lego';  //调试
//import Lego from '../../dist/lego';  //发布

Lego.init({
    version: '20161202', //版本号
    pageEl: '#page-container', //页面渲染容器
    defaultApp: 'home', //默认应用
    rootUri: '/example/dist/', //根目录
});