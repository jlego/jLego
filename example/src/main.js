import Lego from '../../dist/lego';  //调试
// import Lego from 'lego-core';  //发布

Lego.setting({
    version: '20161202', //版本号
    pageEl: '#page-container', //页面渲染容器
    defaultApp: 'home', //默认应用
    rootUri: '/example/dist/', //根目录
    routeRoot: '/example/#'  //路由根地址
});
Lego.startApp('index');
