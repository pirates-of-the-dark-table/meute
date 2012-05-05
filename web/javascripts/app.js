
define([
  'jquery',
  'underscore',
  'backbone',
	'router',
	'javascripts/libs/backbone/backbone-localstorage.js'
], function($, _, Backbone, Router, BackboneLocalstoragePatch){
  var initialize = function(){
    // Pass in our Router module and call it's initialize function
    Router.initialize();
  }

  return {
    initialize: initialize
  };
});
