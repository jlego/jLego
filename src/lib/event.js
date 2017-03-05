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
    on(eventName, callback) {
        if(eventName){
            if(typeof callback !== 'function') return;
            let eventFunName = Symbol(callback.name).toString();
            // 事件命名空间
            if(eventName.indexOf('.') >= 0){
                let eventsArr = eventName.split('.');
                eventName = eventsArr.shift();
                eventFunName = eventsArr.join('.');
            }
            if(this.listener.has(eventName)){
                let listenerMap = this.listener.get(eventName);
                if(listenerMap.has(eventFunName)){
                    let listenerArr = listenerMap.get(eventFunName);
                    listenerArr.push(callback);
                }else{
                    listenerMap.set(eventFunName, [callback]);
                }
            }else{
                let listenerMap = new Map();
                listenerMap.set(eventFunName, [callback]);
                this.listener.set(eventName, listenerMap);
            }
        }
    }
    /**
     * [off 解绑事件]
     * @param  {[type]} eventName [description]
     * @return {[type]}           [description]
     */
    off(eventName){
        if(eventName){
            if(eventName.indexOf('.') >= 0){
                let eventsArr = eventName.split('.');
                eventName = eventsArr.shift();
                eventFunName = eventsArr.join('.');
                if(this.listener.has(eventName)){
                    let listenerMap = this.listener.get(eventName);
                    if(listenerMap.has(eventFunName)){
                        listenerMap.delete(eventFunName);
                    }
                }
            }else{
                if(this.listener.has(eventName)){
                    this.listener.delete(eventName);
                }
            }
        }else{
            this.listener.clear();
        }
    }
    /**
     * [trigger 触发事件]
     * @param  {[type]} eventName [description]
     * @return {[type]}           [description]
     */
    trigger(...args) {
        if(args.length){
            let eventName = args.shift(),
                eventFunName = '';
            if(eventName.indexOf('.') >= 0){
                let eventsArr = eventName.split('.');
                eventName = eventsArr.shift();
                eventFunName = eventsArr.join('.');
            }
            if(this.listener.has(eventName)){
                let listenerMap = this.listener.get(eventName);
                if(eventFunName){
                    let listenerArr = listenerMap.get(eventFunName);
                    listenerArr.forEach(listener => {
                        if(typeof listener == 'function') listener.apply(this, args);
                    });
                }else{
                    listenerMap.forEach((listenerArr, key) => {
                        listenerArr.forEach(listener => {
                            if(typeof listener == 'function') listener.apply(this, args);
                        });
                    });
                }
            }
        }
    }
}
export default Event;