
define([
    // support
    'jquery',
	  'underscore',
	  'backbone',
    // models
    'collections/contacts',
    'models/contact',
    // views
    'views/main/menu',
    'views/contact/list',
	  'views/contact/import',
    'views/contact/form'
], function(
    // support
    $, _, Backbone,
    // models
    ContactCollection, ContactModel,
    // views
    MenuView, ContactListView, ContactImportView, ContactFormView
) {

	  var AppRouter = Backbone.Router.extend({

        /**
         * ROUTES
         **/

        routes: {
            'contact/add': 'addContactAction',
            'contact/edit/:id': 'editContactAction',
			      'contact/import': 'importContactAction',
            'contact/:id': 'showContactAction',
            '*actions': 'defaultAction'
        },

        /**
         * SETUP
         **/

        initialize: function(){
			      
			      this.contactCollection = new ContactCollection();
			      this.contactCollection.fetch();

            this.menuView = new MenuView({
                collection: [
                    { label: "New", key: 'new', route: 'contact/add' },
                    { label: "Import", key: 'contact/import' }
                ]
            });


			      this.contactListView = new ContactListView({
                collection: this.contactCollection
            });

        },

        /**
         * ACTIONS
         **/

        defaultAction: function(){
            this.showMain();
            this.menuView.setActive(null);
            this.setActionContent(null);
        },

        addContactAction: function() {
            this.showMain();
            this.menuView.setActive('new');

            this.contactForm = new ContactFormView({
                collection: this.contactCollection,
                model: new ContactModel()
            });

            this.contactForm.render();
            this.setActionContent(this.contactForm.$el);
        },

        showContactAction: function(id) {
				    
        },

        editContactAction: function(id) {
            this.showMain();
            this.menuView.setActive(null);

            this.contactForm = new ContactFormView({
                collection: this.contactCollection,
                model: this.contactCollection.get(id)
            });

            this.contactForm.render();
            this.setActionContent(this.contactForm.$el);
        },

        importContactAction: function(){
            this.showMain();
            this.menuView.setActive('import');

			      this.importView = new ContactImportView({
                collection: this.contactCollection
            });

			      this.importView.render();
            this.setActionContent(this.importView.$el);
		    },

        /**
         * HELPERS
         **/

		    showMain: function() {
            // only render menu and list once.
            if(! this.menuView.rendered) {
                this.menuView.render();
                $(document.body).append(this.menuView.$el);
            }
            if(! this.contactListView.rendered) {
			          this.contactListView.render();
            }
        },

		    setActionContent: function(content) {
            if(content) {
                $('#contacts').removeClass('full');
                $('#action-content').html(content);
            } else {
                $('#action-content').html('');
                $('#contacts').addClass('full');
            }
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
