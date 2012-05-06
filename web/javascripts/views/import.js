define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/import.html'
], function($, _, Backbone, template){

  var View = Backbone.View.extend({
  
	  tagName: 'div',
		
		el: $('#import'),

	  template: _.template(template),
		
		events: {
			'click .close': 'close',
			'click .submit': 'doImport'
		},
    
		render: function(){
      this.$el.html(this.template());
	    return this;
    },
		
		close: function(){
			location.hash = '';
		},
		
		doImport: function(){
			alert('import not implemented');
			$('textarea', this.$el).html('');
		}
  });
  
	return View;
});
