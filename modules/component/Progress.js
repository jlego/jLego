/*
 * 进度条通用组件类
 * @author: yrh
 * @create: 2016/7/21
 * @update: 2016/8/21
* options: {
    size: '', //sm, xs
    bar: {
        className: '',
        width: 0,
        style: {}
    }
}
 */
define([
    'lib/view/View',
], function(BaseView) {
    var View = BaseView.extend({
        className: 'progress',
        initialize: function(option) {
            var that = this,
                defaults = {
                    options: {
                        size: '', //sm, xs
                        bar: {
                            className: '',
                            value: '0%',
                            title: '',
                            style: {}
                        }
                    }
                };
            if (option) $.extend(true, defaults, option);
            this.context = option.context;
            this.parent(defaults);
            if(!this.options.isStopRender) this.renderAll();
        },
        // 设置进度值
        setValue: function(data) {
            var value = data.value ? (data.value.indexOf('%') >= 0 ? data.value : (data.value)) : '',
                title = data.title || '',
                index = data.index || 0,
                progressbar = index ? this.$('#' + this.id + '_' + index + '_progressbar') : this.$('.progress-bar');
            progressbar.width(value);
            if (this.options.size) {
                var progressVal = $('<span class="sr-only"/>');
                progressVal.text(value || '');
                progressbar.html(progressVal);
            } else {
                if(title){
                    progressbar.text(title);
                }else{
                    progressbar.text(value || '');
                }
            }
        },
        renderAll: function() {
            var that = this,
                size = this.options.size,
                bar = this.options.bar;
            if (size) this.$el.addClass('progress-' + size);
            if (bar) {
                var barArr = [];
                if(!_.isArray(bar)) barArr.push(bar);
                _.each(barArr, function(thebar, index) {
                    var theId = that.id + '_' + index + '_progressbar',
                        progressbar = $('<div class="progress-bar" id="' + theId + '" />');
                    if (thebar.className) progressbar.addClass(thebar.className);
                    if (thebar.style) progressbar.css(thebar.style);
                    that.$el.append(progressbar);
                    that.setValue({
                        title: thebar.title,
                        value: thebar.value,
                        index: index
                    });
                });
            }
        }
    });
    return View;
});
