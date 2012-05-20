define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    var ContactModel = Backbone.Model.extend({
		    defaults: {
		        fn: null,
            nickname: null,
            tel: null,
            email: null
	      }
    });
    return ContactModel;
});

