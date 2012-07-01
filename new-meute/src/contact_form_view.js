/* -*- tab-width:2 -*- */

define([
    'underscore', 'helpers', 'base_view'
], function(_, helpers, baseView) {

    return _.extend({}, baseView, {

	      labels: {
	          'fn': "Full Name",
	          'n[given-name]': "Given Name",
	          'n[additional-name]': "Middle Name",
	          'n[family-name]': "Family Name",
	          'email': "E-mail"
	      },

	      types: {
	          email: {
		            work: "Work",
		            home: "Home",
		            internet: "Internet"
	          }
	      },

	      closeAction: function(event) {
	          if(this.contact.fn) {
                console.log('detailsView', this.detailsView);
		            this.detailsView.setState('show');
	          } else {
		            helpers.setParams({});
	          }
	      },

	      saveAction: function(event) {
            var newContact = this.detailsView.contactList.build({
                uid: this.contact.uid,
                rev: this.contact.rev
            });

            console.log("SAVING FROM INPUTS", this.inputs);
            // return;

            _.each(this.inputs, function(inputs, key) {
                _.each(inputs, function(input) {
                    if(! input) {
                        return;
                    }
                    newContact.addAttribute(key, input.valueFunction());
                    console.log('ADD ATTRIBUTE', newContact.toJSON());
                });
            });

            console.log('saving', newContact);

            this.contact = newContact.save();

            if(this.contact.errors.length <= 0) {
								this.detailsView.contact = this.contact;
                Meute.displayInfo("Saved.");
                this.closeAction();
            } else {
                this.highlightErrors(this.contact.errors);
            }
            return false;
	      },

        highlightErrors: function() {
            _.each(this.contact.errors, function(error) {
                this.highlightError(error);
            }, this);
        },

        highlightError: function(error) {
            var field = error[0], message = error[1];

            function doHighlight(input) {
								helpers.addClass(input.wrapper, 'has-error');
                input.wrapper.appendChild(
                    helpers.dom.div('errors', [message])
                );
            }

            var md = field.match(/^([^\-]+)\-(\d+)$/);
            if(md) {
                doHighlight.apply(this, [this.inputs[md[1]][md[2]]]);
            } else {
                _.each(this.inputs[field], doHighlight, this);
            }
        },

	      render: function(detailsView) {
	          this.detailsView = detailsView;
	          this.contact = this.detailsView.contact;
            this.inputs = {};

	          // not actually a div, but who cares :-)
	          this.div = document.createElement('form');

	          this.div.appendChild(helpers.dom.div('buttons', [
		            helpers.dom.button("&laquo; Back", this.closeAction, this),
		            helpers.dom.submit("Save")
	          ]));

	          helpers.catchEvent(this.div, 'submit', this.saveAction, this);

	          this.addInput('fn');
	          /* this.addInput('n[given-name]');
	             this.addInput('n[additional-name]');
	             this.addInput('n[family-name]');
	          */

            var emailWrapper = document.createElement('div');
            this.div.appendChild(emailWrapper);
            if(this.contact.email) {
                _.each(this.contact.email, function(email, i) {
                    this.addTypedInput('email', emailWrapper, i);
                }, this);
            } else {
	              this.addTypedInput('email', emailWrapper, 0);
            }


	          this.detailsView.div.appendChild(this.div);
	      },

        registerInput: function(key, wrapper, valueFunction) {
            if(! (key in this.inputs)) {
                this.inputs[key] = [];
            }

            this.inputs[key].push({
                wrapper: wrapper,
                valueFunction: valueFunction
            });
        },

	      addInput: function(key, type) {
	          var label = this.labels[key] || ("(label not set: " + key + ")");
	          var input = helpers.dom.input(this.contact, key, label, type);
            this.registerInput(key, input, function() {
                return input.getElementsByTagName('input')[0].value;
            });
	          this.div.appendChild(input);
	      },

	      addTypedInput: function(key, parent, index) {
            var currentValue;
            if(this.contact[key]) {
                currentValue = this.contact[key][index] || {};
            } else {
                currentValue = {};
            }
	          var wrapper = document.createElement('div');
	          var typeKey = key + '[type]', valueKey = key + '[value]';
	          helpers.addClass(wrapper, 'input');
	          helpers.addClass(wrapper, 'typed');
	          wrapper.appendChild(
								helpers.dom.label(this.labels[key], 'form-input-' + valueKey)
						);
	          var typeInput = helpers.dom.input(
		            this.contact, typeKey, null, 'select', this.types[key], currentValue.type
	          );
	          helpers.addClass(typeInput, 'short');
	          wrapper.appendChild(typeInput);
            var valueInput = helpers.dom.input(this.contact, valueKey, null, 'text', null, currentValue.value)
	          wrapper.appendChild(valueInput);

	          var removeLink = document.createElement('a');
	          removeLink.setAttribute('href', '#');
	          helpers.addClass(removeLink, 'remove');
	          removeLink.innerHTML = 'x';
	          helpers.catchEvent(removeLink, 'click', function() {
		            parent.removeChild(wrapper);
                delete this.inputs[key][index];
	          }, this);

	          if(! index == 0) {
		            wrapper.appendChild(removeLink);
	          }

	          var addLink = document.createElement('a');
	          addLink.setAttribute('href', '#');
	          helpers.addClass(addLink, 'add');
	          addLink.innerHTML = '+';

	          helpers.catchEvent(addLink, 'click', function() {
		            this.addTypedInput(key, parent, index + 1);
	          }, this);

	          wrapper.appendChild(addLink);

            this.registerInput(key, wrapper, function() {
                var type = typeInput.getElementsByTagName('select')[0].value;
                var value = valueInput.getElementsByTagName('input')[0].value;
                return value ? { type: type, value: value } : null;
            });

	          parent.appendChild(wrapper);
	      }
	      
    });
});

