/*
 * 加载进度通用组件类
 * @author: yrh
 * @create: 2016/7/18
 * @update: 2016/7/18
* options: {
    className: '',
    showText: false,
    icon: '',
    type: 'page',
}
 */
define([
    'lib/view/View',
], function(BaseView) {
    var Template = [
        '<div class="icon-spin <%= icon ? icon : "hby-spinner" %> icon-<%= size ? size : "" %>"></div>',
        '<% if(!text.hide){ %><div class="loading-text"><%= text.html %></div><% } %>'
    ].join('');
    var View = BaseView.extend({
        template: _.template(Template),
        initialize: function(option) {
            var that = this,
                defaults = {
                    options: {
                        container: 'body',
                        text: { //文本内容
                            hide: true, //是否显示文本
                            html: '数据下载中',
                            css: {}
                        },
                        icon: '', //图标样式
                        size: '', //lg, sm
                        isMask: false, //是否显示遮罩
                        isFloat: false, //是否漂浮
                        css: {
                            width: '100%',
                            height: '100%',
                            textAlgin: 'center',
                            backgroundColor: 'transparent'
                        }
                    }
                };
            if (option) $.extend(true, defaults, option);
            this.context = option.context;
            this.parent(defaults);
            // if (!this.options.container) return;
            var theEl = null,
                options = this.options,
                container = options.container;
            if (options.isFloat) {
                var zIndex = 0;
                if (typeof option.el == 'string') {
                    theEl = $(container);
                } else {
                    theEl = container;
                }
                var compare = function(val) {
                    zIndex = val > zIndex ? val : zIndex;
                };
                theEl.children().each(function(index, el) {
                    compare($(el).css('z-index') || 0);
                });
                _.extend(options.css, {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: zIndex + 1
                });
            }
            if (!options.isMask) {
                options.css.backgroundImage = '';
            } else {
                if (navigator.userAgent.indexOf("Firefox") > 0) {
                    _.extend(options.css, {
                        backgroundImage: 'url("' + CONFIG.ROOT_URI + '/img/guide_bg.png")',
                        backgroundRepeat: 'repeat'
                    });
                } else {
                    _.extend(options.css, {
                        backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' style=\'width:100%; height:100%; opacity: 0.6;\'><rect fill=\'#000\' x=\'0\' y=\'0\' width=\'100%\' height=\'100%\'/></svg>")',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '100% 100%',
                        backgroundSize: 'cover'
                    });
                }
            }
            this.$el.html(this.template(options));
            this.$el.css(options.css);
            if (!options.text.hide) {
                if (options.isMask) options.text.css.color = '#fff';
                this.$('.loading-text').css(options.text.css);
            }
        },
        destory: function() {
            var that = this;
            this.$el.fadeOut('normal', function() {
                that.remove();
            });
        }
    });
    return View;
});
