/*
 * 单选列表通用组件类
 * @author: yrh
 * @create: 2016/8/25
 * @update: 2016/8/25
* options: {}
 */
define([
    'lib/view/View',
    'lib/view/element/Label',
    'lib/view/element/Input',
], function(BaseView, LabelView, InputView) {
    var View = BaseView.extend({
        initialize: function(option) {
            var that = this,
                defaults = {
                    options: {
                        type: 'radio',
                        name: '',
                        data: []
                    }
                };
            if (option) $.extend(true, defaults, option);
            this.context = option.context;
            this.parent(defaults);
            if(this.options.data.length){
                _.each(this.options.data, function(val, index) {
                    var theId = that.id + '_label_' + index;
                    val.name = that.options.name;
                    val.type = that.options.type;
                    val.attr = val.attr || {};
                    var theText = val.text || val.html;
                    if(val.text) delete val.text;
                    if(val.html) delete val.html;
                    if(val.checked) val.attr.checked = 'checked';
                    HBY.view.create({
                        key: theId,
                        el: that.$el,
                        context: that,
                        view: LabelView,
                        options: {
                            className: 'radio-inline',
                            html: [{
                                key: theId + '_radio',
                                view: InputView,
                                options: val
                            }, theText]
                        }
                    })
                });
            }
        }
    });
    return View;
});
