
class HomeView {
    constructor(option) {
        this.id = option.id;
        this.render();
    }
    render() {
        HBY.$(HBY.config.pageEl).html('ee<a href="#/test/read/3">bbbbbbbbb</a>eee' + this.id);
    }
}
export default HomeView;