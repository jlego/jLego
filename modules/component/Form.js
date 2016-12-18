/*
 * 表单组件
 * @author: yrh
 * @create: 2016/7/19
 * @update: 2016/7/19
 * ===============================
 * options: {
    form: {}, //表单
    submitEl: '', //提交表单按钮
    layout: {
        type: 'default', //horizontal,inline
        rows: [{
            isRequired: false, //是否必填
            label: {
                text: '',
                html: ''
            },
            input: {},
            help: {}
        },{
            legend: '',
            rows: [{
                isRequired: false,
                label: {},
                input: {}
            }]
        }]
    },
    widgets: [{

    }]
}
 * ===============================
 */
define([
    'lib/view/component/Layout',
    'lib/view/element/Form',
    'jquery.validate',
    'jquery.validateMethods',
], function(LayoutView, FormView, validate, jqueryValidateMethods) {
    var View = LayoutView.extend({
        initialize: function(option) {
            this.theKey = option.key;
            var that = this,
                defaults = {
                    model: null,
                    options: {
                        form: {}, //表单
                        validate: { //表单验证
                            // debug: true,
                            errorClass: 'help-block',
                            errorElement: 'div',
                            errorPlacement: function(error, element) {
                                element.parents('.form-group > div').append(error);
                            },
                            highlight: function(element, errorClass) {
                                $(element).closest('.form-group').addClass('has-error');
                            },
                            success: function(el) {
                                el.closest('.form-group').removeClass('has-error');
                                el.closest('div.help-block').remove();
                            },
                            submitHandler: function(form) {
                                that.submitForm();
                            },
                            rules: null,
                            messages: {}
                        },
                        submitEl: '', //提交表单按钮
                        startApi: {}, //开始调用接口
                        loading: {
                            container: this.$el
                        },
                        layout: {
                            type: '', //horizontal,inline
                        },
                        widgets: [],
                        filterData: function() {},
                        onSuccess: function() {},
                        onError: function() {}
                    }
                };
            if (option) $.extend(true, defaults, option);
            this.context = defaults.context;
            this.model = defaults.model;
            this.isSended = false; //是否已发送
            this.validator = null;
            if (!this.model) return false;
            this.parent(defaults);
        },
        // 添加行
        addOne: function(row, index) {
            this.$('#' + this.id + '_form').append(this._makeRow(row, index));
        },
        // 生成行
        _makeRow: function(row, index) {
            var key = this.id + '_' + index;
            var rowEl = $('<div class="form-group"></div>'),
                labelEl = $('<label/>'),
                divEl = $('<div class="form-div" id="' + key + '"/>'),
                inputEl = $('<div class="form-input"><div id="' + key + '"></div></div>'),
                helpEl = $('<span class="help-block"/>'),
                labelText = '',
                inputText = '',
                type = this.options.layout.type;
            if (type == 'horizontal') {
                if (_.isObject(row.label)) {
                    this.renderHtml(labelEl, row.label, labelEl);
                    labelEl.addClass((row.label.className || 'col-sm-2') + ' control-label');
                    if (row.isRequired) labelEl.append('<span class="symbol required">*</span>');
                    rowEl.append(labelEl);
                }
                if (_.isObject(row.input)) {
                    this.renderHtml(inputEl.children(), row.input, inputEl.children());
                    inputEl.addClass(row.input.className || ((!row.label ? 'col-sm-offset-2 ' : '') + 'col-sm-10'));
                    rowEl.append(inputEl);
                }
            } else {
                if (_.isObject(row.label)) {
                    this.renderHtml(labelEl, row.label, labelEl);
                    if (row.isRequired) labelEl.append('<span class="symbol required">*</span>');
                    rowEl.append(labelEl);
                }
                if (_.isObject(row.input)) {
                    this.renderHtml(inputEl.children(), row.input, inputEl.children());
                    rowEl.append(inputEl);
                }
            }
            if (_.isObject(row.html)) rowEl.css('margin', 0);
            if (_.isObject(row.div)) {
                rowEl.append(divEl);
                if (row.div.style) divEl.css(row.style);
                this.renderHtml(divEl, row.div, divEl);
            }
            if (_.isObject(row.help)) {
                this.renderHtml(helpEl, row.help, helpEl);
                inputEl.append(helpEl);
            }
            this.renderHtml(rowEl, row, rowEl);
            return rowEl;
        },
        // 渲染行
        _renderRows: function(rows) {
            var that = this,
                container = this.$('#' + this.id + '_form');
            if (rows.length) {
                _.each(rows, function(row, index) {
                    if (row.legend) {
                        var fieldsetEl = $('<fieldset/>'),
                            legendEl = $('<legend>' + row.legend + '</legend>');
                        fieldsetEl.html(legendEl);
                        if (row.rows.length) {
                            _.each(row.rows, function(item, i) {
                                var html = '';
                                html = that._makeRow(item, index + '_' + i);
                                fieldsetEl.append(html);
                            });
                        }
                        container.append(fieldsetEl);
                    } else {
                        container.append(that._makeRow(row, index));
                    }
                });
            }
        },
        // 渲染表单页
        renderAll: function() {
            HBY.Events.off(null, null, this);
            this.$el.empty();
            var formId = '#' + this.id + '_form';
            var formView = HBY.view.create({
                key: formId,
                el: this.$el,
                context: this,
                view: FormView,
                options: this.options.form
            });
            var container = this.$(formId),
                that = this,
                rows = this.options.layout.rows,
                widgets = this.options.widgets,
                type = this.options.layout.type;
            if (type) {
                container.addClass('form-' + type);
            }
            container.empty();
            this._renderRows(rows);
            this._renderWidget(widgets);
            if (this.$(this.options.submitEl).length) {
                this.$(this.options.submitEl).off().on('click', function() {
                    container.submit();
                });
            }
            if (this.options.validate.rules) {
                this.validator = container.validate(this.options.validate);
            } else {
                container.off('submit:form').on('submit:form', function(event) {
                    that.submitForm();
                });
            }
            return this;
        },
        //序列化表单
        _serializeJson: function(formEl) {
            var data = {},
                formEl = formEl instanceof jQuery ? formEl : $(formEl);
            var formData = formEl.serializeArray();
            _.each(formData, function(item, index) {
                if (item.value) {
                    if (data[item.name]) {
                        if (!_.isArray(data[item.name])) {
                            data[item.name] = [data[item.name]];
                        }
                        if (_.indexOf(data, item.value) < 0) data[item.name].push(item.value);
                    } else {
                        data[item.name] = item.value;
                    }
                }
            });
            return data;
        },
        //提交表单
        submitForm: function() {
            var formEl = this.$('form');
            var that = this,
                modelData = this.filterData(this._serializeJson(formEl));
            if (!modelData) return false;
            var submitEl = this.options.submitEl || '[type="submit"]';
            if (!$(submitEl).hasClass('disabled')) {
                $(submitEl).text('提交中...').addClass('disabled');
            }
            this.savedData(modelData);
            return false;
        },
        //过滤数据
        filterData: function(data) {
            var filterData = this.options.filterData;
            if (_.isFunction(filterData)) {
                return filterData(data);
            } else {
                return data;
            }
        },
        // 发送数据
        savedData: function(data) {
            var that = this,
                onSuccess = this.options.onSuccess,
                onError = this.options.onError;
            if (this.model.id) data.id = this.model.id;
            this.model.api(this.model.id ? 'update' : 'create', {
                type: 'POST',
                data: data,
                success: function(model, response) {
                    if (_.isFunction(onSuccess)) onSuccess(model, response);
                },
                error: function(model, errorMsg) {
                    if (_.isFunction(onError)) onError(model, errorMsg);
                }
            });
        }
    });
    return View;
});
