/*
 * 日期选择器通用组件类
 * @author: yrh
 * @create: 2016/7/14
 * @update: 2016/7/14
* options: {
}
 */
define([
    'lib/view/Loader',
    'lib/view/component/Select',
    'chosen'
], function(LoaderView, SelectView) {
    var View = LoaderView.extend({
        className: 'chosen-select',
        asset: {
            css: {
                'chosen': '/js/lib/vendor/ui/chosen/chosen.css'
            }
        },
        initialize: function(option) {
            var that = this,
                defaults = {
                    options: {
                        className: '',
                        multiple: false, //是否多选
                        isAutoLoad: false, //是否自动加载数据
                        isHideSearch: false, //是否隐藏搜索框
                        placeholder: '',
                        loading: {
                            container: '.chosen-drop'
                        },
                        setting: {
                            // width: '100px',
                            search_api: null, //搜索接口
                            allow_single_deselect: false, //是否显示单选删除
                            disable_search: false, //不在搜索结果(单选)
                            disable_search_threshold: 0, //隐藏在单选择搜索输入如果有N个或更少的选项。
                            enable_split_word_search: true, //默认情况下，搜索将匹配上的一个选项标签中的任何字
                            inherit_select_classes: false, //是否继承选择组件的样式，并将其添加到选上的容器div
                            max_selected_options: 100, //限制最大选择项数。 当达到限制时， chosen:maxselected触发事件。
                            no_results_text: "No results match",
                            search_contains: false, //默认情况下，所选择的搜索开始匹配一个单词的开头
                            single_backstroke_delete: true, //按下多重选择删除/退格将删除选定的选择
                            display_disabled_options: true, //是否显示禁用的选项
                            display_selected_options: true, //是否显示选中的选项
                            include_group_label_in_selected: false, //是否显示组
                            max_shown_results: 100, //显示最大结果数
                        }
                    }
                };
            if (option) $.extend(true, defaults, option);
            this.data = this.data || option.data || [];
            this.context = option.context;
            this.datas = {};
            this.parent(defaults);
            if (this.options.multiple) {
                this.options.setting.placeholder_text_multiple = this.options.placeholder;
            } else {
                this.options.setting.placeholder_text_single = this.options.placeholder;
            }
            if (typeof this.data == 'function') {
                this.data = this.data();
            }
            this.options.width = this.$el.width() || 150;
            if (this.collection) {
                // 获取数据
                this.stopListening(this.collection);
                this.listenTo(this.collection, "remove", this.makeData);
                this.listenTo(this.collection, "reset", this.makeData);
                if (this.options.isAutoLoad) {
                    this.collection.loadData();
                } else {
                    this.$el.off('mouseup.loadData').on('mouseup.loadData', function(event) {
                        that.collection.loadData();
                        that.$el.off('mouseup.loadData');
                    });
                    this.renderAll();
                }
            } else {
                this.renderAll();
            }
        },
        // 组装数据集数据
        makeData: function(collection) {
            var newData = [];
            this.collection.each(function(model, index) {
                newData.push(model.attributes);
            });
            this.data = newData;
            this.renderAll(true);
        },
        _getDirection: function(el) {
            var _X = el.offset().left,
                _Y = el.offset().top,
                windowHeight = $(window).height(),
                elHeight = el.height();
            if (el.children('.chosen-drop').height() > (windowHeight - _Y - elHeight)) {
                return 'up';
            } else {
                return 'bottom';
            }
        },
        renderAll: function(isUpdate) {
            var that = this,
                theKey = this.id + '_select';
            this.options.width = parseInt(this.options.width) + 'px';
            HBY.view.create({
                key: theKey,
                el: this.$el,
                context: this,
                view: SelectView,
                inset: 'html',
                options: this.options,
                onInitAfter: function(key, context) {
                    that.options.setting.width = that.options.width;
                    that.options.setting.disable_search = that.options.isHideSearch;
                    that.$('#' + theKey).chosen(that.options.setting);
                    that.$('.chosen-container-single .chosen-single div').html('<i class="hby-drop-down"></i>');
                    that.$('.chosen-search').append('<i class="hby-search"></i>');
                    if (isUpdate) {
                        var chosen = that.$('#' + theKey).data('chosen');
                        chosen.results_show();
                    }
                    that.$('#' + theKey).on('chosen:showing_dropdown', function(evt, params) {
                        var position = that._getDirection($(this).next());
                        $(this).next().addClass(position);
                    }).on('chosen:hiding_dropdown', function(evt, params) {
                        $(this).next().removeClass('up bottom');
                    });
                    if (that.options.multiple) {
                        that.$('.chosen-container').off('click.multiple').on('click.multiple', function(event) {
                            $(this).addClass('chosen-with-drop');
                            event.stopPropagation();
                        })
                    }
                }
            });
        },
    });
    return View;
});
