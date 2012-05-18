
define([
  'jquery',
	'underscore',
	'backbone',
  'views/contact/list',
	'views/import',
  'models/contact',
  'collections/contacts'
], function($, _, Backbone, ContactListView, ImportView, ContactModel, ContactCollection){

	var AppRouter = Backbone.Router.extend({
    routes: {
      'contact/add': 'addContactAction',
      'contact/:id': 'showContactAction',
			'import': 'showImport',
      '*actions': 'defaultAction'
    },

    initialize: function(){
			
			this.contactCollection = new ContactCollection();
			this.contactCollection.fetch();

			this.contactListView = new ContactListView({collection: this.contactCollection});
			this.importView = new ImportView();
		  this.importView.callback = _.bind(function(data) {
					 this.contactCollection.addFromVCardData(data);

			 }, this);

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
