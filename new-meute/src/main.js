
require.config({

    baseUrl: 'src',
    paths: {
        'underscore' : '../lib/underscore',
        'vcardjs' : '../lib/vcardjs'
    }

});

require([
    'meute', 'helpers'
], function(Meute, helpers) {

    helpers.addEvent(window, 'popstate', Meute.loadState, Meute);

    helpers.addEvent(window, 'load', function() {
        Meute.initialize();
        window.Meute = Meute;
    });
});