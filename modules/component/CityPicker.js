/*
 * 地区选择通用组件类
 * @author: yrh
 * @create: 2016/11/7
 * @update: 2016/11/7
 * options: {}
 */
define([
    'lib/view/View',
    'citypicker'
], function(BaseView, citypicker) {
    var View = BaseView.extend({
        initialize: function(option) {
            var that = this,
                defaults = {
                    options: {
                        // width: 200,
                        // province: '省',
                        // city: '市',
                        // district: '区'
                    }
                };
            if (option) $.extend(true, defaults, option);
            this.context = option.context;
            this.parent(defaults);
            this.$el.css('position', 'relative');
            var theInputId = option.key + '-input',
                data = {
                    simple: this.options.simple || false,
                    responsive: this.options.responsive || false,
                    placeholder: this.options.placeholder || '选择地区',
                    level: this.options.level || 'district',
                    country: this.options.country || false,
                    province: this.options.province || undefined,
                    city: this.options.city || undefined,
                    district: this.options.district || false
                };
            this.$el.html('<input id="' + theInputId + '" class="form-control" readonly type="text" data-toggle="city-picker">');
            this.$('#' + theInputId).citypicker(data);
            if (this.options.width) {
                this.$('.city-picker-span').width(this.options.width);
            }
            this.$('.city-picker-span').css({
                height: this.options.height || 36,
                lineHeight: this.options.height || 36 + 'px'
            });
        }
    });
    return View;
});
