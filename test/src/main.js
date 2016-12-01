import 'babel-polyfill';
import { Router } from 'director';
import $ from 'jquery';
import Lego from '../../dist/lego';
import People from 'test/People';
import h from 'virtual-dom/h';
import diff from 'virtual-dom/diff';
import createElement from 'virtual-dom/create-element';
import patch from 'virtual-dom/patch';
// import xhr from 'xhr';

window.$ = $;
let router;
let LegoObj = new Lego('dddddddd');

class Home {
    constructor(name) {
        return {
            '/home/:id': this.americas,
            '/home/read/:id': this.china,
        };
    }
    americas(id) {
        $.ajax({
            type: "GET",
            url: '/test/dist/home/app.js',
            dataType: "script",
            crossDomain: true,
            cache: true,
            success: function(e) {
                router = Router(window['app']).init();
                document.body.innerHTML = LegoObj.sayhi(id);
            },
            error: function(e) {
                debug.warn('加载模块失败');
            }
        });
    }
    china(id) {
        let leftNode = h("div.foo#dd", h('a', { href: '#/home/88' }, 'home'));

        let rootNode = createElement(leftNode);
        document.body.appendChild(rootNode);

        // let patches = diff(leftNode, rightNode);
        // patch(rootNode, patches);
    }
}

let container = new Home();
router = Router(container).init();
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
