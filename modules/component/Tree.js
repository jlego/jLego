/*
 * 树型通用组件类
 * @author: yrh
 * @create: 2016/8/6
 * @update: 2016/8/6
 * options: {}
 */
define([
    'lib/view/View',
    'ztree'
], function(BaseView) {
    var View = BaseView.extend({
        tagName: 'ul',
        className: 'ztree',
        asset: {
            css: {
                'tree': '/js/lib/vendor/ui/zTree/css/zTreeStyle.css'
            }
        },
        initialize: function(option) {
            var that = this,
                defaults = {
                    options: {
                        setting: {
                            check: {
                                // enable: true,
                                // chkStyle: "radio",
                                // radioType: "level"
                            },
                            data: {
                                simpleData: {
                                    enable: true
                                }
                            },
                            callback: {
                                // beforeClick: beforeClick,
                                // onCheck: onCheck
                            }
                        },
                        data: []
                    }
                };
            if (option) $.extend(true, defaults, option);
            this.context = option.context;
            this.parent(defaults);
            if (!this.options.isStopRender) this.renderAll();
        },
        // 组装数据集数据
        makeData: function(collection) {
            var newData = [];
            if (this.collection.models) {
                this.collection.each(function(model, index) {
                    newData.push(model.attributes);
                });
            }
            this.options.data = newData;
            this.renderAll();
        },
        // 取消选择
        clearChecked: function(field, data) {
            var ztree = $.fn.zTree.getZTreeObj(that.id);
            if (data.treeId) {
                var node = ztree.getNodeByParam(field, data.treeId, null);
                if (node) {
                    ztree.checkNode(node, false, false);
                }
            }
        },
        renderAll: function() {
            $.fn.zTree.init(this.$el, this.options.setting, this.options.data);
            return this;
        }
    });
    return View;
});
