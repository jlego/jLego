![preview](https://github.com/jlego/legojs/blob/master/lego-logo.png)

virtual-dom + ES6 + Router + Components + sass/less  ===  Component web front-end development framework

# Install

You can install it via npm:

```html
npm install -S lego-core
```

# Instantiation
Entry `.js` file
```javascript
import jQuery from 'jquery';
import Lego from 'lego-core';
Lego.init({
    alias: 'Lego', //Lego instance alias
    version: '20161202', //The version number of the release
    $: jQuery, //Dom operation library
    pageEl: '#container', //Page rendering container
    defaultApp: 'home', //The application launches by default
    rootUri: '/example/dist/', //Root directory
})
Lego.startApp('index');  //Launch the main page application
```
# View/Component
View file `home.js` 
```javascript
import './asset/home.css';
class Home extends Lego.View {
    constructor(opts = {}) {
        const options = {
            events: {
                'click #button': 'theClick'
            }
        };
        super(options);
    }
    render() {
        return hx`<button id="button">${this.data.buttonText}</button>`;
    }
    theClick(event){
        console.log('You clicked this button');
    }
}
export default Home;
```

# Router
```javascript
import homeView from './view/home';
import itemView from './view/item';
Lego.router({
    '/home' () {
        Lego.create({
        	el: 'body',
            view: homeView,
            data: {
            	buttonText: 'click me'
            },
            components: [{
            	el: '#theId',
	            view: itemView,
	            data: {},
	            components: []
            }]
        });
    }
});
```
#Building
Terminal command
```html
npm run build
```

# Other resources
* [lego-ui.js](https://github.com/jlego/legojs-ui)

# Many thanks to
* [director.js](https://github.com/flatiron/director)
* [events.js](https://github.com/Gozala/events) 
* [hyperx.js](https://github.com/substack/hyperx) 
* [object.observe.js](https://github.com/MaxArt2501/object-observe) 
* [virtual-dom.js](https://github.com/Matt-Esch/virtual-dom) 

# License
This content is released under the [MIT](http://opensource.org/licenses/MIT) License.
