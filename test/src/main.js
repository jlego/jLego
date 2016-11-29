import 'babel-polyfill';
import page from 'page';
import Lego from '../../dist/lego';
import People from 'test/People';
// import EventClass from "event-class";
// let EventClass = require("event-class");
// import People from 'winbonshello';
// page.base('/#!');
page('/home/:id', (ctx, next) => {
    let p = new People("Tom6");
    // document.write(p.sayhi() + '<br/>');
    document.body.innerHTML = 'hhh<a href="/test/88">gggggggg</a>ggg_' + ctx.params.id;
    // page.redirect('/test/88');
    // next();
});

page('/test/:id', (ctx, next) => {
    document.body.innerHTML = 'ee<a href="/home/20">eeeeee</a>eee' + ctx.params.id;
    // next();
});

page('/test2/:id', (ctx, next) => {
    document.body.innerHTML = 'ee<a href="/home/20">uuuuuuuuu</a>eee' + ctx.params.id;
    // next();
});

page('*', (ctx, next) => {
    document.body.innerHTML = '无';
});

page.exit('*', (ctx, next) => {
    document.body.innerHTML = '切换中...';
    next();
})

page({
    hashbang: true
});

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

let LegoObj = new Lego('dddddddd');
console.warn(LegoObj.sayhi());

// let anyObject = new EventClass();

// function namedFunction(data){
//     console.log("change event :", data);
// }

// // Listen to the 'change' event
// anyObject.on("change", namedFunction);
// anyObject.trigger("change:attribute", "Hello 3 !");