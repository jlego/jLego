/*
 * 搜索框通用组件类
 * @author: yrh
 * @create: 2016/8/4
 * @update: 2016/8/30
 * options: {
 *     advanced: {
 *         data: [{text: '', value: ''}]
 *     }
 * }
 */
define([
    'lib/view/component/InputGroup',
], function(InputGroupView) {
    var View = InputGroupView.extend({
        className: 'search-input',
        events: {
            'click button': '_clickBtn',
            'keydown input': '_enterSearch',
        },
        initialize: function(option) {
            this.collection = null;
            this.context = option.context;
            this.parentId = option.context.id;
            this.itemData = null;
            var that = this;
            var defaults = {
                options: {
                    advanced: null, //高级搜索
                }
            };
            if (!option.options.data) {
                defaults.options.data = [{
                    key: option.key + '_input',
                    view: 'element:Input',
                    options: {
                        placeholder: option.options.placeholder || '输入关键字搜索'
                    }
                }, {
                    key: option.key + '_span',
                    view: 'element:Span',
                    options: {
                        className: 'input-group-btn',
                        html: {
                            key: option.key + '_btn',
                            view: 'element:Button',
                            options: {
                                className: 'btn search-button',
                                html: '<i class="hby-search"></i>'
                            }
                        }
                    }
                }];
            }
            // 高级搜索 类别下拉选择框
            if (option.options.advanced) {
                option.options.advanced = $.extend(true, {
                    className: 'input-group-btn dropdown',
                    button: [{
                        style: {
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            maxWidth: 100
                        }
                    }],
                    onClickItem: function(event) {
                        var target = $(event.currentTarget),
                            btnEl = target.parent().prev('button');
                        that.itemData = target.data('nav');
                        if (btnEl.length) {
                            btnEl.html(that.itemData.text + '<span class="caret"></span>');
                        }
                    }
                }, option.options.advanced);
                defaults.options.data.unshift({
                    key: option.key + '_dropdown',
                    view: 'component:Dropdown',
                    options: option.options.advanced
                });
            }
            if (option) $.extend(true, defaults, option);
            this.parent(defaults);
        },
        _clickBtn: function(event) {
            var val = this.$('input').val(),
                result = { keyword: val };
            if (this.options.advanced) result.data = this.itemData;
            this.$el.triggerHandler('search', result);
        },
        _enterSearch: function(event) {
            if (event.keyCode == 13) {
                this._clickBtn(event);
            }
        },
    });
    return View;
});
