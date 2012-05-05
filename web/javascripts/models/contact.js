define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var ContactModel = Backbone.Model.extend({
		defaults: {
			name: null
	  }
  });
  return ContactModel;
});

