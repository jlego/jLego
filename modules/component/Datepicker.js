/*
 * 日期选择器通用组件类
 * @author: yrh
 * @create: 2016/9/6
 * @update: 2016/9/6
* options: {
}
 */
define([
    'lib/view/View',
    'lib/view/element/Input',
    'datetimepicker'
], function(BaseView, InputView) {
    var TemplateRange = ['<div class="input-group input-daterange datepicker date">',
        '<input type="text" class="form-control startDate">',
        '<span class="input-group-addon"><i class="glyphicon glyphicon-arrow-right"></i></span>',
        '<input type="text" class="form-control endDate">',
        '</div>'
    ].join('');
    var TemplateSingle = ['<div class="input-group date">',
        '<span class="input-group-addon"><span class="<%= !_.isEmpty(setting.icons) ? (setting.format == "LT" ? setting.icons.time : setting.icons.date) : ("glyphicon glyphicon-" + (setting.format == "LT" ? "time" : "calendar")) %>"></span></span>',
        '</div>'
    ].join('');
    var View = BaseView.extend({
        className: 'bootstrap-datetimepicker-widget',
        templateRange: _.template(TemplateRange),
        templateSingle: _.template(TemplateSingle),
        asset: {
            css: {
                'datetimepicker': '/js/lib/vendor/ui/bootstrap-datetimepicker/bootstrap-datetimepicker.css'
            }
        },
        initialize: function(option) {
            var that = this,
                defaults = {
                    options: {
                        input: {
                            type: 'text',
                            width: '100%',
                            className: 'form-control',
                            placeholder: '',
                            name: '',
                            disabled: false,
                            readonly: false
                        },
                        isRange: false, //是否范围类型
                        startInput: { //开始时间输入框
                            selector: '',
                            name: 'startDate',
                            placeholder: '开始时间',
                        },
                        endInput: { //结束时间输入框
                            selector: '',
                            name: 'endDate',
                            placeholder: '结束时间',
                            useCurrent: false, //Important! See issue #1075
                        },
                        setting: {},
                        value: null
                    }
                };
            if (option) $.extend(true, defaults, option);
            this.context = option.context;
            this.parent(defaults);
            if (!this.options.isStopRender) this.renderAll();
        },
        renderAll: function() {
            this.$el.empty();
            if(this.options.value){
                this.options.input.value = _.isFunction(this.options.value) ? this.options.value() : this.options.value;
            }
            if(this.options.name) this.options.input.name = this.options.name;
            var that = this,
                theKey = this.id + '_input',
                theEl = '.input-group',
                option = {
                    key: theKey,
                    el: '.input-group',
                    view: InputView,
                    inset: 'prepend',
                    context: this,
                    options: this.options.input
                };
            if (!this.options.isRange) {
                this.$el.html(this.templateSingle(this.options));
                HBY.view.create(option);
                this.$el.find(theEl).datetimepicker(this.options.setting);
            } else {
                var startOption = $.extend(true, {}, this.options.setting),
                    endOption = $.extend(true, {}, this.options.setting),
                    startEl = '.startDate',
                    endEl = '.endDate';
                if (!this.options.startInput.selector && !this.options.endInput.selector) {
                    this.$el.html(this.templateRange(this.options));
                    if (this.options.startInput.name) this.$(startEl).attr('name', this.options.startInput.name);
                    if (this.options.endInput.name) this.$(endEl).attr('name', this.options.endInput.name);
                    if (this.options.startInput.placeholder) this.$(startEl).attr('placeholder', this.options.startInput.placeholder);
                    if (this.options.endInput.placeholder) this.$(endEl).attr('placeholder', this.options.endInput.placeholder);
                    endOption.useCurrent = this.options.endInput.useCurrent;
                    this.$(startEl).datetimepicker(startOption);
                    this.$(endEl).datetimepicker(endOption);
                    this.$(startEl).on("dp.change", function(e) {
                        that.$(endEl).data("DateTimePicker").minDate(e.date);
                    });
                    this.$(endEl).on("dp.change", function(e) {
                        that.$(startEl).data("DateTimePicker").maxDate(e.date);
                    });
                } else if (this.options.startInput.selector || this.options.endInput.selector) {
                    var newOption = $.extend(true, {}, this.options.setting),
                        selector = this.options.startInput.selector || this.options.endInput.selector;
                    this.$el.html(this.templateSingle(this.options));
                    HBY.view.create(option);
                    if (this.options.startInput.selector) newOption.useCurrent = false;
                    this.$el.find(theEl).datetimepicker(newOption);
                    if (this.options.endInput.selector) {
                        this.$el.find(theEl).on("dp.change", function(e) {
                            var _el = selector instanceof jQuery ? selector : $(selector).find(theEl);
                            _el.data("DateTimePicker").maxDate(e.date);
                        });
                    } else if (this.options.startInput.selector) {
                        this.$el.find(theEl).on("dp.change", function(e) {
                            var _el = selector instanceof jQuery ? selector : $(selector).find(theEl);
                            _el.data("DateTimePicker").minDate(e.date);
                        });
                    }
                }
            }
        }
    });
    return View;
});
