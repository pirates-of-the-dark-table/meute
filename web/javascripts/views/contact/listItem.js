
define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone, contactListTemplate){

  var contactCollectionView = Backbone.View.extend({
    el: '#content',
    render: function(){
      this.$el.html(contactListTemplate);
			
    }
  });
  return new contactCollectionView;
});
