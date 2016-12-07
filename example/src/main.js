import jQuery from 'jquery';
import Lego from '../../dist/lego';

new Lego({
    alias: 'HBY', //框架实例别名
    version: '20161202', //版本号
    $: jQuery, //dom操作对象, 必须
    pageEl: '#content', //页面渲染容器
    defaultApp: 'home', //默认应用
    rootUri: '/example/dist/', //根目录
}).loadApp();