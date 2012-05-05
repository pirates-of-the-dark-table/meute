
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/contact/listItem.html'
], function($, _, Backbone, template){

  var View = Backbone.View.extend({
  
	  tagName: 'li',

	  template: _.template(template),

    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
	    return this;
    }
  });
  
	return View;
});
