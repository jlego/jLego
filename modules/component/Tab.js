/*
 * 标签页通用组件类
 * @author: yrh
 * @create: 2016/6/23
 * @update: 2016/6/23
* options: {
    currentIndex: 0,
    multiPage: false,   //是否多页
    data: [{
        url: '',
        html: '',
        style: {},
        attr: {},
        permis: {},
        target: '', //目标面板ID
        content: {} //面板内容
    }]
}
 */
define([
    'lib/view/View',
    'lib/view/component/NavTab',
], function(BaseView, NavView) {
    var View = BaseView.extend({
        initialize: function(option) {
            var that = this,
                defaults = {
                    options: {
                        currentIndex: 0,
                        multiPage: true,
                        data: []
                    }
                };
            if (option) $.extend(true, defaults, option || {});
            this.parent(defaults);
            this.options.data = _.filter(this.options.data, function(val) {
                if (val.permis) {
                    return HBY.permisObj.check(val.permis.module, val.permis.operate);
                } else {
                    return true;
                }
            });
            HBY.view.create({
                key: this.id + '_nav',
                el: this.$el,
                view: NavView,
                context: this,
                options: {
                    currentIndex: this.options.currentIndex,
                    data: this.options.data
                }
            });
            this.oldViewKey = null;
            this.oldIndex = this.options.currentIndex;
            if (!this.options.isStopRender) this.renderAll();
            HBY.Events.off(null, null, this);
            HBY.Events.on(this.id + ':clickItem', this._clickTab, this);
        },
        renderAll: function() {
            var contentEl = this.$('.tab-content').length ? this.$('.tab-content').empty() : $('<div class="tab-content"></div>'),
                that = this,
                options = this.options;
            var TabContent = function(tab, id, index) {
                var contentItemEl = $('<div class="tab-pane"></div>');
                contentItemEl.attr('id', id);
                if (options.currentIndex == index) {
                    contentItemEl.addClass('active');
                    if (tab.content.key) {
                        that.oldViewKey = tab.content.key;
                        tab.content.type = 'component';
                        tab.content.inset = 'html';
                        HBY.createView(tab.content, contentItemEl);
                    } else {
                        if (typeof tab.content == 'string' || tab.content instanceof jQuery) {
                            contentItemEl.empty().append(tab.content);
                        } else {
                            that._getAjaxData(tab.content, '#' + id);
                        }
                    }
                    if(tab.style) contentItemEl.css(tab.style);
                    if (tab.scrollbar) {
                        if (!contentItemEl.css('position')) contentItemEl.css('position', 'relative');
                        contentItemEl.perfectScrollbar(tab.scrollbar);
                        contentItemEl.off("mousemove.ps").on("mousemove.ps", function() {
                            $(this).perfectScrollbar('update');
                        });
                    }
                }
                contentEl.append(contentItemEl.height('100%'));
            };
            if (options.data.length) {
                if (options.multiPage) {
                    _.each(options.data, function(tab, index) {
                        if (tab.content.key) {
                            TabContent(tab, tab.content.key, index);
                        }
                        if (typeof tab.content == 'string') {
                            TabContent(tab, that.id + '_' + index, index);
                        }
                    });
                } else {
                    var tabContentId = this.id + '_tabContent_0';
                    TabContent(options.data[options.currentIndex], tabContentId, options.currentIndex);
                }
            }
            contentEl.height('100%');
            if (!this.$('.tab-content').length) this.$el.append(contentEl);
            return this;
        },
        _clickTab: function(data) {
            var el = data.target,
                target = el.children('a'),
                multiPage = this.options.multiPage,
                that = this;
            this.options.currentIndex = data.index;
            if (target.length) {
                var href = target.attr('href') || '',
                    panelId = target.attr('aria-controls') || this.$('.tab-pane').eq(data.index).attr('id'),
                    tab = el.data('nav'),
                    targetPanelId = panelId ? panelId : ((href.indexOf('#') >= 0 && href) ? href.replace(/#/, '') : '');
                if (!multiPage) {
                    targetPanelId = panelId = this.id + '_tabContent_0';
                } else {
                    if (targetPanelId) this.$('#' + targetPanelId).addClass('active').siblings('div').removeClass('active');
                }
                if (tab.content.key) {
                    if (this.oldViewKey) {
                        HBY.view.remove(this.oldViewKey);
                    }
                    tab.content.type = 'component';
                    tab.content.inset = 'html';
                    HBY.createView(tab.content, this.$('#' + targetPanelId));
                } else {
                    if (typeof tab.content == 'string' || tab.content instanceof jQuery) {
                        this.$('#' + targetPanelId).empty().append(tab.content);
                    } else {
                        this._getAjaxData(tab.content, '#' + panelId);
                    }
                }
                this.oldViewKey = tab.content.key;
            }
            this.oldIndex = this.options.currentIndex
        },
        showTab: function(el) {
            if (el instanceof jQuery) {
                this._clickTab(el);
            }
        }
    });
    return View;
});
