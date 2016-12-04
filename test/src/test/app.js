
class MyRouter {
    constructor(option) {
        return {
            '/test/:id': this.home,
            '/test/read/:id': this.read,
        };
    }
    home(id) {
        HBY.$(HBY.config.pageEl).html('hhh<a href="#/home/88">aaaaaaa</a>ggg_' + id);
    }
    read(id) {
        HBY.$(HBY.config.pageEl).html('hhh<a href="#/home/88">aaaaaaa</a>ggg_' + id);
    }
}
export default MyRouter;
HBY['app'] = new MyRouter();