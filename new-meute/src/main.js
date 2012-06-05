
require.config({

    baseUrl: 'src',
    paths: {
        'underscore' : '../lib/underscore',
        'vcardjs' : '../lib/vcardjs'
    }

});

require([
    'meute'
], function(Meute) {

    Meute.initialize();
    window.Meute = Meute;
});