/*
 * 超链接按钮通用组件类
 * @author: yrh
 * @create: 2016/7/22
 * @update: 2016/7/22
* options: {}
 */
define([
    'lib/view/element/Button',
], function(ButtonView) {
    var View = ButtonView.extend({
        tagName: 'a',
        initialize: function(option) {
            var that = this,
                defaults = {
                    options: {
                        href: '',
                        className: 'btn-link'
                    }
                };
            if (option) $.extend(true, defaults, option);
            this.context = option.context;
            this.parent(defaults);
            if(this.tagName == 'a'){
                this.$el.attr('href', this.options.href || '#');
            }
        }
    });
    return View;
});
