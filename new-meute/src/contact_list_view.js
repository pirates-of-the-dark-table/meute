
define([
    'underscore', 'helpers', 'base_view'
], function(_, helpers, baseView) {

    return _.extend({}, baseView, {

        placeholderVisible: true,

        setup: function(options) {
	          console.log('setup contactListView', options);
            this.div = options.div;
            if(options.list) {
                this.connect(options.list);
            }

            this.place

            helpers.addEvent(this.div, 'click', function(event) {
                if(event.target.tagName == 'A') {
                    var contactId = event.target.getAttribute('data-contact-id');
                    if(contactId) {
                        helpers.setParams({
                            action: 'show',
                            id: contactId
                        });
                    }
                }
            }, this);
        },

        disconnect: function() {
            this.contactList.unbind('contactListView');
            this.contactList = null;
        },

        connect: function(contactList) {
            if(this.contactList) {
                this.disconnect();
            }

            this.contactList = contactList;

            contactList.bind('contactListView', this, {
                add: this.itemAdded,
                remove: this.itemRemoved
            });
        },

        adjustLayout: function() {
            this.div.style.height = (window.innerHeight - 66) + 'px'
        },

        itemAdded: function(item) {
            this.div.appendChild(this.renderItem(item));
        },

        renderItem: function(item) {
            if(this.placeholderVisible) {
                this.placeholder.style.display = 'none';
                this.placeholderVisible = false;
            }
            var row = document.createElement('div');
            row.setAttribute('class', 'row');
            var img = document.createElement('img');
            img.setAttribute('class', 'icon');
            if(item.photo) {
                img.setAttribute('src', item.photo);
            }
            row.appendChild(img);
            var a = document.createElement('a');
            a.setAttribute('href', '#');
            a.setAttribute('data-contact-id', item.uid);
            a.innerText = item.fn;
            row.appendChild(a);
            return row;
        },

        setActive: function(item) {
            _.each(this.div.getElementsByClassName('row'), function(row) {
                helpers.removeClass(row, 'active');

                var link = row.getElementsByTagName('a')[0];

                if(link.getAttribute('data-contact-id') == item.uid) {
                    helpers.addClass(row, 'active');
                }
            }, this);
        }

    });

});