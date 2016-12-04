import homeView from './homeView';

class HomeRouter {
    constructor(name) {
        return {
            '/home/:id': this.home,
            '/home/read/:id': this.detail,
        };
    }
    home(id) {
        new homeView({id: id}); 
    }
    detail(id) {
        
    }
}
export default HomeRouter;
HBY['app'] = new HomeRouter();