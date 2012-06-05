
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
            this.toggleEmpty(true);
          }, this);
          this.collection.on("remove", function(model) {
            this.removeOne(model);
            this.toggleEmpty();
          }, this);
		    },
        
	      render: function(){
            this.$el.html(this.template(/*this.model.toJSON()*/));

            this.emptyListEl = this.$('#contact-list-empty');
            this.toggleEmpty();

            this.collection.each(function (model) {
              this.addOne(model);
            }, this);
        },

        removeOne: function(model) {
            this.$('#contact-' + model.id).remove();
        },

        addOne: function(model){
            var listItemView = new ListItemView({model: model});
            this.$('#contact-list ul').append(listItemView.render().el);
        },

        toggleEmpty: function(notEmpty) {
          if (notEmpty || this.collection.length) {
            this.emptyListEl.hide();
          } else {
            this.emptyListEl.show();
          }
        }
    });
    
    return contactListView;
});
