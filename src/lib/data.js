// import 'whatwg-fetch'
class Data {
    /**
     * [constructor 构造函数]
     * @param  {Object} options [description]
     *  'apiName': {
     *      api: '' //接口名称
     *      server: null  //
     *  },
     * @return {[type]}         [description]
     */
    constructor(opts = {}) {
        this.datas = new Map();
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
    fetch(apis, opts, callback, view){
        let that = this,
            apiArr = Array.isArray(apis) ? apis : [apis];
        if(opts.isAjax){
            let apiName = Array.isArray(apis) ? apis[0] : apis;
            let option = Lego.extend({reset: true}, that.options[apiName] || {}, view ? (view.options.dataSource[apiName] || {}) : {}, opts || {});
            if(window.$ || window.jQuery){
                if(option.url.indexOf('http') < 0) option.url = Lego.config.serviceUri + option.url;
                function getData(option, apiName){
                    $.ajax(Lego.extend(option, {
                        success: function(result) {
                            if (result) {
                                that.datas.set(apiName, result);
                                if(typeof callback == 'function') callback(that.parse(result, apiName, view));
                            }
                        },
                        error: function(xhr) {
                            debug.warn("login error: ", xhr);
                        }
                    }));
                }
                if(!Lego.isEmptyObject(this.datas.get(apiName))){
                    if(option.reset){
                        getData(option, apiName);
                    }else{
                        if(typeof callback == 'function') callback(this.parse(this.datas.get(apiName), apiName, view));
                    }
                }else{
                    getData(option, apiName);
                }
            }
        }else{
            this.__fetch(apis, opts, view).then((result) => {
                apiArr.forEach((apiName, index)=> {
                    that.datas.set(apiName, result[index]);
                });
                if(typeof callback == 'function') callback(that.parse(result.length == 1 ? result[0] : result, apiArr.join('_'), view));
            });
        }
    }
    /**
     * [fetchData 异步请求数据]
     * @param  {Object} options [description]
     * @return {[type]}         [description]
     */
    async __fetch(apis, opts, view){
        let that = this,
            results = [],
            apiArr = Array.isArray(apis) ? apis : [apis];
        try {
            // 并发读取远程URL
            let promisesArr = apiArr.map(async apiName => {
                let data = that.datas.get(apiName) || {},
                    option = Lego.extend({reset: true}, that.options[apiName] || {}, view ? (view.options.dataSource[apiName] || {}) : {}, opts || {});
                if(!Lego.isEmptyObject(data) && !option.reset){
                    // 取缓存数据
                    return await data;
                }else if(that.datas.has(apiName) && option.url && (Lego.isEmptyObject(data) || option.reset)){
                    let url = /http/.test(option.url) ? option.url : (Lego.config.serviceUri + option.url);
                    let headers = option.headers || { "Accept": "application/json", "Content-type": "application/json; charset=UTF-8" };
                    let theBody = option.body || {};
                    let method = option.method || "POST";
                    if(method == 'GET'){
                        let params = Lego.param(theBody);
                        if(url.indexOf('?') > 0){
                            url += '&' + params;
                        }else{
                            url += '?' + params;
                        }
                    }
                    // 取新数据
                    let req = new Request( url, {
                        method: method,
                        headers: headers,
                        mode: 'same-origin', // same-origin|no-cors（默认）|cors
                        credentials: 'include',  //omit（默认，不带cookie）|same-origin(同源带cookie)|include(总是带cookie)
                        body: method == 'POST' ? JSON.stringify(theBody) : undefined
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
