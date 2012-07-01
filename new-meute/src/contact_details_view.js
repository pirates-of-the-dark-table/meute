
define([
    'underscore', 'helpers', 'base_view', 'contact_form_view'
], function(_, helpers, baseView, contactFormView) {

    return _.extend({}, baseView, {

        // either "show" or "edit"
        state: 'show',

        // bind to dom elements and setup basic view.
        setup: function(options) {
            this.contactList = options.list;
            this.div = options.div;
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

            if(state == 'edit') {
                this.renderSaveButton()
            } else {
                this.renderEditButton
            }

            this.div.appendChild(helpers.dom.div('button-group', [

                ( (this.state == 'edit') ?
                  this.renderSaveButton() :
                  this.renderEditButton() ),

                ( (this.contact.uid) &&
                  this.renderDeleteButton() ),

                ( (! ('photo' in this.contact)) &&
                  this.renderAddPictureButton())

            ]));
        },

        renderEditButton: function() {
            var button = document.createElement('button');
            helpers.addClass(button, 'edit');
            button.innerHTML = 'Edit';
            button.setAttribute('title', 'Edit details');
            helpers.addClass(button, 'action');
            helpers.addEvent(button, 'click', function() {
                this.setState('edit');
            }, this);
            return button;
        },

        renderDeleteButton: function() {
            var button = document.createElement('button');
            helpers.addClass(button, 'delete');
            button.innerHTML = "Delete";
						button.setAttribute('title', "Delete this contact.");
            helpers.addClass(button, 'action');
            helpers.addEvent(button, 'click', this.deleteContact, this);
            return button;
        },

        renderAddPictureButton: function() {
            var button = document.createElement('button');
            helpers.addClass(button, 'add-picture');
            button.innerHTML = "Add Picture";
            button.setAttribute('title', "Attach a picture to this contact.");
            helpers.addClass(button, 'action');
            helpers.addEvent(button, 'click', this.addPictureDialog, this);
            return button;
        },

        renderSaveButton: function() {
            
        },

        deleteContact: function() {
            this.contactList.destroy(this.contact);
            this.disconnect(this.contact);
            this.div.innerHTML = '';
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
