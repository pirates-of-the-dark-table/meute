
define([
  'jquery',
	'underscore',
	'backbone',
  'views/contact/list',
  'collections/contacts',
  'models/contact'
], function($, _, Backbone, MainHomeView, ContactModel){
  var AppRouter = Backbone.Router.extend({
    routes: {
      'contact/:id': 'showContactAction',
      '*actions': 'defaultAction'
    },

    showContactAction: function(id){

    },

    defaultAction: function(){
			
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
