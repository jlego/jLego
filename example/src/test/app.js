HBY.router = {
    '/test/:id' (id) {
        HBY.$(HBY.config.pageEl).html('hhh<a href="#/home/88">aaaaaaa</a>ggg_' + id);
    },
    '/test/read/:id' (id) {
        HBY.$(HBY.config.pageEl).html('hhh<a href="#/home/88">aaaaaaa</a>ggg_' + id);
    }
};