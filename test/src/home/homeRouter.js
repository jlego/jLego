class HomeRouter {
    constructor(name) {
        return {
            '/home/:id': this.americas,
            '/home/read/:id': this.china,
        };
    }
    americas(id) {
        document.body.innerHTML = 'hhh<a href="#/home/88">aaaaaaa</a>ggg_' + id;
    }
    china(id) {
        let leftNode = h("div.foo#dd", h('a', { href: '#/test/88' }, 'home'));

        let rootNode = createElement(leftNode);
        document.body.appendChild(rootNode);

        // let patches = diff(leftNode, rightNode);
        // patch(rootNode, patches);
    }
}
export default HomeRouter;
HBY['router.home'] = new HomeRouter();