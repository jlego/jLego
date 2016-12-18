/*
 * 布局视图基类
 * @author: yrh
 * @create: 2015/8/1
 * @update: 2016/8/1
*  var config = {
};
 */
define([
    'lib/view/Loader',
    'lib/view/element/Row',
    'lib/view/element/Col'
], function(LoaderView, RowView, ColView) {
    var View = LoaderView.extend({
        initialize: function(option) {
            var that = this;
            this.bindEvent = {}; //事件存放对象
            this.parentId = option.context ? option.context.id : 0;
            this.parent(option);
            if (this.options.startApi) {
                if (this.options.startApi.name) {
                    if (typeof this.model[this.options.startApi.name] == 'function') {
                        this.model[this.options.startApi.name](null, this.options.startApi.options || {});
                    }
                    if (!this.options.startApi.isNotCallback) {
                        HBY.Events.off(null, null, this);
                        HBY.Events.on(this.model.key + ':modelLoad', this.renderAll, this);
                    }
                } else {
                    if (!this.options.isStopRender) this.renderAll();
                }
            } else {
                if (!this.options.isStopRender) this.renderAll();
            }
            this._bindEvent();
        },
        // 渲染视图
        renderAll: function() {
            HBY.Events.off(null, null, this);
            this._renderLayout();
            this._renderWidget();
        },
        // 渲染布局
        _renderLayout: function() {
            var layout = this.options.layout || {},
                that = this;
            if (layout.rows) {
                _.each(layout.rows, function(row, index) {
                    var rowKey = that.id + '_row_' + index;
                    if (!row.className) row.className = 'row';
                    HBY.view.create({
                        key: rowKey,
                        el: that.$el,
                        view: RowView,
                        context: that,
                        options: row
                    });
                    if (row.cols) {
                        var colCount = row.cols.length;
                        if (colCount > 12) colCount = 12;
                        _.each(row.cols, function(theCol, i) {
                            var colKey = rowKey + '-col_' + i;
                            if (!theCol.className) theCol.className = 'col-md-' + 12 / colCount;
                            HBY.view.create({
                                key: colKey,
                                el: '#' + rowKey,
                                view: ColView,
                                context: that,
                                options: theCol
                            });
                        });
                    }
                });
            }
        },
        // 渲染插件
        _renderWidget: function() {
            var widgets = this.options.widgets || [],
                that = this;
            if (widgets.length) {
                _.each(widgets, function(widget, index) {
                    if (typeof widget == 'string') {

                    } else {
                        widget.context = that;
                        HBY.createView(widget);
                        if (widget.binds) {
                            _.each(widget.binds, function(val, key) {
                                if (that.bindEvent[key]) {
                                    that.bindEvent[key].push(val);
                                } else {
                                    that.bindEvent[key] = [val];
                                }
                            });
                        }
                    }
                });
            }
        },
        // 绑定事件
        _bindEvent: function() {
            var that = this;
            _.each(this.bindEvent, function(val, key) {
                if (!that[key]) {
                    that[key] = function(data) {
                        _.each(that.bindEvent[key], function(val, index) {
                            var newVal = that.id + ':' + val;
                            HBY.Events.trigger(newVal, data);
                        });
                    };
                }
                HBY.Events.on(that.id + ':' + key, that[key], that);
            });
        },
        // 触发事件
        trigger: function(event) {
            var thisId = this.id,
                data = arguments.callee.caller.arguments,
                method = arguments.callee.caller.__name;
            _.each(this.bindEvent[method], function(val, index) {
                if (event) {
                    if (event == val) HBY.Events.trigger(thisId + ':' + event, data[0]);
                } else {
                    HBY.Events.trigger(thisId + ':' + val, data[0]);
                }
            });
        }
    });
    return View;
});
