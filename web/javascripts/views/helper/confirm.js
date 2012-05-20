
define([
    'jquery',
    'underscore',
    'text!templates/helper/confirm.html'
], function($, _, template) {

    var ConfirmDialog = Backbone.View.extend({
        el: $('<div id="dialog">'),

        template: _.template(template),

        events: {
            'click .no': 'callbackNo',
            'click .yes': 'callbackYes'
        },

        defaultOptions: {
            focus: 'no'
        },

        // Parameter:
        //   * message  - Text to display to the user
        //   * callback - Function to call with the reply of the user (a boolean)
        //   * options  - an (optional) object, with:
        //     * focus  - which button to focus initially, defaults to 'no'.
        //
        initialize: function(message, callback, options) {
            this.message = message;
            this.callback = callback;
            this.options = _.extend({}, this.defaultOptions, options);
        },

        callbackYes: function() {
            this.callback(true);
            this.destroy();
        },

        callbackNo: function() {
            this.callback(false);
            this.destroy();
        },

        render: function() {
            this.$el.html(this.template({
                message: this.message
            }));
        },

        renderBackground: function() {
            this.background = $('<div id="dialog-background">');
            $(document.body).append(this.background);
            this.background.width($(window).width());
            this.background.height($(window).height());
        },

        destroy: function() {
            this.$el.slideUp(500, _.bind(function() {
                this.$el.remove();
                this.background.remove();
            }, this));
        },

        run: function() {
            this.render();
            this.renderBackground();
            this.$el.hide();
            $(document.body).prepend(this.$el);
            var offset = ($(document.body).width() - this.$el.width()) / 2;
            this.$el.css({
                left: offset + 'px'
            });
            this.$el.find('*').css({ opacity: 0.0 });
            this.$el.find('*').animate({ opacity: 1.0 });
            this.$el.slideDown(500);

            switch(this.options.focus) {
            case 'yes':
                this.$('.yes').focus();
            case 'no':
                this.$('.no').focus();
            }
        }
    });

    ConfirmDialog.run = function(message, callback) {
        var dialog = new ConfirmDialog(message, callback);
        dialog.run();
    }

    return ConfirmDialog;
});

