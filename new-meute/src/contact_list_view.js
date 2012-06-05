
define([
    'helpers'
], function(helpers) {

    return {

        setup: function(options) {
            this.div = options.div;
            if(options.list) {
                this.connect(options.list);
            }

            helpers.addEvent(this.div, 'click', function(event) {
                if(event.target.tagName == 'A') {
                    var contactId = event.target.getAttribute('data-contact-id');
                    if(contactId) {
                        history.pushState({}, null, "?id=" + contactId);
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

    };

});