define([
    'underscore',
    'backbone',
	  'models/contact',
    'vcardjs'
], function(_, Backbone, ContactModel, vCardJS) {

    var ContactCollection = Backbone.Collection.extend({
		
		    model: ContactModel,
        categoryName: 'contacts',

        addFromVCardData: function(data) {
            vCardJS.VCF.parse(data, function(vcard) {
                var model = new this.model();
                model.collection = this;
                model.save(vcard.toJCard(), {
                    success: _.bind(function() {
                        console.log("SAVING SUCCESS", arguments);
                        this.add(model);
                    }, this),
                    error: function() {
                        console.log("SAVING FAILURE", arguments);
                    }
                });
            }, this);
        }

	  });

    return ContactCollection;
});

