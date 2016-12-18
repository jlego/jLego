/*
 * 路径导航通用组件类
 * @author: yrh
 * @create: 2016/7/22
 * @update: 2016/7/22
* options: {
* data: [{
*     text: '',
*     url: ''
* }]
* }
 */
define([
    'lib/view/View',
], function(BaseView) {
    var View = BaseView.extend({
        tagName: 'ol',
        initialize: function(option) {
            var that = this,
                defaults = {
                    options: {
                        className: 'breadcrumb',
                        data: [],
                    }
                };
            if (option) $.extend(true, defaults, option);
            this.context = option.context;
            this.parent(defaults);
            if(!this.options.isStopRender) this.renderAll();
        },
        renderAll: function(){
            var that = this,
                data = this.options.data;
            this.$el.empty();
            if(data.length){
                _.each(data, function(item, index){
                    var li = $('<li/>'),
                        text = item.text ? item.text : (item.html ? item.html : '');
                    if(data.length - 1 == index){
                        li.html(text).addClass('active');
                    }else{
                        li.html('<a href="' + (item.url || '#') + '">' + text + '</a>');
                    }
                    that.$el.append(li);
                });
            }
        }
    });
    return View;
});
