define([
    'underscore',
    'backbone',
	  'models/contact',
    'vcardjs'
], function(_, Backbone, ContactModel, vCardJS) {

    var ContactCollection = Backbone.Collection.extend({
		
		    model: ContactModel,		
		    localStorage: new Store("contacts-backbone"),

        addFromVCardData: function(data) {
            vCardJS.VCF.parse(data, function(vcard) {
                this.create(vcard.toJCard());
            }, this);
        }
        

	  });

    return ContactCollection;
});

