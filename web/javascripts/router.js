
define([
  'jquery',
	'underscore',
	'backbone',
  'views/contact/list',
  'models/contact',
  'collections/contacts'
], function($, _, Backbone, ContactListView, ContactModel, ContactCollection){
  var AppRouter = Backbone.Router.extend({
    routes: {
      'contact/add': 'addContactAction',
      'contact/:id': 'showContactAction',
      '*actions': 'defaultAction'
    },

    addContactAction: function(id){
				
    },

    showContactAction: function(id){
				
    },

    defaultAction: function(){
			var contacts = new ContactCollection();
			
			contacts.add([
			  {name: "Michael"},
			  {name: "Patrick"},
			  {name: "Tobias"},			
			]);
			
			// contacts.models = [new ContactModel({name: 'contact 1'}), new ContactModel({name: 'contact 2'}), new ContactModel({name: 'contact 3'})];
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
