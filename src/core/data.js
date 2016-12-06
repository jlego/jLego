import 'whatwg-fetch'
import Model from './model';

class Data {
    constructor(options = {}) {
        let defaults = {
        	model: {},	//数据模型
            urlRoot: '', //接口根地址
            urlType: 1, //1为“?page=1” 只对GET请求有效,2为“/page/1”,
            totalPages: 0, //总页数
            totalCount: 0, //总纪录数
            pageSize: 40, //每页记录数
            currentPage: 1, //当前页码
            pageOffset: 0, //页码偏移量
            pageNums: 10, //页码显示数
        };
        this.options = Object.assign(defaults, options);
    }
    /**
     * [fetch 异步请求数据]
     * @param  {Object} options [description]
     * @return {[type]}         [description]
     */
    async fetch(optionsArr){
        let that = this,
            results = [];
        try {
            // 并发读取远程URL
            const promisesArr = optionsArr.map(async option => {
                let req = new Request(that.options.urlRoot + option.url, {
                    method: option.method || "GET",
                    headers: option.headers || 'none',
                    mode: 'same-origin', // same-origin|no-cors（默认）|cors
                    credentials: 'include',  //omit（默认，不带cookie）|same-origin(同源带cookie)|include(总是带cookie)
                    body: option.body || undefined
                });
                const response = await fetch(req);
                return response.json();
            });
            // return promisesArr;
        } catch (err) {
            debug.log(err);
            // return null;
        }
        // 按次序输出
        for (const promise of promisesArr) {
            results.push(await promise);
        }
        return this.parse(results);
    }
    /**
     * [_parse 格式数据]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    parse(respArr){
        return respArr;
    }
    /**
     * [gotoPage 跳到页]
     * @param  {[type]}   event    [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    gotoPage(e, callback) {
        debug.log("gotoPage");
        if(typeof callback == 'function') callback(e);
        this.fetch();
    }
    /**
     * [nextPage 下一页]
     * @param  {[type]}   event    [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    nextPage(e, callback) {
        debug.log("nextPage");
        ++this.options.currentPage;
        if(typeof callback == 'function') callback(e);
        this.fetch();
    }
    /**
     * [prevPage 上一页]
     * @param  {[type]}   event    [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    prevPage(e, callback) {
        debug.log("prevPage");
        --this.options.currentPage;
        if(typeof callback == 'function') callback(e);
        this.fetch();
    }
    /**
     * [sortColumnsIndex 数据表格列排序]
     * @param  {[type]} data    [description]
     * @param  {[type]} columns [description]
     * @return {[type]}         [description]
     */
    sortColumnsIndex(data, columns = {}){
        function columnsData(name) {
            let col = data.columns;
            return col[name] || {};
        }
        columns.forEach(function(val, index) {
            let valObj = columnsData(val.dataIndex);
            if (!_.isEmpty(valObj)) {
                val.index = valObj.index;
                val.hide = valObj.hide;
                val.style.width = valObj.width || val.style.width;
                if (data.orderField == val.dataIndex) val.sortOrder = data.orderBy;
            }
        });
        return _.sortBy(columns, 'index');
    }
}
export default Data;
