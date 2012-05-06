
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
		},
    
	  render: function(){
      this.$el.html(this.template(/*this.model.toJSON()*/));
      this.collection.each(function (model) {
        this.addOne(model);
      }, this);
    },

    addOne: function(model){
      var listItemView = new ListItemView({model: model});
      this.$('#contact-list').append(listItemView.render().el);
    }
  });
  
  return contactListView;
});
