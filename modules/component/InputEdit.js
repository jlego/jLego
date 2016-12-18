/*
 * 徽章通用组件类
 * @author: yrh
 * @create: 2016/7/21
 * @update: 2016/7/21
* options: {}
 */
define([
    'lib/view/component/Label',
], function(BaseView) {
    var View = BaseView.extend({
        tagName: 'span',
        className: 'badge',
        initialize: function(option) {
            var that = this,
                defaults = {
                    options: {}
                };
            if (option) $.extend(true, defaults, option);
            this.context = option.context;
            this.parent(defaults);
            this.$el.addClass(this.options.className || 'badge-default');
        }
    });
    return View;
});
