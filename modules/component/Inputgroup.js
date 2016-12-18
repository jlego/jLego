/*
 * 输入框组通用组件类
 * @author: yrh
 * @create: 2016/8/4
 * @update: 2016/8/4
 * options:{
 *      className: 'input-group',
        size: '', //lg, sm
        data: []
 * }
 */
define([
    'lib/view/View'
], function(BaseView) {
    var View = BaseView.extend({
        initialize: function(option) {
            var that = this;
            var defaults = {
                options: {
                    className: 'input-group',
                    size: '', //lg, sm
                }
            };
            if (!option.options.data) {
                defaults.options.data = [{
                    key: option.key + '_input',
                    view: 'element:Input'
                }, {
                    key: option.key + '_span',
                    view: 'element:Span',
                    options: {
                        text: '按钮',
                        className: 'input-group-addon'
                    }
                }];
            }
            if (option) $.extend(true, defaults, option);
            this.context = option.context;
            this.parent(defaults);
            if (!this.options.isStopRender) this.renderAll();
            if (this.options.size) {
                this.$el.addClass('input-group-' + this.options.size)
            }
        },
        renderAll: function() {
            var data = this.options.data,
                that = this;
            if (data.length) {
                if (data.models) {
                    var data = _.pluck(data.models, 'attributes');
                }
                _.each(data, function(item, index) {
                    if (item.key) {
                        item.key = that.id + '_' + item.key;
                        item.el = that.$el;
                        item.context = that;
                        HBY.view.create(item);
                    }
                });
            }
            return this;
        }
    });
    return View;
});
