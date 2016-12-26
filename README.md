![preview](https://github.com/jlego/legojs/blob/master/lego-logo.png)

Component web front-end development framework

virtual-dom + ES6 + Router + Components + sass/less + babel


# Install
You can install it via npm:

```html
npm install -S lego-core
```

# Instantiation
Create the application entry file `/src/main.js`
```javascript
import jQuery from 'jquery';
import Lego from 'lego-core';
Lego.init({
    alias: 'Lego', //Lego instance alias
    version: '20161202', //The version number of the release
    $: jQuery, //Dom operation library
    pageEl: '#container', //Page rendering container
    defaultApp: 'home', //The application launches module by default
    rootUri: '/example/dist/', //Root directory
})
Lego.startApp('index');  //Launch the main page application
```
Get the global parameters, E.g `Lego.config.pageEl`

# View/Component
Create a file `/src/home/view/home.js` 
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
        return hx`
	  <button id="button">${this.options.data.buttonText}</button>
	    <item id="theId"></item>    //the component replace this tag and be rendered to here;
	    `;
    }
    theClick(event){
        console.log('You clicked this button');
    }
}
export default Home;
```
# dataSource
Create a file `/src/home/data/home.js` 
```javascript
class HomeData extends Lego.Data {
    constructor(opts = {}) {
        const options = {
            'apiName_a': {
                url: './content.json',
                listTarget: 'data',  //If it is a list of data
                model: {	//for set the default model data value
                    first: '',
                    last: '',
                    id: 0
                },
                // reset: true   //Whether to re-pull the remote data， yes is 'true'
            },
            'apiName_b': {
                url: './content.json'
            }
	    ...
        };
        Object.assign(options, opts);
        super(options);
    }
    //return format data
    parse(datas) {
        return datas[0].data;
    }
}
export default HomeData;
```

# Router
Create a file `/src/home/app.js` , this is home module entrance
```javascript
import homeView from './view/home';
import itemView from './view/item';
import homeData from './data/home';
Lego.components('item', itemView);   //Register component;
Lego.router({
    '/home' () {
        const viewObj = Lego.create(homeView, {
        	el: '#container', //There is no such attribute，the default is Lego.config.pageEl
            data: {  //Modifying the data property will trigger the view update
            	buttonText: 'click me'
            },
	    ... //You can customize the parameters too, use "viewObj.options[attributeName]" get the attribute
            components: [{
            	el: '#theId',
	            dataSource: {   //dynamic data
		    	  api: ['apiName_a', 'apiName_b'],   //Data dependencies, cacheable
			      server: homeData
		        },
	            components: []
            }]
        });
    }
});
```
#Build the project
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
