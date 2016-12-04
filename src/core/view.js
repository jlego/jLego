import h from 'virtual-dom/h';
import diff from 'virtual-dom/diff';
import createElement from 'virtual-dom/create-element';
import patch from 'virtual-dom/patch';

class View {
	/**
	 * [constructor description]
	 * @param  {Object} option [description]
	 * @return {[type]}        [description]
	 */
    constructor(option = {}) {
        let defaults = {
            el: '',
            tagName: 'div'
            css: {},
            attr: {},
            template: '',
            on: {},
            promis: {},
            config: {},
            scrollbar: null,
            render: null,
            data: null
        };
        this.options = Object.assign(defaults, option);
        this._setElement(this.options.el);
        this.render();
        // let patches = diff(leftNode, rightNode);
        // patch(rootNode, patches);
    }
    /**
     * [$ description]
     * @param  {[type]} selector [description]
     * @return {[type]}          [description]
     */
    $(selector) {
      return this.$el.find(selector);
    }
    /**
     * [renderInc 渲染嵌套内容]
     * @param  {[type]} containerEl [description]
     * @param  {[type]} options     [description]
     * @param  {[type]} context     [description]
     * @return {[type]}             [description]
     */
    renderInc(containerEl, options, context) {
        let that = this;
        if (options.className) containerEl.addClass(options.className);
        if (options.attr) containerEl.attr(options.attr);
        if (options.style) containerEl.css(options.style);
        let makeContent = function(html) {
            if (typeof html == 'string') {
                // 字符串
                containerEl.append(html);
            } else if (_.isObject(html)) {
                if (_.isFunction(html)) {
                    // 函数
                    containerEl.html(html());
                } else {
                    if (html.key) {
                        // 视图对象
                        Lego.createView(html, context);
                    }
                    // ajax对象
                    if (html.url) {
                        that._getAjaxData(html, containerEl);
                    }
                    // jquery对象
                    if (html instanceof Lego.$) {
                        containerEl.html(html);
                    }
                }
            }
        };
        if (options.html) {
            if (_.isObject(options.html)) {
                if (_.isArray(options.html)) {
                    containerEl.empty();
                    _.each(options.html, function(val, index) {
                        makeContent(val);
                    });
                } else {
                    makeContent(options.html);
                }
            } else {
                containerEl.html(options.html);
            }
        } else {
            if (options.text) containerEl.text(options.text);
        }
        // 是否渲染滚动条
        // if (options.scrollbar) {
        //     if (!containerEl.css('position')) containerEl.css('position', 'relative');
        //     containerEl.perfectScrollbar(options.scrollbar);
        //     containerEl.off("mousemove.ps").on("mousemove.ps", function() {
        //         $(this).perfectScrollbar('update');
        //     });
        // }
    }
    /**
     * [render description]
     * @return {[type]} [description]
     */
    render() {
        let vDom = h(this.options.tagName, this.options.template);
        let rootNode = createElement(vDom);
        this.$el.html(rootNode);
    }
    /**
     * [_setElement description]
     * @param {[type]} el [description]
     */
    _setElement(el) {
        this.$el = el instanceof Lego.$ ? el : Lego.$(el);
        this.el = this.$el[0];
    }
    /**
     * [_removeElement description]
     * @return {[type]} [description]
     */
    _removeElement() {
        this.$el.remove();
    }
    /**
     * [_getAjaxData 获取异步内容]
     * @param  {[type]} option  [description]
     * @param  {[type]} el      [description]
     * @param  {[type]} context [description]
     * @return {[type]}         [description]
     */
    _getAjaxData(option = {}, el, context) {
        let that = context || this,
            _el;
        if (typeof el == 'string') {
            _el = that.$(el);
        } else {
            if (el instanceof Lego.$) _el = el;
        }
        let defaults = {
            type: 'GET',
            dataType: 'html',
            success: function(result) {
                _el.append(result);
            },
            error: function() {
                debug.error('获取数据失败');
            }
        };
        Object.assign(defaults, option);
        let url = defaults.url;
        if (url) {
            if (url.indexOf('http') >= 0 || url.indexOf('./') == 0 || url.indexOf('/') == 0) Lego.$.ajax(defaults);
        } else {
            return;
        }
    }
}
export default View;