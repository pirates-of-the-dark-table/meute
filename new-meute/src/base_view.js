
define([
    'helpers'
], function(helpers) {
    return {

        show: function() {
            helpers.showElement(this.div);
        },

        hide: function() {
            helpers.hideElement(this.div);
        }


    };
});