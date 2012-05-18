// Author: Thomas Davis <thomasalwyndavis@gmail.com>

// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
	baseUrl: "javascripts",
  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-optamd3-min',
    'backbone-localstorage': 'libs/backbone/backbone-localstorage',
    text: 'libs/require/text',
    templates: '../templates',
    vcardjs: 'libs/vcardjs.min'
  }
});

require([

  // Load our app module and pass it to our definition function
  'app'

  // Some plugins have to be loaded in order due to their non AMD compliance
  // Because these scripts are not "modules" they do not pass any values to the definition function below
], function(App){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  App.initialize();
});

