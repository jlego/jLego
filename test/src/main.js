// import 'babel-polyfill';
import { Router } from 'director';
import $ from 'jquery';
import Lego from '../../dist/lego';
import People from 'test/People';
import MyRouter from 'test/MyRouter';
// window.HBY = Lego;
window.$ = $;

class Home {
    constructor(name) {
        return {
            '/home/:id': this.americas,
            '/home/read/:id': this.china,
        };
    }
    americas(id) {
        let LegoObj = new Lego('dddddddd');
        console.warn(LegoObj.sayhi());
        document.body.innerHTML = 'ee<a href="#/test/3">bbbbbbbbb</a>eee' + id;
        $.ajax({
            type: "GET",
            url: '/test/dist/home/app.js',
            dataType: "script",
            crossDomain: true,
            cache: true,
            success: function(e) {
                console.warn('加载成功 4');
            },
            error: function(e) {
                debug.warn('加载模块失败');
            }
        });
    }
    china(id) {
        document.body.innerHTML = 'hhh<a href="#/home/88">aaaaaaa</a>ggg_' + id;
    }
}

let myRouter = new MyRouter();
let home = new Home();
let container = Object.assign(myRouter, home);
// console.warn(myRouter);
Router(container).configure().init();

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
