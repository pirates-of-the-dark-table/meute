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
			var form = $('textarea', this.$el);
			this.callback(form.attr('value'));
			form.attr('value', '');
		}
		
  });

  return View;
});
