
define([
    'underscore',
    'helpers'
], function(_, helpers) {

    var ButtonGroup = function() {
        this.buttons = [];
        this.div = helpers.dom.div('button-group');
    }

    ButtonGroup.prototype = {
        addButton: function(label, options) {
            var button = helpers.dom.button(label, options.callback, options.context, options.type);
            if(options.title) {
                button.setAttribute('title', options.title);
            }
            this.div.appendChild(button);
        }
    };

    
    return ButtonGroup;

});