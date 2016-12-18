/*
 * 评分通用组件类
 * @author: yrh
 * @create: 2016/7/21
 * @update: 2016/7/21
 * options: {
    input: {
        type: 'hidden',
        className: 'rating',
        fractions: 2,   //每星平分多少份
        stop: 10,    //最大分数
        filled: '', //自定义已选图标样式
        empty: ''   //自定义未选图标样式
    },
    label: {
        className: 'label-success'
    },
    tooltip: {
        title: '',  //提示文本，为空时不显示，有内空时，分数在末尾显示，可以插入“###”作为分数替换符
        container: 'body',
        placement: 'top'
    }
 * }
 * //方法
 * $('input').rating('rate', 2.5); //设值
 * var rate = $('input').rating('rate'); //取值
 */
define([
    'lib/view/View',
    'lib/view/component/Label',
    'lib/view/component/Badge',
    'lib/view/element/Input',
    'vendor/bootstrap/Tooltip',
    'rating',
], function(BaseView, LabelView, BadgeView, InputView) {
    var View = BaseView.extend({
        initialize: function(option) {
            var that = this,
                defaults = {
                    options: {
                        input: {
                            type: 'hidden',
                            className: 'rating',
                            fractions: 0,
                            step: 2,
                            start: 0,
                            stop: 10,
                            filled: '',
                            filledSelected: '',
                            empty: ''
                        },
                        label: {
                            isBadge: false,
                            className: ''
                        },
                        tooltip: {
                            title: '',
                            container: 'body',
                            placement: 'top'
                        }
                    }
                };
            if (option) $.extend(true, defaults, option);
            this.context = option.context;
            this.parent(defaults);
            if(!this.options.isStopRender) this.renderAll();
        },
        renderAll: function() {
            var that = this,
                inputOption = this.options.input,
                ratingConfig = {
                    step: inputOption.step,
                    start: inputOption.start,
                    stop: inputOption.stop
                },
                inputAttr = {
                    'data-stop': inputOption.stop
                },
                tooltipOption = this.options.tooltip,
                labelOption = this.options.label,
                labelName = labelOption.isBadge ? 'badge' : 'label';
            if(!labelOption.className) labelOption.className = labelName + '-success';
            if (inputOption.fractions) inputAttr['data-fractions'] = inputOption.fractions;
            if (inputOption.filled) inputAttr['data-filled'] = inputOption.filled;
            if (inputOption.empty) inputAttr['data-empty'] = inputOption.empty;
            inputOption.attr = inputAttr;
            if(tooltipOption.title) inputOption.className = 'rating-tooltip';
            HBY.view.create({
                key: this.id + '_input',
                el: this.$el,
                inset: 'html',
                context: this,
                view: InputView,
                options: inputOption || {}
            });
            HBY.view.create({
                key: this.id + '_' + labelName,
                el: this.$el,
                context: this,
                view: labelOption.isBadge ? BadgeView : LabelView,
                options: labelOption || {}
            });
            this.$('.rating, .rating-tooltip').each(function() {
                $(this).val() > 0 ? $(this).next("." + labelName).show().text($(this).val() || ' ') : $(this).next("." + labelName).hide();
            });

            if (tooltipOption.title) {
                var theTitle = tooltipOption.title;
                ratingConfig.extendSymbol = function(rate) {
                    if(theTitle.indexOf('###') >= 0){
                        tooltipOption.title = theTitle.replace(/###/g, rate);
                    }else{
                        tooltipOption.title = theTitle + rate;
                    }
                    $(this).tooltip(tooltipOption);
                };
            }
            this.$('.rating, .rating-tooltip').rating(ratingConfig);
            this.$('.rating, .rating-tooltip').on('change', function() {
                $(this).next("." + labelName).show().text($(this).val());
            });
        }
    });
    return View;
});
