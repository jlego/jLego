/*
 * 导航通用组件类
 * @author: yrh
 * @create: 2016/6/21
 * @update: 2016/6/21
* options: {
    className: 'nav nav-tabs',nav-justified
    tabsAlgin: 'left',
    //type: 'horizontal/vertical',
    currentNavId: '',
    data: [{
        url: '',
        html: '',
        style: {},
        attr: {},
        permis: {}
    }]
}
 */
define([
    'lib/view/component/Dropdown',
], function(DropdownView) {
    var Template = [
        '<a href="<%= url || \'javascript:;\' %>" <%= content ? (content.key ? ("aria-controls=\'" + content.key + "\'") : "") : "" %> <%= data.length ? "class=\'dropdown-toggle\'" : "" %>>',
        '<%= html ? html : (text ? text : "") %>',
        '<%= data.length ? ("<span class=\'caret " + (level.toString().length > 2 ? "sub" : "") + "\'></span>") : "" %></a>'
    ].join('');
    var View = DropdownView.extend({
        tagName: 'ul',
        className: 'nav nav-tabs',
        events: {
            'click li:not(.noNav)': '_clickItem'
        },
        initialize: function(option) {
            var that = this,
                defaults = {
                    options: {
                        button: null,
                        currentIndex: 0,
                        itemsTpl: Template,
                        data: []
                    }
                };
            if (option) $.extend(true, defaults, option);
            this.context = option.context;
            this.datas = {};
            this.parent(defaults);
        }
    });
    return View;
});
