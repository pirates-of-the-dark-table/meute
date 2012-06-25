
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
		            this.detailsView.setState('show');
	          } else {
		            helpers.setParams({});
	          }
	      },

        inputValues: function() {
            var values = {};

            function addValue(key, value) {
                console.log('addValue', key, value);
                var nestedKeyRE = /^(.+)\[(.+)\](.*)$/;
                var md;
                if(md = key.match(nestedKeyRE)) {
                    var parentKey = md[1], childKey = md[2], rest = md[3];
                    if(! values[parentKey]) {
                        values[parentKey] = {};
                    }
                    var parent = values[parentKey];
                    if(rest) {
                        console.error("Unsupported nested key: ", key);
                        return;
                    }
                    console.log('add nested value', key, '-> ', parentKey, childKey, value);
                    if(parent[childKey]) {
                        if(! (parent[childKey] instanceof Array)) {
                            parent[childKey] = [parent[childKey]];
                        }
                        parent[childKey].push(value);
                    } else {
                        values[parentKey][childKey] = value;
                    }
                } else {
                    console.log('add simple value', key, value);
                    values[key] = value;
                }
            }
            _.each(this.inputs, function(inputs, key) {
                _.each(inputs, function(input) {
                    helpers.extractFormValues(input, addValue);
                }, this);
            }, this);

            return values;
        },

	      saveAction: function(event) {

            console.log("input values", this.inputValues());

            this.contact.setAttributes(this.inputValues());

            if(this.contact.validate() && (this.contact = this.contact.save()).errors.length <= 0) {
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
            _.each(this.inputWrappers[field], function(wrapper) {
                console.log('appending to wrapper', wrapper);
                wrapper.appendChild(
                    helpers.div('errors', [message])
                );
            }, this);

            _.each(this.inputs[field], function(input) {
                helpers.addClass(input, 'has-error');
            }, this);
        },

	      render: function(detailsView) {
	          this.detailsView = detailsView;
	          this.contact = this.detailsView.contact;

	          // not actually a div, but who cares :-)
	          this.div = document.createElement('form');
            this.div.name = 'foo';

	          this.div.appendChild(helpers.div('buttons', [
		            helpers.button("Cancel", this.closeAction, this),
		            helpers.submit("Save")
	          ]));

	          helpers.catchEvent(this.div, 'submit', this.saveAction, this);

	          this.addInput('fn');
	          /* this.addInput('n[given-name]');
	             this.addInput('n[additional-name]');
	             this.addInput('n[family-name]');
	          */

            if(this.contact.email) {
                _.each(this.contact.email, function(email, i) {
                    this.addTypedInput('email', undefined, i);
                }, this);
            } else {
	              this.addTypedInput('email', undefined, 0);
            }


	          this.detailsView.div.appendChild(this.div);
	      },

        registerInput: function(key, input, wrapper) {
            if(! this.inputs) {
                this.inputs = {};
            }
            if(! (key in this.inputs)) {
                this.inputs[key] = [];
            }

            this.inputs[key].push(input);

            if(! this.inputWrappers) {
                this.inputWrappers = {};
            }
            if(! (key in this.inputWrappers)) {
                this.inputWrappers[key] = [];
            }

            this.inputWrappers[key].push(wrapper);
        },

	      addInput: function(key, type) {
	          var label = this.labels[key] || ("(label not set: " + key + ")");
	          var input = helpers.input(this.contact, key, label, type);
            this.registerInput(
                key,
                input.getElementsByTagName((type == 'select')?'select':'input')[0],
                input
            );
	          this.div.appendChild(input);
	      },

	      addTypedInput: function(key, parent, index) {
            var currentValue;
            if(this.contact[key]) {
                currentValue = this.contact[key][index] || {};
            } else {
                currentValue = {};
            }
	          var isFirst = !parent;
	          if(! parent) {
		            parent = document.createElement('div');
		            this.div.appendChild(parent);
	          }
	          var wrapper = document.createElement('div');
	          var label = document.createElement('label');
	          var typeKey = key + '[type]', valueKey = key + '[value]';
	          helpers.addClass(wrapper, 'input');
	          helpers.addClass(wrapper, 'typed');
	          label.innerHTML = this.labels[key];
	          label.setAttribute('for', 'form-input-' + valueKey);
	          wrapper.appendChild(label);
	          var typeInput = helpers.input(
		            this.contact, typeKey, null, 'select', this.types[key], currentValue.type
	          );
	          helpers.addClass(typeInput, 'short');
	          wrapper.appendChild(typeInput);
            var valueInput = helpers.input(this.contact, valueKey, null, 'text', null, currentValue.value)
	          wrapper.appendChild(valueInput);

	          var removeLink = document.createElement('a');
	          removeLink.setAttribute('href', '#');
	          helpers.addClass(removeLink, 'remove');
	          removeLink.innerHTML = 'x';
	          helpers.catchEvent(removeLink, 'click', function() {
		            parent.removeChild(wrapper);
	          }, this);

	          if(! isFirst) {
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

            this.registerInput(key, wrapper, wrapper);

	          parent.appendChild(wrapper);
	      }
	      
    });
});

