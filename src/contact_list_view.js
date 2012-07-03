
define([
    'underscore', 'helpers', 'base_view'
], function(_, helpers, baseView) {

    return _.extend({}, baseView, {

        placeholderVisible: true,

        setup: function(options) {
	          console.log('setup contactListView', options);
            this.div = options.div;
            this.placeholder = this.div.getElementsByClassName('placeholder')[0];
            // map: { item-uid : div }
            this._itemDivs = {};

            if(options.list) {
                this.connect(options.list);
            }

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
                update: this.itemUpdated,
                remove: this.itemRemoved
            });
        },

        adjustLayout: function() {
            this.div.style.height = (window.innerHeight - 61) + 'px'
        },

        itemAdded: function(item) {
            if(item.uid in this._itemDivs) {
                return;
            }
            var div = this.renderItem(item)
            if(! div) {
                return;
            }
            this._itemDivs[item.uid] = div;
            this.div.appendChild(div);
        },

        itemRemoved: function(item) {
            var itemDiv = this._itemDivs[item.uid];
            if(itemDiv) {
                this.div.removeChild(itemDiv);
                delete this._itemDivs[item.uid];
                if(_.keys(this._itemDivs).length == 0) {
                    this.placeholder.style.display = 'block';
                    this.placeholderVisible = true;
                }
            }
        },

        itemUpdated: function(item) {
            var itemDiv = this._itemDivs[item.uid];
            if(itemDiv) {
                var isActive = helpers.hasClass(itemDiv, 'active');
                itemDiv.innerHTML = '';
                this.renderItem(item, itemDiv);
            }
        },

        renderItem: function(item, row) {
            console.log('ITEM', item);
            console.trace();
            if(item.uid === 'me') {
                return;
            }
            if(this.placeholderVisible) {
                this.placeholder.style.display = 'none';
                this.placeholderVisible = false;
            }
            if(! row) {
                row = document.createElement('div');
                row.setAttribute('class', 'row');
            }
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
            if(! item) {
                return;
            }
            var row = this._itemDivs[item.uid];

            if(! row) {
                return;
            }

            helpers.removeClass(row, 'active');

            var link = row.getElementsByTagName('a')[0];

            if(link.getAttribute('data-contact-id') == item.uid) {
                helpers.addClass(row, 'active');
            }
        }

    });

});