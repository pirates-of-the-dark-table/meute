define([
  'underscore',
  'backbone',
	'models/contact'
], function(_, Backbone, ContactModel) {
  var ContactCollection = Backbone.Collection.extend({
		
		model: ContactModel,
		
		localStorage: new Store("todos-backbone")
	
	});
  return ContactCollection;
});

