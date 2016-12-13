// import 'whatwg-fetch'
class Data {
    /**
     * [constructor description]
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
            this.datas.set(key, opts[key]);
            this.datas.get(key).data = {};
        }
    }
    /**
     * [setOptions description]
     * @param  {[type]} apiName [description]
     * @param  {Object} opts    [description]
     * @return {[type]}         [description]
     */
    setOptions(apiName, opts = {}) {
        // console.log('setter: ' + value);
        if(!this.datas.get(apiName)) return this;
        const newOpts = $.extend(true, this.datas.get(apiName), opts);
        this.datas.set(apiName, newOpts);
        return this;
    }
    /**
     * [load 加载数据]
     * @param  {[type]}   apiNameArr [description]
     * @param  {Function} callback   [description]
     * @return {[type]}              [description]
     */
    load(apiNameArr, callback){
        let that = this;
        apiNameArr = Array.isArray(apiNameArr) ? apiNameArr : [apiNameArr];
        this.__fetch(apiNameArr).then((data) => {
            apiNameArr.forEach((apiName, index)=> {
                let apiResp = data[index];
                that.datas.get(apiName).data = apiResp;
                // 添加模型数据
                if(apiResp && !Array.isArray(apiResp)){
                    let listTarget = that.datas.get(apiName).listTarget,
                        model = that.datas.get(apiName).model,
                        datas = that.datas.get(apiName).data;
                    if(listTarget && Array.isArray(apiResp[listTarget]) && model){
                        apiResp[listTarget].forEach(function(item, i){
                            datas[listTarget][i] = Lego.$.extend({}, model, item);
                        });
                    }
                }
                // that.Eventer.emit(apiName + '_data', apiResp);
            });

            if(typeof callback == 'function') callback(that.parse(data));
        });
        // return this.datas;
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
                if(!Lego.$.isEmptyObject(option.data) && !option.reset){
                    return await option.data;
                }else if(that.datas.has(apiName) && option.url && (Lego.$.isEmptyObject(option.data) || option.reset)){
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
export default Data;
