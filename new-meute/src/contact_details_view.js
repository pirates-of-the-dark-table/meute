
define([
    'helpers'
], function(helpers) {

    return {

        setup: function(options) {
            this.div = options.div;
        },

        disconnect: function() {
            this.contact = null;
        },

        connect: function(contact) {
            if(this.contact) {
                this.disconnect();
            }

            this.contact = contact;
            this.render();
        },

        render: function() {
            this.div.innerHTML = '';

            this.renderPicture();
            this.renderBasic();
            this.renderContactInformation();
        },

        renderPicture: function() {
            var div = document.createElement('div');

            div.setAttribute('class', 'picture');

            var img = document.createElement('img');

            if(this.contact.photo) {
                img.setAttribute('src', this.contact.photo);
            }
            img.setAttribute('width', 100);
            img.setAttribute('height', 100);

            div.appendChild(img);

            this.div.appendChild(div);
        },

        renderBasic: function() {
            var props = [];

            props.push(helpers.div('fn', this.contact.fn));

            if(this.contact.org) {
                var o = this.contact.org;
                var on = o['organization-name'];
                var ou = o['organization-unit'];
                var org = helpers.div('org');
                if(on) {
                    org.appendChild(helpers.div('organization-name', on));
                }
                if(on && ou) {
                    org.appendChild(document.createTextNode(', '));
                }
                if(ou) {
                    org.appendChild(helpers.div('organization-unit', ou));
                }

                props.push(org);
            }

            this.div.appendChild(helpers.div('basic', props));
        },

        renderContactInformation: function() {
            if(! this.contact.email) {
                return;
            }
            var parts = [];
            var header = document.createElement('header');
            header.innerText = 'Contact Information:';
            parts.push(header);

            _.each(this.contact.email, function(email) {
                parts.push(helpers.div('email', [
                    helpers.div('type', email.type),
                    helpers.div('value', email.value)
                ]));
            }, this);

            this.div.appendChild(helpers.div('contact-information', parts));
        },

    };

});