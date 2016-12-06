import 'whatwg-fetch'
import Model from './model';

class Api {
    /**
     * [constructor description]
     * @param  {Object} options [description]
     *  'apiName': {
     *      model: null,    //数据模型
     *      url: '' //接口地址
     *      data: null  //结果数据
     *  },
     * @return {[type]}         [description]
     */
    constructor(options = {}) {
        this.datas = Lego.getDatas();
        for(let key in options){
            if(this.datas.has(key)){
                Lego.util.extend(this.datas.get(key), options[key], true);
            }else{
                this.datas.set(key, options[key]);
            }
        }
    }
    /**
     * [fetchData description]
     * @param  {[type]}   apiNameArr [description]
     * @param  {Function} callback   [description]
     * @return {[type]}              [description]
     */
    fetchData(apiNameArr, callback){
        let that = this;
        apiNameArr = Array.isArray(apiNameArr) ? apiNameArr : [apiNameArr];
        this.__fetch(apiNameArr).then((data) => {
            apiNameArr.forEach((apiName, index)=> {
                if(Array.isArray(data[index])){
                    that.datas.get(apiName).data = data[index];
                }else{
                    if(data[index]) Lego.util.extend(that.datas.get(apiName).data, data[index], true);
                }
            });
            if(typeof callback == 'function') callback(that.parse(data));
        });
    }
    /**
     * [fetchData 异步请求数据]
     * @param  {Object} options [description]
     * @return {[type]}         [description]
     */
    async __fetch(apiNameArr){
        let that = this,
            results = [];
        try {
            // 并发读取远程URL
            let promisesArr = apiNameArr.map(async apiName => {
                let option = that.datas.get(apiName) || {};
                if(option.data && !option.reset){
                    return await option.data;
                }else if(that.datas.has(apiName) && option.url && (!option.data || option.reset)){
                    let req = new Request( option.url, {
                        method: option.method || "GET",
                        headers: option.headers || 'none',
                        mode: 'same-origin', // same-origin|no-cors（默认）|cors
                        credentials: 'include',  //omit（默认，不带cookie）|same-origin(同源带cookie)|include(总是带cookie)
                        body: option.body || undefined
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
     * [parse 格式数据]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    parse(respArr){
        return respArr;
    }
}
export default Api;
