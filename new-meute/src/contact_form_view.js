
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

	cancelAction: function(event) {
	    if(this.contact.fn) {
		this.detailsView.setState('show');
	    } else {
		helpers.setParams({});
	    }
	},

	saveAction: function(event) {
	    helpers.stopEvent(event);
	    alert('save');
	},

	render: function(detailsView) {
	    this.detailsView = detailsView;
	    this.contact = this.detailsView.contact;

	    // not actually a div, but who cares :-)
	    this.div = document.createElement('form');

	    this.div.appendChild(helpers.div('buttons', [
		helpers.button("Cancel", this.cancelAction, this),
		helpers.submit("Save")
	    ]));

	    helpers.addEvent(this.div, 'submit', this.saveAction, this);

	    this.addInput('fn');
	    /* this.addInput('n[given-name]');
	       this.addInput('n[additional-name]');
	       this.addInput('n[family-name]');
	    */

	    this.addTypedInput('email');

	    this.detailsView.div.appendChild(this.div);
	},

	addInput: function(key, type) {
	    var label = this.labels[key] || ("(label not set: " + key + ")");
	    var input = helpers.input(this.contact, key, label, type);
	    this.div.appendChild(input);
	},

	addTypedInput: function(key, parent) {
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
		this.contact, typeKey, null, 'select', this.types[key]
	    );
	    helpers.addClass(typeInput, 'short');
	    wrapper.appendChild(typeInput);
	    wrapper.appendChild(helpers.input(this.contact, valueKey, null));

	    var removeLink = document.createElement('a');
	    removeLink.setAttribute('href', '#');
	    helpers.addClass(removeLink, 'remove');
	    removeLink.innerHTML = 'x';
	    helpers.addEvent(removeLink, 'click', function() {
		parent.removeChild(wrapper);
	    }, this);

	    if(! isFirst) {
		wrapper.appendChild(removeLink);
	    }

	    var addLink = document.createElement('a');
	    addLink.setAttribute('href', '#');
	    helpers.addClass(addLink, 'add');
	    addLink.innerHTML = '+';

	    helpers.addEvent(addLink, 'click', function() {
		this.addTypedInput(key, parent);
	    }, this);

	    wrapper.appendChild(addLink);

	    parent.appendChild(wrapper);
	}
	
    });
});