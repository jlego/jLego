import jQuery from 'jquery';
import Lego from '../../dist/lego';

new Lego({
    alias: 'HBY',
    version: '20161202',
    $: jQuery, //dom操作对象, 必须
    pageEl: '#content', //页面渲染容器
    defaultApp: 'home', //默认应用
    rootUri: '/test/dist/', //根目录
}).loadApp();
