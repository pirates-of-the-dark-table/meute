
define([
    'underscore', 'helpers'
], function(_, helpers) {

    return {

        setup: function(options) {
            this.div = options.div;

            helpers.addEvent(this.div, 'click', function(event) {
                console.log('event');
                if(event.target.tagName == 'BUTTON') {
                    console.log('button');
                    var action = event.target.getAttribute('data-action');
                    if(action) {
                        helpers.setParams({
                            action: action
                        });
                    }
                }
            });
        },

        setActive: function(className) {
            _.each(this.div.getElementsByClassName('active'), function(element) {
                helpers.removeClass(element, 'active');
            });
            helpers.addClass(this.div.getElementsByClassName(className)[0], 'active');
        }

    };

});