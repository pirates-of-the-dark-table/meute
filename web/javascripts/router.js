
define([
  'jquery',
	'underscore',
	'backbone',
  'views/contact/list',
	'views/import',
  'models/contact',
  'collections/contacts',
  'text!../data.json'
], function($, _, Backbone, ContactListView, ImportView, ContactModel, ContactCollection, data){
  
	var views = {};
	
	var AppRouter = Backbone.Router.extend({
    routes: {
      'contact/add': 'addContactAction',
      'contact/:id': 'showContactAction',
			'import': 'showImport',
      '*actions': 'defaultAction'
    },

    addContactAction: function(id){
				
    },

    showContactAction: function(id){
				
    },

    defaultAction: function(){
			this.showMain();
			
		},
		
		showMain: function(){
			var dataObj = JSON.parse(data);
			var modelsData = [];
			for (var contactId in dataObj) {
				dataObj[contactId].id = contactId;
				modelsData.push(new ContactModel(dataObj[contactId]));
			}
			
			var contacts = new ContactCollection();

			// _.each(modelsData, function(contact) {
			// 	contacts.add(contact);
			// });
			
			// contacts.models = [new ContactModel({name: 'contact 1'}), new ContactModel({name: 'contact 2'}), new ContactModel({name: 'contact 3'})];
			contacts.models = modelsData;

			if(!views.contactList){
				views.contactList = new ContactListView({collection: contacts});
			}
			views.contactList.render();
			if(views.importView){
			  views.importView.close();
			}
    },
		
    showImport: function(){
      this.showMain();
			views.contactList.render();
			if(!views.importView){
				views.importView = new ImportView();
			}
			views.importView.render();
		}
		
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
