class MyRouter {
    constructor(name) {
        return {
            '/test/:id': this.americas,
            '/test/read/:id': this.china,
        };
    }
    americas(id) {
        document.body.innerHTML = 'ee<a href="#/test/read/3">bbbbbbbbb</a>eee' + id;
    }
    china(id) {
        document.body.innerHTML = 'hhh<a href="#/home/88">aaaaaaa</a>ggg_' + id;
    }
}
export default MyRouter;
window['app'] = new MyRouter();