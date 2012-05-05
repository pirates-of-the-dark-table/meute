
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/contact/listItem.html'
], function($, _, Backbone, template){

  var View = Backbone.View.extend({
  
	  tagName: 'li',

	  template: _.template(template),
		
		events: {
			'click span': 'expand'
		},

    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
			$('.collapsible', this.$el).hide();
	    return this;
    },
		
		expanded: false,
		expand: function(){
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
