/*
 * 表格元素类
 * @author: yrh
 * @create: 2016/6/26
 * @update: 2016/6/26
 *grouping: {
    mergeRowBy: 'deptName',
    groupBy: function(val) {
        return val.deptName;
    }
}, 分组
 * columns: [{
 *  text: '',
 *  html: '',
 *  hide: false,
 *  dataIndex: 'name',
 *  sortAble: false,
 *  editAble: true,
 *  sortOrder: up升序,down降序
 *  style: {}
 * }],
 * rowItem: [{
 * ff
 * }]
 */
define([
    'lib/view/View',
    'vendor/jquery/draggable',
    'vendor/jquery/droppable'
], function(BaseView) {
    var View = BaseView.extend({
        tagName: 'table',
        events: {
            'change th > input[type="checkbox"]': 'selectAll',
            'change td > input[type="radio"], td > input[type="checkbox"]': 'selectOne',
        },
        initialize: function(option) {
            var that = this,
                defaults = {
                    options: {
                        className: 'table table-hover',
                        selectAble: false, //是否可选
                        checkType: 'checkbox', //radio
                        draggAble: false, //是否可拖动
                        changeWidthAble: false,
                        sortAble: false, //可排序
                        thead: {
                            hide: false,
                            colStyle: {},
                        },
                        tbody: {
                            hide: false,
                        },
                        tfoot: {
                            hide: true,
                        },
                        grouping: {},
                        columns: [],
                        // rowDetail: { //嵌入行
                        //     isHidden: true
                        // },
                        data: []
                    }
                };
            if (option) $.extend(true, defaults, option || {});
            this.parent(defaults);
            this.parentId = option.context.id;
            this.isLoaded = false;
            this.draggableTh = null;
            this.addTimes = 0;
            if (!this.options.thead.hide) {
                HBY.view.create({
                    key: this.id + '_thead',
                    el: this.$el,
                    view: 'element:Thead',
                    context: this,
                    options: this.options.thead || {},
                });
            }
            if (!this.options.tbody.hide) {
                HBY.view.create({
                    key: this.id + '_tbody',
                    el: this.$el,
                    view: 'element:Tbody',
                    context: this,
                    options: this.options.tbody || {},
                });
            }
            if (!this.options.tfoot.hide) {
                HBY.view.create({
                    key: this.id + '_tfoot',
                    el: this.$el,
                    view: 'element:Tfoot',
                    context: this,
                    options: this.options.tfoot || {},
                });
            }
            // 分组
            if (this.options.grouping.groupBy) {
                var data = this.options.data,
                    groupBy = this.options.grouping.groupBy,
                    newData = _.groupBy(data, groupBy);
                _.each(newData, function(val, key) {
                    val[0]._rowspan = val.length;
                });
                this.options.data = _.flatten(_.values(newData));
            }
            if (this.options.columns) {
                _.each(this.options.columns, function(val, index) {
                    if (val.children) {
                        _.each(val.children, function(col, i) {
                            col.hide = col.hide || false;
                        });
                    } else {
                        val.hide = val.hide || false;
                    }
                });
            }
            if (!this.options.isStopRender) this.renderAll();
        },
        // 添加行
        addItem: function(model) {
            if (model.attributes) {
                this.options.data.add(model);
            } else {
                this.options.data.push(model);
            }
            this._renderRow(model.attributes ? model.attributes : model);
        },
        // 选中一条
        selectOne: function(event) {
            event.stopPropagation();
            var target = $(event.currentTarget),
                that = this;
            if (this.options.selectAble) {
                var isChecked = target.is(':checked'),
                    theRowId = target.parents('tr').attr('id'),
                    dataItem = null;
                if (that.options.data.models) {
                    dataItem = that.options.data.findWhere({ tr_id: theRowId });
                    if (this.options.checkType == 'radio') {
                        that.options.data.each(function(val, index) {
                            val.set('selected', false);
                        });
                    }
                } else {
                    dataItem = _.findWhere(that.options.data, { tr_id: theRowId });
                    if (this.options.checkType == 'radio') {
                        _.each(that.options.data, function(val, index) {
                            val.selected = false;
                        });
                    }
                }
                if (dataItem) {
                    if (that.options.data.models) {
                        dataItem.set('selected', isChecked ? true : false);
                    } else {
                        dataItem.selected = isChecked ? true : false;
                    }
                    if (this.options.checkType == 'checkbox') {
                        if (isChecked) {
                            target.parent().parent().addClass('warning');
                        } else {
                            target.parent().parent().removeClass('warning');
                        }
                    }
                }
            }
        },
        // 选择全部
        selectAll: function(event) {
            var target = $(event.currentTarget),
                that = this;
            if (this.options.selectAble) {
                var isChecked = target.is(':checked');
                var isSelected = isChecked ? true : false;
                if (_.isArray(this.options.data)) {
                    _.each(that.options.data, function(model, index) {
                        model.selected = isSelected;
                    });
                } else {
                    that.options.data.each(function(model, index) {
                        model.set('selected', isSelected);
                    });
                }
                $.each(this.$('td > input[type="checkbox"]'), function(i, el) {
                    if (isChecked) {
                        $(el).prop('checked', true).parent().parent().addClass('warning');
                    } else {
                        $(el).prop("checked", false).parent().parent().removeClass('warning');
                    }
                });
            }
        },
        // 获取
        getSelectedRow: function() {
            var rows = [];
            if (_.isArray(this.options.data)) {
                rows = _.where(this.options.data, { selected: true });
            } else {
                rows = this.options.data.where({ selected: true });
            }
            return rows;
        },
        onDraggable: function(draggObj) {
            var that = this;
            draggObj.draggable({
                revert: true,
                zIndex: 999,
                cursor: "move",
                start: function(event, ui) {
                    var th = ui.helper.parent();
                    that.draggableTh = th;
                    ui.helper.addClass('dd');
                },
                drag: function(event, ui) {
                    ui.position.top = 0;
                },
                stop: function(event, ui) {
                    ui.helper.attr('style', 'cursor: pointer; position: relative;').removeClass('dd');
                }
            });
        },
        onDroppable: function(droppObj) {
            var that = this;
            droppObj.droppable({
                accept: ".ui-droppable",
                over: function(event, ui) {
                    if (ui.helper != $(this)) {
                        $(this).addClass('selected');
                    }
                },
                out: function(event, ui) {
                    if (ui.helper != $(this)) {
                        $(this).removeClass('selected');
                    }
                },
                drop: function(event, ui) {
                    $(this).removeClass('selected');
                    if (ui.helper != $(this)) {
                        var current = ui.helper.parent(),
                            target = $(this).parent(),
                            index = current[0].cellIndex,
                            to = target[0].cellIndex,
                            type = '';
                        if (index > to) {
                            current.insertBefore(target);
                            type = 'prev';
                        } else if (index < to) {
                            current.insertAfter(target);
                            type = 'next';
                        }
                        ui.helper.css('left', 0);
                        HBY.Events.trigger(that.parentId + ':changeCol', { index: index, to: to, type: type });
                    }
                }
            });
        },
        renderAll: function() {
            // 表头
            if (!this.isLoaded) this._renderHeader();
            // 内容区
            if (this.options.data) this._renderBody();
            // 表脚
            this._renderFooter();
            this.isLoaded = true;
            return this;
        },
        _renderHeader: function() {
            var that = this,
                options = this.options,
                hasSub = _.pluck(options.columns, 'children'),
                subCols = _.filter(hasSub, function(col) {
                    return col;
                }),
                theChildren = subCols.length ? _.flatten(subCols) : [];
            if (!options.thead.hide) {
                var theadEl = this.$('#' + this.id + '_thead').empty();
                HBY.view.create({
                    key: this.id + '_thead_tr',
                    el: theadEl,
                    view: 'element:Tr',
                    context: this,
                });
                if (options.selectAble) {
                    var selectColOption = {
                        html: options.checkType !== 'checkbox' ? '' : '<input type="checkbox" value="">',
                        dataIndex: 'checkbox',
                        style: {
                            width: '30px'
                        },
                        attr: {
                            rowspan: subCols.length ? 2 : undefined
                        }
                    };
                    selectColOption.style = $.extend({}, options.thead.colStyle, selectColOption.style);
                    options.columns.unshift(selectColOption);
                }
                var makeTh = function(col, index, isSub) {
                    col.attr = col.attr || {};
                    var theKey = that.id + '_thead_th_' + (isSub ? '1_' : '') + index;
                    if (col.style) {
                        _.extend(col.style, options.thead.colStyle);
                    } else {
                        col.style = options.thead.colStyle;
                    }
                    if (col.hide) col.style.display = 'none';

                    if (col.children) {
                        col.attr.colspan = col.children.length;
                    } else {
                        col.attr.rowspan = subCols.length ? 2 : undefined;
                    }
                    HBY.view.create({
                        key: theKey,
                        el: that.$('#' + that.id + '_thead_tr' + (isSub ? '_1' : '')),
                        view: 'element:Th',
                        context: that,
                        options: col
                    });
                };
                _.each(options.columns, function(col, index) {
                    makeTh(col, index);
                });
                if (subCols.length) {
                    HBY.view.create({
                        key: this.id + '_thead_tr_1',
                        el: theadEl,
                        view: 'element:Tr',
                        context: this,
                    });
                    _.each(theChildren, function(col, index) {
                        makeTh(col, index, 1);
                    });
                }
                // 拖动列宽和排序
                if (options.changeWidthAble || options.sortAble) {
                    this.$('th').html(function() {
                        var contentDiv = $('<div/>'),
                            cellIndex = $(this)[0].cellIndex;
                        contentDiv.html($(this).html());
                        if (!subCols.length) {
                            var isOk = options.selectAble ? cellIndex : 1;
                            if (isOk) {
                                // 排序
                                if (options.sortAble && options.columns[cellIndex].sortAble != false) {
                                    contentDiv.css('cursor', 'pointer').attr('title', '点击排序');
                                    var sortUpEl = $('<span class="caret asc"></span>'),
                                        sortDownEl = $('<span class="caret desc"></span>');
                                    var theCol = options.columns[$(this)[0].cellIndex];
                                    if (theCol) {
                                        if (theCol.sortOrder == 'asc') {
                                            sortUpEl.addClass('active');
                                            sortDownEl.removeClass('active');
                                        }
                                        if (theCol.sortOrder == 'desc') {
                                            sortUpEl.removeClass('active');
                                            sortDownEl.addClass('active');
                                        }
                                    }
                                    contentDiv.append(sortUpEl).append(sortDownEl);
                                }
                                if (options.draggAble) {
                                    // 拖动列
                                    that.onDraggable(contentDiv);
                                    that.onDroppable(contentDiv);
                                }
                            }
                        }
                        return contentDiv;
                    });
                    // 拖动手柄
                    if (!subCols.length) {
                        this.$('th').append('<div class="colHandler"/>');
                    }
                }
            }
        },
        _renderRow: function(item) {
            var index = this.addTimes++;
            var that = this,
                options = this.options,
                groupBy = options.grouping.groupBy,
                mergeRowBy = options.grouping.mergeRowBy,
                theTrId = that.id + '_tbody_tr_' + index,
                theTrEmbedId = that.id + '_tbody_tr_' + index + '_embed';
            if (!item.tr_id) item.tr_id = theTrId;
            item.className = 'tr_' + index;
            HBY.view.create({
                key: theTrId,
                el: this.$('#' + this.id + '_tbody'),
                view: 'element:Tr',
                context: this,
                options: item,
                onInitAfter: function(theKey, context) {
                    if (options.selectAble) {
                        HBY.view.create({
                            key: theTrId + '_td_checkbox',
                            el: '#' + theTrId,
                            view: 'element:Td',
                            context: that,
                            options: {
                                html: '<input type="' + (options.checkType || 'checkbox') + '" name="selectCheck" value="' + theTrId + '">',
                                style: {
                                    width: 30,
                                    verticalAlign: 'middle'
                                }
                            }
                        });
                    }
                    _.each(that.options.columns, function(col, key) {
                        if (key !== 'id' && col.dataIndex !== 'checkbox') {
                            var newOption = $.extend(true, {
                                    className: 'td_' + col.dataIndex,
                                    attr: {
                                        'data-tr': 'tr_' + index
                                    }
                                }, col),
                                val = item[col.dataIndex];
                            delete newOption.text;
                            newOption.html = _.isFunction(col.format) ? col.format(val, col, item) : (val == 0 ? (val + '') : val);
                            if (newOption.hide) {
                                if (newOption.style) {
                                    newOption.style.display = 'none';
                                } else {
                                    newOption.style = { display: 'none' }
                                }
                            }
                            var theColWidth;
                            if (newOption.style.width) {
                                theColWidth = newOption.style.width.toString().indexOf('%') < 0 ? parseInt(newOption.style.width) : newOption.style.width;
                                newOption.style.width = theColWidth;
                            }
                            var tdOptions = {
                                key: theTrId + '_td_' + key,
                                el: '#' + theTrId,
                                view: 'element:Td',
                                context: that,
                                options: newOption
                            };
                            if (groupBy && mergeRowBy == col.dataIndex) {
                                if (item._rowspan) {
                                    tdOptions.options.attr.rowspan = item._rowspan;
                                    HBY.view.create(tdOptions);
                                }
                            } else {
                                HBY.view.create(tdOptions);
                            }
                        }
                    });
                    // 添加已选中样式
                    if (options.selectAble) {
                        if (item.selected) {
                            that.$('#' + theTrId).addClass('warning').find('[type=checkbox]').prop("checked", true);
                        }
                    }
                }
            });
            // 嵌入详情行
            if (_.isObject(options.rowDetail)) {
                HBY.view.create({
                    key: theTrEmbedId,
                    el: this.$('#' + this.id + '_tbody'),
                    view: 'element:Tr',
                    context: this,
                    options: options.rowDetail,
                    onInitAfter: function(theKey, context) {
                        var cols = that.options.columns.length;
                        if (options.selectAble) cols += 1;
                        HBY.view.create({
                            key: theTrEmbedId + '_td_' + index,
                            el: '#' + theTrEmbedId,
                            view: 'element:Td',
                            context: that,
                            options: _.extend(item.detail || {}, {
                                attr: {
                                    'colspan': cols,
                                }
                            })
                        });
                    }
                });
                this.$('#' + theTrEmbedId).prev().addClass('rowDetail');
                if (options.rowDetail.isHidden) this.$('#' + theTrEmbedId).hide();
            }
        },
        _renderBody: function() {
            var that = this,
                options = this.options;
            if (!options.tbody.hide) {
                var tbodyEl = this.$('#' + this.id + '_tbody').empty();
                if (_.isArray(options.data)) {
                    _.each(options.data, function(item, index) {
                        that._renderRow(item, index);
                    });
                } else {
                    if (options.data.models) {
                        options.data.each(function(model, index) {
                            var item = model.attributes;
                            that._renderRow(item, index);
                        });
                    }
                }
            }
        },
        _renderFooter: function() {
            if (!this.options.tfoot.hide) {
                HBY.view.create({
                    key: this.id + '_tfoot_tr',
                    el: '#' + this.id + '_tfoot',
                    view: 'element:Tr',
                    context: this,
                });
            }
        }
    });
    return View;
});
