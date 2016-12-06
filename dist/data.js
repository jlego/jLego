/**
 * lego.js v0.0.6
 * (c) 2016 Evan You
 * @license MIT
 */
"use strict";

var whatwgFetch = require("whatwg-fetch");

var Data = function Data(options) {
    if (options === void 0) options = {};
    var defaults = {
        model: {},
        urlRoot: "",
        urlType: 1,
        totalPages: 0,
        totalCount: 0,
        pageSize: 40,
        currentPage: 1,
        pageOffset: 0,
        pageNums: 10
    };
    this.options = Object.assign(defaults, options);
};

Data.prototype.parse = function parse(respArr) {
    return respArr;
};

Data.prototype.gotoPage = function gotoPage(e, callback) {
    debug.log("gotoPage");
    if (typeof callback == "function") {
        callback(e);
    }
    this.fetch();
};

Data.prototype.nextPage = function nextPage(e, callback) {
    debug.log("nextPage");
    ++this.options.currentPage;
    if (typeof callback == "function") {
        callback(e);
    }
    this.fetch();
};

Data.prototype.prevPage = function prevPage(e, callback) {
    debug.log("prevPage");
    --this.options.currentPage;
    if (typeof callback == "function") {
        callback(e);
    }
    this.fetch();
};

Data.prototype.sortColumnsIndex = function sortColumnsIndex(data, columns) {
    if (columns === void 0) columns = {};
    function columnsData(name) {
        var col = data.columns;
        return col[name] || {};
    }
    columns.forEach(function(val, index) {
        var valObj = columnsData(val.dataIndex);
        if (!_.isEmpty(valObj)) {
            val.index = valObj.index;
            val.hide = valObj.hide;
            val.style.width = valObj.width || val.style.width;
            if (data.orderField == val.dataIndex) {
                val.sortOrder = data.orderBy;
            }
        }
    });
    return _.sortBy(columns, "index");
};

module.exports = Data;
