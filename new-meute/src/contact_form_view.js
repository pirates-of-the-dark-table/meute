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
		            this.detailsView.setState('show');
	          } else {
		            helpers.setParams({});
	          }
	      },

        // inputValues: function() {
        //     var values = {};

        //     function addValue(key, value) {
        //         console.log('addValue', key, value);
        //         var nestedKeyRE = /^(.+)\[(.+)\](.*)$/;
        //         var md;
        //         if(md = key.match(nestedKeyRE)) {
        //             var parentKey = md[1], childKey = md[2], rest = md[3];
        //             if(! values[parentKey]) {
        //                 values[parentKey] = {};
        //             }
        //             var parent = values[parentKey];
        //             if(rest) {
        //                 console.error("Unsupported nested key: ", key);
        //                 return;
        //             }
        //             console.log('add nested value', key, '-> ', parentKey, childKey, value);
        //             if(parent[childKey]) {
        //                 if(! (parent[childKey] instanceof Array)) {
        //                     parent[childKey] = [parent[childKey]];
        //                 }
        //                 parent[childKey].push(value);
        //             } else {
        //                 values[parentKey][childKey] = value;
        //             }
        //         } else {
        //             console.log('add simple value', key, value);
        //             values[key] = value;
        //         }
        //     }
        //     _.each(this.inputs, function(inputs, key) {
        //         _.each(inputs, function(input) {
        //             helpers.extractFormValues(input, addValue);
        //         }, this);
        //     }, this);

        //     return values;
        // },

	      saveAction: function(event) {

            this.contact.setAttributes(this.params);

            if(this.contact.validate() && (this.contact = this.contact.save()).errors.length <= 0) {
								this.detailsView = this.contact;
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
								helpers.addClass(wrapper, 'has-error');
                wrapper.appendChild(
                    helpers.dom.div('errors', [message])
                );
            }, this);
        },

	      render: function(detailsView) {
	          this.detailsView = detailsView;
	          this.contact = this.detailsView.contact;
						this.params = this.contact.toJCard();

	          // not actually a div, but who cares :-)
	          this.div = document.createElement('form');
            this.div.name = 'foo';

	          this.div.appendChild(helpers.dom.div('buttons', [
		            helpers.dom.button("Cancel", this.closeAction, this),
		            helpers.dom.submit("Save")
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

        registerInput: function(key, wrapper) {
            if(! this.inputWrappers) {
                this.inputWrappers = {};
            }
            if(! (key in this.inputWrappers)) {
                this.inputWrappers[key] = [];
            }

            this.inputWrappers[key].push(wrapper);
        },

				updateParam: function(key, value, multiple) {
						if(multiple) {
								if(! this.params[key]) {
										this.params[key] = []
								}
								this.params[key].push(value);
						} else {
								this.params[key] = value;
						}
						console.log('PARAMS', this.params);
				},

	      addInput: function(key, type) {
	          var label = this.labels[key] || ("(label not set: " + key + ")");
	          var input = helpers.dom.input(
								this.params, key, label, type, null, null, _.bind(function(event) {
										this.updateParam(key, event.target.value);
								}, this)
						);
            this.registerInput(key, input);
	          this.div.appendChild(input);
	      },

	      addTypedInput: function(key, parent, index) {
            var currentValue;
            if(this.params[key]) {
                currentValue = this.params[key][index] || {};
            } else {
                currentValue = {};
            }
	          var isFirst = !parent;
	          if(! parent) {
		            parent = document.createElement('div');
		            this.div.appendChild(parent);
	          }
	          var wrapper = document.createElement('div');
	          var typeKey = key + '[type]', valueKey = key + '[value]';
	          helpers.addClass(wrapper, 'input');
	          helpers.addClass(wrapper, 'typed');
	          wrapper.appendChild(
								helpers.dom.label(this.labels[key], 'form-input-' + valueKey)
						);
	          var typeInput = helpers.dom.input(
		            this.params, typeKey, null, 'select', this.types[key], currentValue.type
	          );
	          helpers.addClass(typeInput, 'short');
	          wrapper.appendChild(typeInput);
            var valueInput = helpers.dom.input(this.params, valueKey, null, 'text', null, currentValue.value)
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

            this.registerInput(key, wrapper);

	          parent.appendChild(wrapper);
	      }
	      
    });
});

