/*
 * 数据表格通用组件类
 * @author: yrh
 * @create: 2016/6/28
 * @update: 2016/7/9
 */
define([
    'lib/view/Loader',
    'lib/view/component/Dropdown'
], function(LoaderView, DropdownView) {
    var View = LoaderView.extend({
        events: {
            'change th input[type="checkbox"]': 'selectAll',
            'mousemove th': '_mousemoveTh',
            'mousedown .colHandler': '_mousedownTh',
            'click th > div': 'sortData'
        },
        initialize: function(option) {
            var that = this,
                defaults = {
                    options: {
                        isAutoLoad: false,
                        className: 'table table-hover',
                        style: {
                            height: '100%',
                            borderRadius: 0,
                        },
                        selectAble: true, //是否可选
                        checkType: 'checkbox', //radio
                        editAble: false, //是否可编辑
                        hideAble: true, //是否可隐藏
                        changeWidthAble: false, //是否可以拖动改变列宽
                        sortAble: false, //是否可排序
                        isSortMany: false, //是否多字段排序
                        draggAble: false, //是否可拖动
                        hideColSetting: false, //隐藏列设置
                        hideScroll: false, //隐藏竖滚动条
                        nodata: {},
                        loading: {
                            container: '.panel-body'
                        },
                        thead: {
                            hide: false,
                            colStyle: {
                                textAlign: 'left'
                            }
                        },
                        tbody: {
                            hide: false,
                        },
                        tfoot: {
                            hide: false,
                            style: {
                                padding: 0
                            }
                        },
                        columns: [],
                        columnsMemoryData: null, //列记忆功能数据
                        columnsMemorySave: function(data) {}, //列记忆功能回调方法
                        rowItem: [],
                        data: []
                    }
                };
            if (option) $.extend(true, defaults, option || {});
            // this.tableWidth = 0;
            this.isloaded = false;
            this.listView = null;
            this.collection = null;
            this.columnsMemoryData = option.options.columnsMemoryData;
            this.parent(defaults);
            // 自定义事件
            HBY.Events.off(this.id + ':showHideCol', null, this);
            HBY.Events.off(this.id + ':changeCol', null, this);
            HBY.Events.on(this.id + ':showHideCol', this._showHideCol, this);
            HBY.Events.on(this.id + ':changeCol', this._changeCol, this);
            // 是否有多级子列
            if (this.options.columns) {
                var hasSub = _.pluck(this.options.columns, 'children');
                this.subCols = _.filter(hasSub, function(col) {
                    return col;
                });
                // this.tableWidth = 0;
                // 列宽
                this._getColWidth();
                // if (!this.isloaded) {
                this._renderFrame();
                this._makColsData();
                // 表头
                this._renderHeader();
                // 显示和隐藏列
                if (!this.options.hideColSetting && !this.subCols.length && this.options.columns) {
                    this._colSetting();
                }
                // }
            }
        },
        _makColsData: function() {
            var that = this;
            // this.colsData = [];
            if (this.options.columns) {
                _.each(this.options.columns, function(val, index) {
                    if (val.children) {
                        _.each(val.children, function(col, i) {
                            col.hide = col.hide || false;
                            // that.colsData.push(col);
                        });
                    } else {
                        val.hide = val.hide || false;
                        // that.colsData.push(val);
                    }
                });
            }
        },
        // 组装数据集数据
        makeData: function(collection) {
            this.options.data = collection;
            this.renderAll();
        },
        // 渲染视图
        renderAll: function() {
            var that = this;
            if (this.options.data.length) {
                // 表体
                this._renderBody();
            } else {
                HBY.view.create({
                    key: this.id + '_nodata',
                    el: '.panel-body',
                    view: 'component:Nodata',
                    context: this,
                    inset: 'html',
                    options: this.options.nodata
                });
            }
            this.isloaded = true;
            return this;
        },
        _renderFrame: function() {
            this.settingHeight = this.headerHeight = !this.options.thead.hide ? (this.subCols.length ? '71px' : '38px') : 0;
            this.$el.css('position', 'relative');
            var dataTableStyle = {
                    marginBottom: 0,
                    height: '100%',
                    position: 'relative',
                    borderRadius: 0,
                    borderTop: '1px solid #ddd',
                    overflow: 'hidden'
                },
                headerStyle = {
                    padding: 0,
                    minHeight: 'inherit',
                    // marginRight: 17,
                    borderBottom: '1px solid #ddd',
                    overflowX: 'hidden',
                    borderRadius: 0,
                    position: 'relative'
                },
                bodyStyle = {
                    padding: 0,
                    overflowY: this.options.hideScroll ? 'hidden' : 'scroll',
                    position: 'absolute',
                    marginBottom: (this.options.tfoot.hide ? 0 : 48),
                    marginTop: this.headerHeight,
                    backgroundColor: '#fff',
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                },
                footerStyle = {
                    position: 'absolute',
                    borderRadius: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 48
                };
            HBY.view.create({
                key: this.id + '_panel',
                el: this.$el,
                view: 'component:Panel',
                context: this,
                inset: 'html',
                options: {
                    style: this.options.style ? _.extend(dataTableStyle, this.options.style) : dataTableStyle,
                    header: {
                        html: '',
                        hide: this.options.thead.hide,
                        className: 'panel-heading border-light',
                        style: this.options.thead.style ? _.extend(this.options.thead.style, headerStyle) : headerStyle,
                    },
                    body: {
                        scrollbar: {},
                        html: this.options.tbody.html || '',
                        style: this.options.tbody.style ? _.extend(this.options.tbody.style, bodyStyle) : bodyStyle,
                    },
                    footer: {
                        html: this.options.tfoot.html || '&nbsp',
                        hide: this.options.tfoot.hide,
                        style: this.options.tfoot.style ? _.extend(this.options.tfoot.style, footerStyle) : footerStyle
                    }
                }
            });
            // 禁止选中
            if (this.options.changeWidthAble) {
                this.$('.panel-heading').on("selectstart", function() {
                    return false;
                });
            }
        },
        _renderHeader: function() {
            HBY.view.create({
                key: this.id + '_header',
                el: '.panel-heading',
                view: 'component:Table',
                context: this,
                inset: 'html',
                options: {
                    selectAble: this.options.selectAble, //是否可选
                    checkType: this.options.checkType, //radio
                    sortAble: this.options.sortAble,
                    draggAble: this.options.draggAble,
                    changeWidthAble: this.options.changeWidthAble,
                    thead: {
                        style: this.options.thead.style,
                        colStyle: this.options.thead.colStyle,
                    },
                    tbody: {
                        hide: true,
                    },
                    tfoot: {
                        hide: true,
                    },
                    columns: this.options.columns,
                    // colsData: this.colsData,
                    style: {
                        backgroundColor: 'transparent',
                        width: this.tableWidth || '100%',
                        marginBottom: 0
                    }
                }
            });
            // 光标小竖线
            var theLine = $('<div id="line"/>');
            theLine.css({
                width: 1,
                height: '100%',
                borderLeft: '1px solid #000000',
                position: 'absolute',
                top: 0,
                display: 'none'
            });
            this.$('.panel-heading').append(theLine);
        },
        _renderBody: function() {
            this.listView = HBY.view.create({
                key: this.id + '_bodyer',
                el: '.panel-body',
                view: 'component:Table',
                context: this,
                inset: 'html',
                options: {
                    selectAble: this.options.selectAble, //是否可选
                    checkType: this.options.checkType, //radio
                    thead: {
                        hide: true,
                    },
                    tfoot: {
                        hide: true,
                    },
                    columns: this.options.columns,
                    // colsData: this.colsData,
                    data: this.options.data,
                    style: {
                        width: this.tableWidth || '100%',
                        marginBottom: 0,
                    }
                }
            });
            // 同步横向滚动
            var heading = this.$('.panel-heading');
            this.$('.panel-body').scroll(function() {
                heading.scrollLeft($(this).scrollLeft());
            });
        },
        // 拖动列宽
        _mousemoveTh: function(event) {
            if (this.options.changeWidthAble && !this.subCols.length) {
                var th = $(event.currentTarget);
                //不给第一列和最后一列添加效果
                if (th.prevAll().length <= 0 || th.nextAll().length < 1) {
                    return;
                }
                var left = th.offset().left;
                //距离表头边框线左右4像素才触发效果
                if (event.clientX - left < 0 || (th.width() - (event.clientX - left)) < 5) {
                    th.find('.colHandler').css({ 'cursor': 'col-resize' });
                } else {
                    th.find('.colHandler').css({ 'cursor': 'default' });
                }
            }
        },
        // 按下拖动列宽
        _mousedownTh: function(event) {
            // event.stopPropagation();
            var that = this,
                lineEl = this.$("#line"),
                currTh = $(event.currentTarget).parent(),
                isMove = 0;
            if (this.options.changeWidthAble && !this.subCols.length) {
                this.$('.panel-heading').on("mousemove.datatable", function(e) {
                    isMove = 1;
                    var pos = $(this).offset();
                    lineEl.css({ "left": e.clientX - pos.left }).show();
                }).on('mouseup.datatable', function(e) {
                    $(this).off('mousemove.datatable');
                    if (isMove) {
                        isMove = 0;
                        lineEl.hide();
                        var pos = currTh.offset(),
                            index = currTh.prevAll().length,
                            colWidth = e.clientX - pos.left,
                            theCol = that.options.columns[that.options.selectAble ? (index - 1) : index];
                        if (theCol) {
                            if (theCol.style) {
                                theCol.style.width = colWidth;
                            } else {
                                theCol.style = {
                                    width: colWidth
                                }
                            }
                        }
                        that._getColWidth();
                        that.$('.panel-heading > table, .panel-body > table').width(that.tableWidth);
                        currTh.width(colWidth);
                        that.$(".panel-body tr").each(function(i, el) {
                            $(el).children().eq(index).width(colWidth);
                        });
                        $(this).off('mouseup.datatable');
                        var data = { dataIndex: theCol.dataIndex, width: colWidth };
                        HBY.Events.trigger(that.id + ':changeColWidth', data);
                        that.changeColWidthCallBack(data);
                    }
                });
            }
        },
        // 获取列宽
        _getColWidth: function() {
            var colWidth = 20,
                that = this,
                hasWidth = false,
                colArr = _.filter(this.options.columns, function(val) {
                    return !val.hide && !val.children;
                }),
                theChildren = this.subCols.length ? _.flatten(this.subCols) : [];
            this.tableWidth = 0;
            if (theChildren.length) colArr = _.union(colArr, theChildren);
            if (colArr.length) {
                colWidth = ((100 / colArr.length) - 1);
                if (colWidth < 20) colWidth = 20;
            }
            var getWidth = function(val) {
                if (!val.style) {
                    that.tableWidth = '100%';
                    val.style = {
                        width: colWidth + '%'
                    }
                } else {
                    if (val.style.width && that.tableWidth != '100%') {
                        hasWidth = true;
                        that.tableWidth += parseInt(val.style.width);
                    } else {
                        that.tableWidth = '100%';
                        val.style.width = hasWidth ? 'auto' : (colWidth + '%');
                    }
                }
            };
            _.each(colArr, function(val, index) {
                if (val.children) {
                    _.each(val.children, function(col, i) {
                        getWidth(col);
                    });
                } else {
                    getWidth(val);
                }
            });
            if (this.options.selectAble) this.tableWidth += 30;
        },
        // 显示隐藏列下拉菜单
        _colSetting: function() {
            var that = this,
                dropdownData = [],
                theKey = this.id + '_cols_setting';
            if (this.$('#' + theKey).length) this.$('#' + theKey).remove();
            _.each(this.options.columns, function(val, index) {
                if (that.options.hideAble) {
                    var _val = $.extend({}, val);
                    _val.index = index;
                    delete _val.style;
                    if (!_val.isColSettingHidden) dropdownData.push(_val);
                }
            });
            var Dropdown = DropdownView.extend({
                events: {
                    'click .checkbox': '_clickCheckbox'
                },
                initialize: function(option) {
                    this.parent(option);
                },
                _clickCheckbox: function(event) {
                    var target = $(event.currentTarget),
                        theCheckbox = target.find('input[type="checkbox"]'),
                        index = target.data('index'),
                        isShow = theCheckbox.is(':checked') ? 1 : 0;
                    var col = that.options.columns[index];
                    var theCol = _.findWhere(that.options.columns, { dataIndex: col.dataIndex });
                    if (col) {
                        col.hide = theCol.hide = !isShow;
                    }
                    var data = { show: isShow, index: index, dataIndex: col.dataIndex, col: col };
                    HBY.Events.trigger(that.id + ':showHideCol', data);
                    that.showHideColCallBack(data);
                }
            });
            var itemsTpl = [
                '<a href="javascript:;"><div class="checkbox" style="margin:0" data-index="<%= index %>"><label>',
                '<input type="checkbox" value="" <%= !hide ? "checked=\'checked\'" : "" %>>',
                ' <%= text ? text : "" %></label></div></a>',
            ].join('');
            HBY.view.create({
                key: theKey,
                el: this.$el,
                view: Dropdown,
                context: this,
                options: {
                    style: {
                        position: 'absolute',
                        right: 0,
                        top: 1,
                        width: 18,
                        height: this.settingHeight,
                        zIndex: 999,
                        borderLeft: '1px #ddd solid',
                        borderBottom: '1px #ddd solid',
                    },
                    className: 'dropdown cols_setting',
                    direction: 'down',
                    button: [{
                        className: 'btn btn-default dropdown-toggle',
                        style: {
                            border: 'none',
                            borderRadius: 0,
                            padding: '6px 5px',
                            height: '100%',
                            backgroundColor: '#f5f5f5',
                        }
                    }],
                    data: dropdownData,
                    itemsTpl: itemsTpl
                }
            });
        },
        // 显示和隐藏列
        _showHideCol: function(data) {
            // this.tableWidth = 0;
            this._getColWidth();
            this._renderHeader();
            this._renderBody();
        },
        // 改变列顺序
        _changeCol: function(data) {
            var index = data.index - (this.options.selectAble ? 1 : 0),
                to = data.to - (this.options.selectAble ? 1 : 0),
                theCol = this.options.columns.splice(index, 1)[0],
                that = this;
            if (index > to) {
                this.options.columns.splice(to, 0, theCol);
            } else if (index < to) {
                this.options.columns.splice(to, 0, theCol);
            }
            this.$('.panel-body tr').each(function(i, tr) {
                var theTd = $(tr).children().eq(data.index),
                    toTd = $(tr).children().eq(data.to);
                if (data.type == 'prev') {
                    theTd.insertBefore(toTd);
                } else if (data.type == 'next') {
                    theTd.insertAfter(toTd);
                }
            });
            if (!this.options.hideColSetting) {
                this._colSetting();
            }
            var indexData = {};
            _.each(this.options.columns, function(val, index) {
                var columns = that.columnsMemoryData.columns || {},
                    colData = columns[val.dataIndex];
                indexData[val.dataIndex] = _.extend(colData || {}, {
                    index: index,
                    hide: val.hide
                });
            });
            HBY.Events.trigger(this.id + ':index', indexData);
            this.indexCallBack(indexData);
        },
        // 选择全部行
        selectAll: function(event) {
            this.listView.selectAll(event);
        },
        // 获取选中行
        getSelectedRow: function() {
            var rows = [];
            if (!this.listView) return [];
            if (_.isArray(this.listView.options.data)) {
                rows = _.where(this.listView.options.data, { selected: true });
            } else {
                rows = this.listView.options.data.where({ selected: true });
            }
            return rows;
        },
        // 排序
        sortData: function(event) {
            var target = $(event.currentTarget);
            if (this.options.sortAble && !this.subCols.length && target.children('span').length) {
                var target = $(event.currentTarget),
                    th = target.parent(),
                    columns = this.options.columns,
                    theCol = columns[th[0].cellIndex - (this.options.selectAble ? 1 : 0)];
                if (!this.options.isSortMany) {
                    _.each(columns, function(col, index) {
                        if (col != theCol) col.sortOrder = '';
                    });
                }
                if (theCol) {
                    if (theCol.sortOrder == 'desc') {
                        theCol.sortOrder = '';
                    } else if (theCol.sortOrder == 'asc') {
                        theCol.sortOrder = 'desc';
                    } else if (!theCol.sortOrder) {
                        theCol.sortOrder = 'asc';
                    }
                    target.parents('tr').find('.caret.active').removeClass('active');
                    if (theCol.sortOrder) target.find('.caret.' + theCol.sortOrder).addClass('active');
                    var data = { orderField: theCol.dataIndex, orderBy: theCol.sortOrder };
                    HBY.Events.trigger(this.id + ':sort', data);
                    this.sortCallBack(data);
                }
            }
        },
        // 排序回调
        sortCallBack: function(data) {
            if (data) {
                if (this.columnsMemoryData) {
                    this.columnsMemoryData.orderField = data.orderField;
                    this.columnsMemoryData.orderBy = data.orderBy;
                }
                if (typeof this.options.columnsMemorySave == 'function') this.options.columnsMemorySave(data);
            }
            if (this.collection) {
                this.collection.loadData({
                    params: data || {}
                });
            }
        },
        // 列排序回调
        indexCallBack: function(data) {
            if (data) {
                if (this.columnsMemoryData) {
                    this.columnsMemoryData.columns = data;
                }
                if (typeof this.options.columnsMemorySave == 'function') this.options.columnsMemorySave(data);
            }
        },
        // 显示隐藏列回调
        showHideColCallBack: function(data) {
            if (data) {
                if (this.columnsMemoryData) {
                    this.columnsMemoryData.columns[data.dataIndex] = this.columnsMemoryData.columns[data.dataIndex] || {};
                    this.columnsMemoryData.columns[data.dataIndex].hide = !data.show;
                }
                if (typeof this.options.columnsMemorySave == 'function') this.options.columnsMemorySave(data);
            }
        },
        // 改变列宽度回调
        changeColWidthCallBack: function(data) {
            if (data) {
                if (this.columnsMemoryData) {
                    this.columnsMemoryData.columns[data.dataIndex] = this.columnsMemoryData.columns[data.dataIndex] || {};
                    this.columnsMemoryData.columns[data.dataIndex].width = data.width;
                }
                if (typeof this.options.columnsMemorySave == 'function') this.options.columnsMemorySave(data);
            }
        }
    });
    return View;
});
