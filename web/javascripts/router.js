
define([
    'jquery',
	  'underscore',
	  'backbone',
    'views/contact/list',
	  'views/import',
    'models/contact',
    'collections/contacts',
    'views/main/menu'
], function($, _, Backbone, ContactListView, ImportView, ContactModel, ContactCollection, MenuView){

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

            this.menuView = new MenuView({
                collection: [
                    { label: "Import", key: 'import' }
                ]
            });


			      this.contactListView = new ContactListView({
                collection: this.contactCollection
            });
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
            this.menuView.render();
			      this.contactListView.render();
			      this.importView.close();
        },

        showMe: function() {
            this.importView.close();
            this.contactView = new ContactView({
                //contact: 
            });
        },
		    
        showImport: function(){
            this.showMain();
            this.menuView.setActive('import');
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
