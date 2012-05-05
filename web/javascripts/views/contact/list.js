
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/contact/list.html'
], function($, _, Backbone, mainHomeTemplate){

  var contactCollectionView = Backbone.View.extend({
    el: '#content',
    render: function(){
      this.$el.html(contactCollectionTemplate);
			
			
    }
  });
  return new contactCollectionView;
});
