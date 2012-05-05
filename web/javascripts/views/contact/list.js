
define([
  'jquery',
  'underscore',
  'backbone',
  'views/contact/listItem'
], function($, _, Backbone, ListItemView){

  var contactListView = Backbone.View.extend({
	
    el: '#content',
		
		tagName: 'ul',
    
	  render: function(){
      this.collection.each(function (model) {
        this.addOne(model);
      }, this);
    },

    addOne: function(model){
      var listItemView = new ListItemView({model: model});
      this.$el.append(listItemView.render().el);
    }
  });
  
  return contactListView;
});
