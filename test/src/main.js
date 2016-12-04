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

// let s = Symbol();
// let f = Symbol();
// let a = {};
// a[s] = 'cccc';
// console.warn(a[s], s.toString());

// let arr = ['a', 'b', 'c'];
// let iter = arr[Symbol.iterator]();

// console.warn(iter.next());
// console.warn(iter.next());
// console.warn(iter.next());
// console.warn(iter.next());

// function* helloWorldGenerator() {
//     yield 'hello';
//     yield 'world';
//     return 'ending';
// }

// var hw = helloWorldGenerator();

// console.warn(hw.next());
// console.warn(hw.next());
// console.warn(hw.next());
