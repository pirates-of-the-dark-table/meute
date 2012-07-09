
define([
    'underscore', 'helpers', 'base_view', 'contact_form_view', 'button_group'
], function(_, helpers, baseView, contactFormView, ButtonGroup) {

    return _.extend({}, baseView, {

        // either "show" or "edit"
        state: 'show',

        // bind to dom elements and setup basic view.
        setup: function(options) {
            this.contactList = options.list;
            this.div = options.div;
            this.titleDiv = helpers.dom.div('title');
        },

        // connect this view to the given contact.
        // a details view can only be connected to a single contact at
        // a time.
        // this may jump to the "edit" state, if the given contact isn't
        // valid (such as "new").
        connect: function(contact) {
            if(! contact) {
                this.renderNotFound();
                return;
            }
            if(this.contact) {
                this.disconnect();
            }

            this.contact = contact;
	          console.log(this.contact);
            if(! this.contact.validate()) {
                this.state = 'edit';
            }
            this.render();
        },

        setTitle: function(title) {
            this.titleDiv.innerHTML = title;
        },

        // disconnect from contact
        disconnect: function() {
            this.contact = null;
        },

	      setState: function(state) {
	          this.state = state;
	          this.render();
	      },

        renderNotFound: function() {
            this.div.innerHTML = '';
            this.div.appendChild(helpers.dom.div(
                'error-message', [ 'This contact is no more. It may have been deleted or you may have logged out.' ]
            ));
        },

        render: function() {
            this.div.innerHTML = '';

            this.div.appendChild(this.titleDiv);

            this.renderButtons();
            
            switch(this.state) {
            case 'show':
                this.renderBasic();
                this.renderContactInformation();
                break;
            case 'edit':
                this.renderForm();
                break;
            }

        },

        renderForm: function() {
	          contactFormView.render(this);
        },

        updateValue: function(event) {
            // FIXME: broken!
            var key = event.target.getAttribute('name');
            var value = event.target.getAttribute('value');
            console.log('set', key, value, event);
            this.contact.addAttribute(key, value);
        },

        renderButtons: function() {

            var buttons = new ButtonGroup();
            if(this.state == 'edit') {

                buttons.addButton("Close Editor", {
                    callback: _.bind(function() {
                        contactFormView.saveAction(function() {
                            this.setState('show');
                        }, this);
                    }, this)
                });

            } else {

                buttons.addButton("Edit", {
                    title: "Edit details.",
                    callback: _.bind(function() {
                        this.setState('edit')
                    }, this)
                });
            }

            buttons.addButton("Delete", {
                title: "Delete this contact.",
                callback: _.bind(this.deleteContact, this)
            });

            buttons.addButton("Add Picture", {
                title: "Attach a picture to this contact.",
                callback: _.bind(this.addPictureDialog, this)
            });

            this.div.appendChild(buttons.div);
        },

        deleteContact: function() {
            this.contactList.destroy(this.contact);
            this.disconnect(this.contact);
            this.div.innerHTML = '';
        },

        addPictureDialog: function() {
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

            props.push(helpers.dom.div('fn', this.contact.fn));

            if(this.contact.org) {
                var o = this.contact.org;
                var on = o['organization-name'];
                var ou = o['organization-unit'];
                var org = helpers.dom.div('org');
                if(on) {
                    org.appendChild(helpers.dom.div('organization-name', on));
                }
                if(on && ou) {
                    org.appendChild(document.createTextNode(', '));
                }
                if(ou) {
                    org.appendChild(helpers.dom.div('organization-unit', ou));
                }

                props.push(org);
            }

            this.div.appendChild(helpers.dom.div('basic', props));
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
                parts.push(helpers.dom.div('email', [
                    helpers.dom.div('type', email.type),
                    helpers.dom.div('value', email.value)
                ]));
            }, this);

            this.div.appendChild(helpers.dom.div('contact-information', parts));
        },

    });

});
