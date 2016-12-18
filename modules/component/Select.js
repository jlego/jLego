/*
 * 下拉选择通用组件类
 * @author: yrh
 * @create: 2016/7/15
 * @update: 2016/7/15
* options: {
* selected, disabled
}
 */
define([
    'lib/view/View'
], function(BaseView) {
    var View = BaseView.extend({
        tagName: 'select',
        initialize: function(option) {
            var that = this,
                defaults = {
                    options: {
                        className: '',
                        isMultiple: false,
                        placeholder: '',
                        data: []
                    }
                };
            if (option) $.extend(true, defaults, option);
            this.context = option.context;
            this.parent(defaults);
            if (this.options.required) this.$el.attr('required', this.options.required);
            if(!this.options.isStopRender) this.renderAll();
            this.$el.attr('data-placeholder', this.options.placeholder);
                // .prepend('<option value=""></option>');
            if(this.options.isMultiple) this.$el.attr('multiple', '');
        },
        renderAll: function() {
            var that = this;
            if (this.options.data.length) {
                _.each(this.options.data, function(item, index) {
                    if (item.children) {
                        var group = $('<optgroup/>'),
                            optionHtml = '';
                        for (var i = 0; i < item.children.length; i++) {
                            var subItem = item.children[i];
                            optionHtml += '<option value="' + (subItem.value || subItem.text) + '" '
                                + (subItem.selected ? 'selected' : '') + ' '
                                + (subItem.disabled ? 'disabled' : '') + '>' + subItem.text + '</option>';
                        }
                        group.append(optionHtml);
                        group.attr('label', item.text);
                        that.$el.append(group);
                    } else {
                        var option = $('<option/>');
                        option.text(item.text);
                        option.attr('value', item.value || item.text);
                        if(item.selected) option.attr('selected', '');
                        if(item.disabled) option.attr('disabled', '');
                        that.$el.append(option);
                    }
                });
            }
            return this;
        }
    });
    return View;
});
