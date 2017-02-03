// import 'whatwg-fetch'
class Data {
    /**
     * [constructor 构造函数]
     * @param  {Object} options [description]
     *  'apiName': {
     *      model: null,    //数据模型
     *      listTarget: '',  //是列表的目标
     *      url: '' //接口地址
     *      data: null  //结果数据
     *  },
     * @return {[type]}         [description]
     */
    constructor(opts = {}) {
        this.datas = new Map();
        this.Eventer = Lego.Eventer;
        for(let key in opts){
            this.datas.set(key, {});
        }
        this.options = opts;
    }
    /**
     * [fetch 加载数据接口]
     * @param  {[type]}   apiNameArr [description]
     * @param  {Function} callback   [description]
     * @return {[type]}              [description]
     */
    fetch(apis, opts, callback){
        let that = this,
            apiArr = Array.isArray(apis) ? apis : [apis];
        this.__fetch(apis, opts).then((result) => {
            apiArr.forEach((apiName, index)=> {
                that.datas.set(apiName, result[index]);
            });
            if(typeof callback == 'function') callback(that.parse(result, apiArr.join('_'), opts.view));
        });
    }
    /**
     * [fetchData 异步请求数据]
     * @param  {Object} options [description]
     * @return {[type]}         [description]
     */
    async __fetch(apis, opts){
        let that = this,
            results = [],
            apiArr = Array.isArray(apis) ? apis : [apis],
            view = !Lego.isEmptyObject(opts) ? opts.view : null;
        try {
            // 并发读取远程URL
            let promisesArr = apiArr.map(async apiName => {
                let data = that.datas.get(apiName) || {},
                    option = Lego.extend({reset: true}, that.options[apiName] || {}, view ? (view.options.dataSource[apiName] || {}) : {}, opts || {});
                if(!Lego.isEmptyObject(data) && !option.reset){
                    // 取缓存数据
                    return await data;
                }else if(that.datas.has(apiName) && option.url && (Lego.isEmptyObject(data) || option.reset)){
                    let headers = option.headers || { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" };
                    let theBody = Object.assign({}, option.body ? option.body : {});
                    if(headers["Content-type"] == "application/x-www-form-urlencoded; charset=UTF-8"){
                        if(theBody && typeof theBody === 'object'){
                            for(let key in theBody){
                                if(typeof theBody[key] === 'object'){
                                    theBody[key] = JSON.stringify(theBody[key]);
                                }
                            }
                            theBody = Lego.param(theBody);
                        }
                    }
                    // 取新数据
                    let req = new Request( option.url, {
                        method: option.method || "GET",
                        headers: headers,
                        mode: 'same-origin', // same-origin|no-cors（默认）|cors
                        credentials: 'include',  //omit（默认，不带cookie）|same-origin(同源带cookie)|include(总是带cookie)
                        body: option.method == 'POST' ? theBody : undefined
                    });
                    let response = await fetch(req);
                    return response.json();
                }
            });
            // 按次序输出
            for (let promise of promisesArr) {
                let res = await promise;
                results.push(res);
            }
        } catch (err) {
            debug.log(err);
        }
        return results;
    }
    /**
     * [parse 组装数据]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    parse(datas, apiName, view){
        if(typeof this[apiName] == 'function') return this[apiName](datas, view);
        return datas;
    }
    /**
     * [getData 取数据]
     * @return {[type]} [description]
     */
    getData(apiName) {
        if(apiName){
            return this.datas.get(apiName) ? this.datas.get(apiName) : {};
        }else{
            return this.datas;
        }
    }
}
export default Data;
