define([
    'jquery',
    'underscore',
    'text!templates/main/menu.html'
], function($, _, template){

    var View = Backbone.View.extend({

        tagName: 'div',

        el: $('#menu'),

        template: _.template(template),

        render: function(){
            this.$el.addClass('navbar navbar-fixed-top');
            this.$el.html(this.template({
                items: this.collection
            }));
            if(this.activeKey) {
                this.setActive(this.activeKey);
            }
            return this;
        },

        setActive: function(key) {
            this.activeKey = key;
            this.$el.find('li.active').removeClass('active');
            this.$el.find('li.' + key).addClass('active');
        }
		    
    });

    return View;
});
