
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
			
			var contacts = this.contactsCollection = contactsCollection = new ContactCollection();
			contacts.fetch();

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
			contactsCollection.models.forEach(function(model){
				Backbone.sync("create", model, {success: function(){console.log(arguments)}, error: function(){console.log(arguments)}});
			});
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
