class Event {
    constructor(opts = {}) {
        const that = this;
        this.listener = new Map();
    }
    /**
     * [on 注册事件]
     * @param  {[type]}   eventName [description]
     * @param  {Function} callback  [description]
     * @return {[type]}             [description]
     */
    on(eventName, callback, context) {
        if(eventName){
            if(typeof callback !== 'function') return;
            if(context) callback = callback.bind(context);
            let key = context || Symbol(),
                callbackObj = {callback: callback};
            if(this.listener.has(eventName)){
                let listenerMap = this.listener.get(eventName);
                if(listenerMap.has(key)){
                    let listenerArr = listenerMap.get(key);
                    listenerArr.push(callbackObj);
                }else{
                    listenerMap.set(key, [callbackObj]);
                }
            }else{
                let listenerMap = new Map();
                listenerMap.set(key, [callbackObj]);
                this.listener.set(eventName, listenerMap);
            }
        }
    }
    /**
     * [off 解绑事件]
     * @param  {[type]} eventName [description]
     * @return {[type]}           [description]
     */
    off(eventName, callback, context){
        if(!eventName && !callback && !context){
            this.listener.clear();
        }else if(!eventName && !callback && context){
            this.listener.forEach((listenerMap, eventName) => {
                listenerMap.delete(context);
            });
        }else if(!eventName && callback && !context){
            this.listener.forEach((listenerMap, eventName) => {
                listenerMap.forEach((listenerArr, key) => {
                    listenerArr = listenerArr.filter(item => item.callback !== callback);
                });
            });
        }else if(!eventName && callback && context){
            this.listener.forEach((listenerMap, eventName) => {
                let listenerArr = listenerMap.get(context);
                if(listenerArr){
                    listenerArr = listenerArr.filter(item => item.callback !== callback);
                }
            });
        }else if(eventName && !callback && !context){
            if(this.listener.has(eventName)) this.listener.delete(eventName);
        }else if(eventName && !callback && context){
            let listenerMap = this.listener.get(eventName);
            if(listenerMap) listenerMap.delete(context);
        }else if(eventName && callback && !context){
            let listenerMap = this.listener.get(eventName);
            if(listenerMap) {
                listenerMap.forEach((listenerArr, key) => {
                    listenerArr = listenerArr.filter(item => item.callback !== callback);
                });
            }
        }else if(eventName && callback && context){
            let listenerMap = this.listener.get(eventName);
            if(listenerMap) {
                let listenerArr = listenerMap.get(context);
                if(listenerArr){
                    listenerArr = listenerArr.filter(item => item.callback !== callback);
                }
            }
        }
    }
    /**
     * [trigger 触发事件]
     * @param  {[type]} eventName [description]
     * @return {[type]}           [description]
     */
    trigger(...args) {
        if(args.length){
            let eventName = args.shift();
            if(this.listener.has(eventName)){
                let listenerMap = this.listener.get(eventName);
                listenerMap.forEach((listenerArr, key) => {
                    listenerArr.forEach(item => {
                        if(typeof item.callback == 'function') item.callback.apply(this, args);
                    });
                });
            }
        }
    }
}
export default Event;
