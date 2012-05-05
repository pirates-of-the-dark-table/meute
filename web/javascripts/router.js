
define([
  'jquery',
	'underscore',
	'backbone',
  'views/contact/list',
  'models/contact',
  'collections/contacts',
  'text!../data.json'
], function($, _, Backbone, ContactListView, ContactModel, ContactCollection, data){
  var AppRouter = Backbone.Router.extend({
    routes: {
      'contact/:id': 'showContactAction',
      '*actions': 'defaultAction'
    },

    showContactAction: function(id){

    },

    defaultAction: function(){
			var dataObj = JSON.parse(data);
			var modelsData = [];
			for (var contactId in dataObj) {
				dataObj[contactId].id = contactId;
				modelsData.push(new ContactModel(dataObj[contactId]));
			}
			
			var contacts = new ContactCollection();
			contacts.models = modelsData;
			var view = new ContactListView({collection: contacts});
			view.render();
    },
		
  });
  var initialize = function(){
    var app_router = new AppRouter;
		window.app_router = app_router;
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});
