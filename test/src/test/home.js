import page from 'page';
import People from 'test/People';
// import People from 'winbonshello';
// page.base('/#!');
page('/home/:id', (ctx, next) => {
    let p = new People("Tom6");
    // document.write(p.sayhi() + '<br/>');
    document.body.innerHTML = 'hhh<a href="/test/88">aaaaaaa</a>ggg_' + ctx.params.id;
    // page.redirect('/test/88');
});

page('/test/:id', (ctx, next) => {
    document.body.innerHTML = 'ee<a href="/home/20">bbbbbbbbb</a>eee' + ctx.params.id;
});

page('/test2/:id', (ctx, next) => {
    document.body.innerHTML = 'ee<a href="/home/20">cccccccc</a>eee' + ctx.params.id;
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