
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/contact/list.html'
], function($, _, Backbone, contactListTemplate){

  var contactListView = Backbone.View.extend({
    el: '#content',
    render: function(){
      
			this.collection.each(function (model) {
				console.log(model.get('name'));
			})
			
			this.$el.html(contactListTemplate);
			
			
    }
  });
  return contactListView;
});
