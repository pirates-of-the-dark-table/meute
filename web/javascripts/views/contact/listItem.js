
define([
    'jquery',
    'underscore',
    'backbone-localstorage',
    'text!templates/contact/listItem.html'
], function($, _, Backbone, template){

    var View = Backbone.View.extend({

        tagName: 'li',

        className: 'vcard',
        
	      template: _.template(template),

		    events: {
			      'click .fn': 'showContact'
		    },

		    expanded: false,

        initialize: function() {
            this.model.on('change', _.bind(function() {
                this.render();
            }, this));
        },

        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.attr('id', 'contact-' + this.model.id);

			      $('.collapsible', this.$el)[this.expanded ? 'show' : 'hide']();

	          return this;
        },

        showContact: function() {
            document.location = '#/contact/edit/' + this.model.id;
        },
		    
		    expand: function() {
			      if (this.expanded) {
				        $('.collapsible', this.$el).hide(500);
				        this.expanded = false;
			      }
			      else {
				        $('.collapsible', this.$el).show(500);
				        this.expanded = true;
			      }
		    }
    });
    
	  return View;
});
