/**
 * 模态框视图类 
 * @author: yrh
 * @create: 2016/7/1
 * @update: 2016/7/1
 */
define([
    'lib/view/Loader',
    'lib/view/element/Button',
    'lib/view/element/Div',
    'vendor/bootstrap/Modal'
], function(LoaderView, ButtonView, DivView) {
    var Template = [
        '<div class="modal-dialog <%= size ? ("modal-" + size) : "" %>">',
        '<div class="modal-content">',
        '<% if(!header.hide){ %>',
        '<div class="modal-header">',
        '<button type="button" class="close" data-close="modal"><span aria-hidden="true">&times;</span></button>',
        '<h4 class="modal-title"><%= header.title %></h4>',
        '</div>',
        '<% } %>',
        '<div class="modal-body" style="<%= footer.hide ? "bottom: 0;" : "" %>">',
        '<% if(body){ %>',
        '<% if(body.text){ %><p><%= body.text %></p><% } %>',
        '<% } %>',
        '</div>',
        '<% if(!footer.hide){ %>',
        '<div class="modal-footer">',
        '</div>',
        '<% } %>',
        '</div>',
        '</div>'
    ].join('');
    var view = LoaderView.extend({
        className: 'modal',
        template: _.template(Template),
        events: {
            'click [data-close]': function(){
                this.closeModal();
            },
            'click .modal-footer button': '_onbutton',
            'click .modal-dialog': function(event) {
                event.stopPropagation();
            },
            'click': function(){
                this.closeModal();
            }
        },
        animates: {
            'fadeIn': 'fadeOut',
            'slideInRight': 'slideOutRight'
        },
        initialize: function(option) {
            var that = this,
                defaults = {
                    options: {
                        size: '', //lg,md,sm
                        isMask: true, //是否显示遮罩
                        isDialog: false, //类型 modal, dialog
                        position: '', //显示位置top,right,bottom,left,full
                        keyboard: true,
                        dialog: {

                        },
                        // confirm: {
                        //     type: 'warning',
                        //     content: '确定要删除此选项吗?'
                        // },
                        header: {
                            title: 'modal title',
                            hide: false
                        },
                        body: {
                            html: null, //自定义布局内容
                            style: {
                                width: '100%'
                            }
                        },
                        footer: {
                            hide: false,
                            buttons: [{
                                text: '关闭',
                                isClose: true,
                                className: 'btn btn-primary btn-o',
                                click: function() {}
                            }]
                        }
                    }
                };
            if (option) $.extend(true, defaults, option);
            this.context = option.context;
            this.parent(defaults);
            var size = this.options.size,
                header = this.options.header,
                body = this.options.body,
                footer = this.options.footer,
                width = this.options.dialog.width,
                height = this.options.dialog.height,
                position = this.options.position,
                isDialog = this.options.isDialog;
            if(!isDialog){
                body.style.position = 'absolute';
                body.scrollbar = {};
            }
            if (this.template) {
                this.$el.html(this.template(this.options));
            }
            if (size) this.$el.addClass('bs-example-modal-' + size);
            if (header.style) this.$('.modal-header').css(header.style);
            if (body.style) this.$('.modal-body').css(body.style);
            if (footer.style) this.$('.modal-footer').css(footer.style);
            this.renderHtml(this.$('.modal-body'), body, this.$('.modal-body'));
            var style = {
                    width: width || undefined,
                    height: height || undefined
                },
                modalDialog = this.$('.modal-dialog'),
                modalHeader = this.$('.modal-header'),
                modalBody = this.$('.modal-body'),
                modalFooter = this.$('.modal-footer');
            if (position == 'right' || position == 'full') {
                if (position == 'full') style.width = $('body').width() - $('#sidebar').width();
                // this.noMask = true;
                this.$el.addClass('right-modal');
                var headerHeight = $('header').height();
                _.extend(style, {
                    position: 'absolute',
                    height: $('body').height() - headerHeight,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    height: '100%',
                    margin: 0,
                    padding: headerHeight + 'px 0 0'
                });
            } else {
                if ((width && height) || isDialog) {
                    this.options.isMask = true;
                    _.extend(style, {
                        position: 'absolute',
                        marginTop: -(height || 200) / 2,
                        marginLeft: -(width || (size == 'sm' ? 300 : (size == 'lg' ? 900 : 600))) / 2,
                        top: '45%',
                        left: '50%',
                    });
                }
            }
            modalDialog.css(style);
            _.each(this.options.footer.buttons, function(button, index) {
                var theBtnView = HBY.view.create({
                    key: that.id + '_btn_' + index,
                    el: modalFooter,
                    context: that,
                    view: ButtonView,
                    options: button
                });
                theBtnView.$el.attr('data-index', index);
                if (button.isClose) theBtnView.$el.attr('data-close', 'modal');
            });
        },
        // 关闭窗口
        closeModal: function(isClose) {
            var animateName = this.$el.data('animate'),
                that = this;
            var _closeModel = function() {
                if (animateName) {
                    that.$el.animateCss('animated ' + that.animates[animateName], function() {
                        that.$el.modal('hide');
                    });
                    $('.modal-backdrop').fadeOut();
                } else {
                    that.$el.modal('hide');
                }
            };
            if (this.options.confirm && !isClose) {
                HBY.util.System.showDialog({
                    type: this.options.confirm.type || 'warning',
                    content: this.options.confirm.content || '你确定退出?',
                    buttons: [{}, {
                        click: function(e) {
                            _closeModel();
                            HBY.view.get('dialog').closeModal();
                        }
                    }]
                });
            } else {
                _closeModel();
            }
        },
        // 点击按钮
        _onbutton: function(event) {
            event.stopPropagation();
            var target = $(event.currentTarget),
                that = this,
                index = target.data('index'),
                theButton = this.options.footer.buttons[index];
            if (_.isFunction(theButton.click)) theButton.click(event);
        }
    });
    return view;
});