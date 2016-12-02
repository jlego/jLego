import 'babel-polyfill';
import jQuery from 'jquery';
import Lego from '../../dist/lego';
import h from 'virtual-dom/h';
import diff from 'virtual-dom/diff';
import createElement from 'virtual-dom/create-element';
import patch from 'virtual-dom/patch';
// import xhr from 'xhr';

window.HBY = new Lego({
    version: '20161202',
    $: jQuery, //dom操作对象, 必须
    pageEl: '', //页面渲染容器
    defaultApp: 'home', //默认应用
    rootUri: '/test/dist/', //根目录
});

// console.warn(myRouter);

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
