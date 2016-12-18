/*
 * 下拉选择树通用组件类
 * @author: yrh
 * @create: 2016/8/10
 * @update: 2016/8/10
 * options: {}
 */
define([
    'lib/view/component/SelectList',
    'lib/view/element/Input',
    'lib/view/component/Tree'
], function(SelectListView, InputView, TreeView) {
    var View = SelectListView.extend({
        className: 'select-selecttree',
        events: {
            'click .select-container:not(.disabled)': 'showLayer',
            'keyup input[data-search]': '_searchTree',
            'click .search-choice-close': '_clickCloseBtn',
            'click .select-drop': function(event) {
                event.stopPropagation();
            },
            'mouseleave .select-container': 'closeLayer'
        },
        initialize: function(option) {
            this.context = option.context;
            var that = this;
            var defaults = {
                options: {
                    type: 'tree',
                    returnField: 'id',
                    className: '',
                    disabled: false,
                    isMultiple: false, //是否多选
                    isAutoLoad: false, //是否自动加载数据
                    isRemoveAble: true, //是否可删除选择(只用在多项选择)
                    isHideSearch: false, //是否隐藏搜索框
                    disSelectAttr: null, //禁止选择含有该属性节点, 可以是对象
                    onlySelectAttr: null, //只选择含有该属性节点, 可以是对象
                    width: 150,
                    loading: {
                        container: '.select-tree-div',
                        css: {
                            height: 50
                        }
                    },
                    keyName: ['id', 'name', 'type'],
                    placeholder: '请选择',
                    treeSetting: {
                        view: {
                            showLine: false
                        }
                    },
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
            var selectOrNo = function(treeNode) {
                if (defaults.options.disSelectAttr) {
                    if (_.has(treeNode, defaults.options.disSelectAttr)) return false;
                }
                if (defaults.options.onlySelectAttr) {
                    if (!_.has(treeNode, defaults.options.onlySelectAttr)) return false;
                }
                return true;
            };
            if (option) $.extend(true, defaults, option);
            if (defaults.options.isMultiple) {
                defaults.options.treeSetting.check = _.extend({
                    enable: true,
                    chkboxType: { "Y": "", "N": "" }
                }, defaults.options.treeSetting.check || {});
                defaults.options.treeSetting.callback = _.extend(defaults.options.treeSetting.callback || {}, {
                    onCheck: function(event, treeId, treeNode) {
                        if (defaults.options.treeSetting.check.chkboxType.Y) {
                            var treeObj = $.fn.zTree.getZTreeObj(treeId),
                                nodes = treeObj.getCheckedNodes(true),
                                keyName = that.options.keyName,
                                result = _.filter(nodes, function(node) {
                                    return selectOrNo(node);
                                });
                            that.options.valueObj = [];
                            _.each(result, function(val, index) {
                                that.options.valueObj.push({
                                    id: val[keyName[0]],
                                    name: val[keyName[1]],
                                    type: val[keyName[2]]
                                });
                            });
                            that._changeView(that.options.name);
                        } else {
                            that._changeValue(treeNode);
                        }
                    },
                    onClick: function(event, treeId, treeNode) {
                        var ztree = $.fn.zTree.getZTreeObj(treeId),
                            target = that.$('#' + treeNode.tId);
                        target.children('a').removeClass('curSelectedNode');
                        if (!selectOrNo(treeNode)) {
                            return false;
                        }
                        ztree.checkNode(treeNode, !treeNode.checked, null, true);
                    }
                });
            } else {
                defaults.options.treeSetting.callback = _.extend(defaults.options.treeSetting.callback || {}, {
                    onClick: function(event, treeId, treeNode) {
                        if (!selectOrNo(treeNode)) {
                            return false;
                        }
                        that._changeValue(treeNode);
                    }
                });
            }
            this.parent(defaults);
            if (!this.options.addButton.hide && this.options.isMultiple) {
                this.$('.add-choice-btn').click(function(event) {
                    that.showLayer(event);
                });
            }
            HBY.Events.off(null, null, this);
            HBY.Events.on("selecttree:refresh", this.makeData, this);
        },
        makeData: function(collection) {
            var that = this;
            if (collection.models) {
                var newData = [];
                this.collection.each(function(model, index) {
                    newData.push(model.attributes);
                });
                this.options.data = newData;
            } else {
                this.options.data = collection;
            }
            this.renderAll(true);
        },
        renderAll: function(isUpdate) {
            var that = this;
            if (!isUpdate) {
                HBY.view.create({
                    key: this.id + '_input',
                    el: this.$el,
                    view: InputView,
                    context: this,
                    inset: 'html',
                    options: {
                        name: this.options.name,
                        type: 'hidden'
                    }
                });
                if (this.options.width) this.$el.width(this.options.width);
                this.$el.append(this.template(this.options));
                HBY.view.create({
                    key: this.id + '_selecttree',
                    el: '.select-tree-div',
                    view: TreeView,
                    context: this,
                    inset: 'html',
                    options: {
                        setting: this.options.treeSetting || {},
                        data: this.options.data || []
                    }
                });
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
                HBY.view.create({
                    key: this.id + '_selecttree',
                    el: '.select-tree-div',
                    view: TreeView,
                    context: this,
                    inset: 'html',
                    options: {
                        setting: this.options.treeSetting || {},
                        data: this.options.data || []
                    }
                });
            }
            this.$('.scroller').perfectScrollbar();
            this.$('.scroller').off("mousemove.ps").on("mousemove.ps", function() {
                $(this).perfectScrollbar('update');
            });
        },
        // 显示层
        showLayer: function(event) {
            event.stopPropagation();
            if ($(event.currentTarget).hasClass('select-container') && !this.options.addButton.hide && this.options.isMultiple) return;
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
        // 点击移除某选中项按钮
        _clickCloseBtn: function(event) {
            event.stopPropagation();
            var target = $(event.currentTarget),
                that = this,
                id = target.data('id'),
                ztree = $.fn.zTree.getZTreeObj(this.id + '_selecttree'),
                treeNode = ztree.getNodeByParam("dataId", id, null);
            if (this.options.confirm) {
                HBY.util.System.showDialog(_.extend({
                    buttons: [{}, {
                        click: function(e) {
                            that.removeItem(id);
                            if (that.$('.select-drop').is(':visible')) {
                                ztree.checkNode(treeNode, !treeNode.checked, null, true);
                            }
                            HBY.view.get('dialog').closeModal();
                        }
                    }]
                }, this.options.confirm));
            } else {
                this.removeItem(id);
                ztree.checkNode(treeNode, !treeNode.checked, null, true);
            }
        }
    });
    return View;
});