
require.config({

  baseUrl: 'src',
  paths: {
    'remoteStorage' : '../lib/remoteStorage',
    'remoteStorage-modules': '../lib/remoteStorage-modules',
    'underscore'    : '../lib/underscore',
    'vcardjs'       : '../lib/vcardjs'
  }

});

require([
  'meute', 'helpers'
], function(Meute, helpers) {
  window.Meute = Meute;

  helpers.addEvent(window, 'popstate', Meute.loadState, Meute);

  helpers.addEvent(window, 'load', function() {
    Meute.initialize();
  });
});