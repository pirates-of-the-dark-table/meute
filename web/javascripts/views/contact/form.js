
define([
    'jquery',
    'underscore',
    'backbone-localstorage',
    'libs/backbone/backbone_form_builder',
    'views/helper/confirm'
], function($, _, Backbone, undefined, ConfirmDialog){

    var view = Backbone.View.extend({
	      
        el: $('<div id="contact-form"></div>'),
	      
        events: {},
		    
	      render: function(){

            if(! this.model.collection) {
                this.model.collection = this.collection;
            }

            this.form = new Backbone.FormBuilder.Form({
                model: this.model,
                success: _.bind(function() {
                    this.collection.add(this.model);
                    document.location = '#/contact/edit/' + this.model.id;
                }, this),
                error: function() { console.log('error'); }
            });

            this.form.addField('fn', 'text', { label: "Full name" });
            this.form.addField('n[given-name]', 'text', { label: "Given name" });

            this.form.addButton('submit', this.model.id ? "Update" : "Create")

            this.form.addButton('base', "Cancel", function() {
                document.location = '#/'
                return false;
            });

            if(this.model.id) {
                this.form.addButton('base', "Delete", _.bind(function() {
                    ConfirmDialog.run(
                        ('Are you sure, you want to delete "' +
                         this.model.attributes.fn + '" ?'),
                        _.bind(function(confirmed) {
                            if(confirmed) {
                                this.model.destroy();
                                this.collection.remove(this.model);
                                document.location = '#/';
                            } else {
                                console.log('not confirmed');
                            }
                        }, this)
                    )
                    return false;
                }, this));
            }

            this.form.render()

            this.$el.html(this.form.el);

        },

        close: function() {
            this.$el.html('');
        },
    });
    
    return view;
});
