/*
 * 下拉选择树通用组件类
 * @author: yrh
 * @create: 2016/8/10
 * @update: 2016/8/10
 * options: {}
 * events: close change
 */
define([
    'lib/view/Loader',
    'lib/view/element/Input'
], function(LoaderView, InputView) {
    var Template = [
        '<div class="select-container <%= disabled ? "disabled" : "" %> select-container-<%= isMultiple ? "multi" : "single" %> <%= (!addButton.hide && isMultiple) ? "select-container-addbtn" : "" %> select-with-drop select-container-active"',
        ' style="width: <%= width ? (parseInt(width) + "px") : "100%" %>;">',
        '<% if(!isMultiple){ %>',
        '<a class="select-single"><span class="default"><%= placeholder %></span><div><i class="hby-drop-down"></i></div></a>',
        '<% }else{ %>',
        '<ul class="select-choices">',
        '<% _.each(valueObj, function(val, index){ %>',
        '<li class="search-choice"><span><%= val[keyName[1]] || "" %></span>',
        '<a class="search-choice-close" data-option-array-index="<%= index %>" data-id="<%= val[keyName[0]] %>" data-type="<%= val[keyName[2]] %>"></a>',
        '</li>',
        '<% }); %>',
        '<li class="search-field">',
        '<input type="text" value="<%= placeholder %>" class="default" autocomplete="off" style="width: 100%;">',
        '</li>',
        '</ul>',
        '<% } %>',
        '<div class="select-drop" style="<%= (!addButton.hide && isMultiple) ? "width:300px;" : "" %> display:none;">',
        '<div class="select-search" style="display: <%= isHideSearch ? "none" : "block" %>;">',
        '<input type="text" data-search="true" autocomplete="off"><i class="hby-search"></i>',
        '</div>',
        '<div class="select-<%= type %>-div scroller" style="overflow:auto; max-height: 300px; position:relative;">',
        '<ul class="select-results">',
        '<% _.each(data, function(val, index){ %>',
        '<li class="<%= val.disabled ? "disabled-result" : (val.selected ? "result-selected" : "active-result") %>" data-index="<%= index %>" data-value="<%= val[keyName[0]] %>"><%= val[keyName[1]] %></li>',
        '<% }); %>',
        '</ul>',
        '</div>',
        '</div>'
    ].join('');

    var View = LoaderView.extend({
        className: 'select-selectlist',
        asset: {
            css: {
                'select': '/js/lib/vendor/ui/select/select.css'
            }
        },
        events: {
            'click .select-container:not(.disabled)': 'showLayer',
            'keyup input[data-search]': '_search',
            'click .search-choice-close': '_clickCloseBtn',
            'click .select-results li.active-result:not(.disabled-result)': '_clickItem',
            'click .select-drop': function(event) {
                event.stopPropagation();
            },
            'mouseleave .select-container': 'closeLayer'
        },
        template: _.template(Template),
        initialize: function(option) {
            var that = this;
            var defaults = {
                options: {
                    type: 'list',
                    returnField: 'id',
                    className: '',
                    disabled: false,
                    isMultiple: false, //是否多选
                    isAutoLoad: false, //是否自动加载数据
                    isRemoveAble: true, //是否可删除选择(只用在多项选择)
                    isHideSearch: false, //是否隐藏搜索框
                    width: 150,
                    loading: {
                        container: '.select-list-div'
                    },
                    keyName: ['id', 'name', 'type'],
                    placeholder: '请选择',
                    addButton: {
                        hide: true,
                        text: ''
                    },
                    // confirm: {
                    //     type: 'warning',
                    //     content: '确定要删除此选项吗?'
                    // },
                    layer: {},
                    valueObj: [],
                    value: [],
                    data: []
                }
            };
            if (option) $.extend(true, defaults, option);
            this.context = option.context;
            this.oldVal = '';
            this.parent(defaults);
            this.listenData();
            if (!this.options.isStopRender) this.renderAll();
            if (this.options.value.length) {
                this.setValue(this.options.value);
            }
        },
        renderAll: function(isUpdate) {
            var that = this,
                keyName = this.options.keyName;
            if (!isUpdate) {
                HBY.view.create({
                    key: this.id + '_input',
                    el: this.$el,
                    view: InputView,
                    context: this,
                    inset: 'html',
                    options: {
                        required: this.options.required,
                        name: this.options.name,
                        type: 'hidden'
                    }
                });
                if (this.options.width) this.$el.width(this.options.width);
                this.$el.append(this.template(this.options));
                if (!this.options.addButton.hide && this.options.isMultiple) {
                    // 显示添加按钮
                    this.$('.select-choices').append('<li class="search-choice add-choice-btn"><span>' + this.options.addButton.text + '</span></li>');
                    this.$('.search-field > input').hide();
                }
                if (!_.isEmpty(this.options.layer)) {
                    if (this.options.layer.style) {
                        this.$('.select-drop').css(this.options.layer.style);
                    }
                }
            } else {
                var container = this.$('.select-results'),
                    html = '';
                _.each(this.options.data, function(val, index) {
                    html += '<li class="active-result" data-index="' + index + '" data-value="' + val[keyName[0]] + '">' + val[keyName[1]] + '</li>';
                });
                container.html(html);
            }
            this.$('.scroller').perfectScrollbar();
            this.$('.scroller').off("mousemove.ps").on("mousemove.ps", function() {
                $(this).perfectScrollbar('update');
            });
        },
        setValue: function(value) {
            var that = this,
                keyName = this.options.keyName;
            _.each(value, function(val, index) {
                that.addItem(val[keyName[0]], val[keyName[1]], val[keyName[2]]);
            });
        },
        // 添加某选中项
        addItem: function(id, name, type) {
            if (!_.findWhere(this.options.valueObj, { id: id })) {
                this.options.valueObj.push({
                    id: id,
                    name: name,
                    type: type
                });
                if (this.options.isRemoveAble) {
                    this.$('ul.select-choices').prepend('<li class="search-choice"><span>' + name + '</span><a class="search-choice-close" data-id="' + id + '"></a></li>');
                }
                HBY.Events.trigger(this.id + ':addValue', id, this);
            }
            this._changeView(name);
        },
        // 移除某选中项
        removeItem: function(id) {
            this.$('[data-id=' + id + ']').parent().remove();
            var that = this;
            this.options.valueObj = _.filter(this.options.valueObj, function(val) {
                return val.id != id;
            });
            // this.options.valueObj = this.valueObjTemp;
            if (this.options.type == 'list') {
                this.$('[data-value=' + id + ']').removeClass('result-selected').addClass('active-result');
            }
            HBY.Events.trigger(this.id + ':removeValue', id, this);
            this._changeView();
        },
        // 显示层
        showLayer: function() {
            event.stopPropagation();
            var target = this.$('.select-container');
            if (target.find('.select-drop').is(':visible')) {
                this.closeLayer();
            } else {
                if (!this.options.addButton.hide) {
                    this._layerLeft();
                }
                target.find('.select-drop').show();
            }
        },
        // 关闭层
        closeLayer: function() {
            var target = this.$('.select-container'),
                that = this;
            target.removeClass('up bottom left right');
            if (target.find('.select-drop:visible').length) {
                target.find('.select-drop').hide(0, function() {
                    that.$el.triggerHandler('close');
                    var newVal = target.prev('input').val() || '';
                    if (newVal !== that.oldVal) {
                        that.oldVal = newVal;
                        that.$el.triggerHandler('change');
                    }
                });
            }
        },
        makeData: function(collection) {
            var that = this;
            var newData = [];
            this.collection.each(function(model, index) {
                newData.push(model.attributes);
            });
            this.options.data = newData;
            this.renderAll(true);
        },
        _clickItem: function(event) {
            event.stopPropagation();
            var target = $(event.currentTarget);
            if (this.options.isMultiple) {
                target.removeClass('active-result').addClass('result-selected');
            }
            this._changeValue({
                dataId: target.data('value'),
                name: target.text(),
                type: target.data('type'),
            });
        },
        // 点击移除某选中项按钮
        _clickCloseBtn: function(event) {
            event.stopPropagation();
            var target = $(event.currentTarget),
                that = this,
                id = target.data('id');
            if (this.options.confirm) {
                HBY.util.System.showDialog(_.extend({
                    buttons: [{}, {
                        click: function(e) {
                            that.removeItem(id);
                            HBY.view.get('dialog').closeModal();
                        }
                    }]
                }, this.options.confirm));
            } else {
                this.removeItem(id);
            }
        },
        _layerLeft: function() {
            var _left = this.$('.add-choice-btn').position().left;
            this.$('.select-drop').css('left', _left).hide();
            this._getDirection();
        },
        // 更改视图
        _changeView: function(name) {
            var theInputEl = this.$('input[type="hidden"]'),
                resultNames = this.options.valueObj.length ? _.pluck(this.options.valueObj, 'name').join(',') : '';
            theInputEl.val(_.pluck(this.options.valueObj, this.options.returnField).join(','));
            if (this.options.addButton.hide) {
                var _input = this.$('.search-field > input'),
                    _span = this.$('.select-single > span');
                if (!theInputEl.val()) {
                    _input.show();
                    _span.addClass('default').text(this.options.placeholder);
                    if (!this.options.isRemoveAble) {
                        this.$('.select-results-name').hide();
                    }
                } else {
                    if (!this.options.isRemoveAble) {
                        if (this.$('.select-results-name').length) {
                            this.$('.select-results-name').html(resultNames).show();
                        } else {
                            this.$('ul.select-choices').append('<li class="search-choice select-results-name" style="width:' + (this.$('.select-container').width() - 10) + 'px">' + resultNames + '</li>');
                        }
                    }
                    _input.hide();
                }
                if (!this.options.isMultiple) {
                    _span.text(name).removeClass('default');
                }
            } else if (!this.options.addButton.hide && this.options.isMultiple) {
                this._layerLeft();
            }
        },
        // 更改值
        _changeValue: function(data) {
            if (this.options.isMultiple) {
                if (this.options.type == 'tree') {
                    if (data.checked) {
                        this.addItem(data.dataId, data.name, data.type);
                        this.$('.search-field > input').hide();
                    } else {
                        this.removeItem(data.dataId);
                    }
                }
                if (this.options.type == 'list') {
                    this.addItem(data.dataId, data.name, data.type);
                }
            } else {
                this.options.valueObj = [{
                    id: data.dataId,
                    name: data.name,
                    type: data.type
                }];
                this._changeView(data.name);
                this.closeLayer();
            }
        },
        // 取层飘浮方向
        _getDirection: function() {
            var el = this.$('.select-container'),
                addBtn = this.$('.add-choice-btn'),
                windowWidth = $(window).width(),
                windowHeight = $(window).height(),
                _X = el.offset().left,
                _Y = el.offset().top,
                dropEl = el.children('.select-drop'),
                dropX = addBtn.length ? addBtn.offset().left : 0,
                dropWidth = dropEl.width(),
                dropHeight = dropEl.height(),
                upDown = '',
                leftRight = '',
                elHeight = el.height();
            if (dropHeight > 350) {
                dropEl.height(350);
                el.find('.select-' + this.options.type + '-div').height(350 - 50);
            }
            if (dropHeight > (windowHeight - _Y - elHeight)) {
                upDown = 'up';
            } else {
                upDown = 'bottom';
            }
            if (dropWidth > (windowWidth - dropX)) {
                leftRight = 'left';
            } else {
                leftRight = 'right';
            }
            el.removeClass('up bottom left right').addClass(upDown + ' ' + leftRight);
        },
        // 搜索
        _search: function(event) {
            var target = $(event.currentTarget);
            console.warn(target.val());
        }
    });
    return View;
});
