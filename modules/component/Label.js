/*
 * 标签通用组件类
 * @author: yrh
 * @create: 2016/7/21
 * @update: 2016/7/21
* options: {}
 */
define([
    'lib/view/View',
], function(BaseView) {
    var View = BaseView.extend({
        tagName: 'span',
        className: 'label',
        initialize: function(option) {
            var that = this,
                defaults = {
                    options: {}
                };
            if (option) $.extend(true, defaults, option);
            this.context = option.context;
            this.parent(defaults);
            this.$el.addClass(this.options.className || 'label-default');
        }
    });
    return View;
});
