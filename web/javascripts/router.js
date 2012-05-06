
define([
  'jquery',
	'underscore',
	'backbone',
  'views/contact/list',
	'views/import',
  'models/contact',
  'collections/contacts',
	'vcards'
], function($, _, Backbone, ContactListView, ImportView, ContactModel, ContactCollection, vCardTransformer){
  
	var contactsCollection;
	
	var AppRouter = Backbone.Router.extend({
    routes: {
      'contact/add': 'addContactAction',
      'contact/:id': 'showContactAction',
			'import': 'showImport',
      '*actions': 'defaultAction'
    },

    initialize: function(){
			var dataObj = {};
			var modelsData = [];
			for (var contactId in dataObj) {
				dataObj[contactId].id = contactId;
				modelsData.push(new ContactModel(dataObj[contactId]));
			}
			
			var contacts = this.contactsCollection = contactsCollection = new ContactCollection();

			// _.each(modelsData, function(contact) {
			// 	contacts.add(contact);
			// });
			
			// contacts.models = [new ContactModel({name: 'contact 1'}), new ContactModel({name: 'contact 2'}), new ContactModel({name: 'contact 3'})];
			contacts.models = modelsData;

			this.contactListView = new ContactListView({collection: contacts});
			this.importView = new ImportView();
			this.importView.callback = this._importVcardData;

    },

    addContactAction: function(id){
				
    },

    showContactAction: function(id){
				
    },

    defaultAction: function(){
      this.showMain();
    },

		showMain: function(){
			this.contactListView.render();
			this.importView.close();
    },
		
    showImport: function(){
      this.showMain();
			this.contactListView.render();
			this.importView.render();
		},
		
		_importVcardData: function(data){
			var models = [];
			vCardTransformer.toObjects(data, function(data){models.push(vCardTransformer.toMeuteFormat(data))});
			contactsCollection.add(models);
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
