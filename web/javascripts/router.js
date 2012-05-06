
define([
  'jquery',
	'underscore',
	'backbone',
  'views/contact/list',
	'views/import',
  'models/contact',
  'collections/contacts',
	'vcards',
  'text!../data.json'
], function($, _, Backbone, ContactListView, ImportView, ContactModel, ContactCollection, vCardTransformer, data){
  
	var contactsCollection;
	
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
			
			var contacts = this.contactsCollection = contactsCollection = new ContactCollection();

			// _.each(modelsData, function(contact) {
			// 	contacts.add(contact);
			// });
			
			// contacts.models = [new ContactModel({name: 'contact 1'}), new ContactModel({name: 'contact 2'}), new ContactModel({name: 'contact 3'})];
			contacts.models = modelsData;

			if(!this.contactListView){
				this.contactListView = new ContactListView({collection: contacts});
			}
			this.contactListView.render();
			
			if(this.importView){
			  this.importView.close();
			}
    },
		
    showImport: function(){
      this.showMain();
			this.contactListView.render();
			if(!this.importView){
				this.importView = new ImportView();
				this.importView.callback = this._importVcardData;
			}
			this.importView.render();
		},
		
		_importVcardData: function(data){
			vCardTransformer.toObjects(data, function(){console.log(data)});
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
