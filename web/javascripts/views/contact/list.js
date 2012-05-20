
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/contact/list.html',
    'views/contact/listItem'
], function($, _, Backbone, template, ListItemView){

    var contactListView = Backbone.View.extend({
	      
        el: '#contacts',
	      
        template: _.template(template),
		    
		    initialize: function(){
			      this.collection.on("add", function(model) {
				        this.addOne(model);
			      }, this);

            this.collection.on("remove", function(model) {
                this.removeOne(model);
            }, this)
		    },
        
	      render: function(){
            this.$el.html(this.template(/*this.model.toJSON()*/));
            this.collection.each(function (model) {
                this.addOne(model);
            }, this);
        },

        removeOne: function(model) {
            this.$('#contact-' + model.id).remove();
        },

        addOne: function(model){
            var listItemView = new ListItemView({model: model});
            this.$('#contact-list').append(listItemView.render().el);
        }
    });
    
    return contactListView;
});
