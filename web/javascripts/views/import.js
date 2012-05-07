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
      'click .submit': 'doImport'
    },

    render: function(){
      this.$el.html(this.template());
      return this;
    },

    close: function(){
      this.$el.html('');
    },

    doImport: function(){
			var file = $('input[type=file]', this.$el)[0].files[0];
			var fr = new FileReader();
			fr.readAsText(file);
			var cb = this.callback;
			fr.onload = function(){
				cb(fr.result);
			};
		}
		
  });

  return View;
});
