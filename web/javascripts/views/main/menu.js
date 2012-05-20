define([
    'jquery',
    'underscore',
    'text!templates/main/menu.html'
], function($, _, template){

    var View = Backbone.View.extend({

        tagName: 'div',

        el: $('<div id="menu">'),

        template: _.template(template),

        render: function(){
            this.$el.addClass('navbar navbar-fixed-top');
            this.$el.html(this.template({
                items: this.collection
            }));
            this.rendered = true;
            return this;
        },

        setActive: function(key) {
            this.activeKey = key;
            this.$el.find('li.active').removeClass('active');
            if(this.activeKey) {
                this.$el.find('li.' + key).addClass('active');
            }
        }
		    
    });

    return View;
});
