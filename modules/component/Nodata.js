/*
 * 暂无数据通用组件类
 * @author: yrh
 * @create: 2016/8/9
 * @update: 2016/8/9
 * options: {}
 */
define([
    'lib/view/View',
], function(BaseView) {
    var View = BaseView.extend({
        initialize: function(option) {
            var that = this,
                defaults = {
                    options: {
                        className: 'nodata',
                        style: {
                            display: 'table',
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#fff'
                        },
                        html: {
                            key: option.key + '_cell',
                            view: 'element:Div',
                            options: {
                                html: '暂无数据',
                                style: {
                                    display: 'table-cell',
                                    verticalAlign: 'middle',
                                    textAlign: 'center',
                                    width: '100%',
                                    height: '100%'
                                }
                            }
                        }
                    }
                };
            if (option) $.extend(true, defaults, option);
            this.context = option.context;
            this.parent(defaults);
        }
    });
    return View;
});
