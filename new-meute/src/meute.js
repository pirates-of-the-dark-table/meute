
define([
    'underscore', 'helpers', 'contact_list',
    'contact_list_view', 'contact_details_view'
], function(_, helpers, ContactList, contactListView, contactDetailsView) {
    
    return {

        initialize: function() {

            this.setupLayout();

            this.contactList = new ContactList();

            contactListView.setup({
                list: this.contactList,
                div: document.getElementById('contact-list')
            });

            contactDetailsView.setup({
                div: document.getElementById('contact')
            });

            this.infoDiv = document.getElementById('info');

            this.setupSyncer();

            helpers.addEvent(window, 'popstate', this.loadState, this);

            this.setupDragDrop();

        },

        setupSyncer: function() {
            syncer.display(
                'remotestorage-connect',
                ['contacts'],
                'syncer/',
                _.bind(function(event) {
                    console.log('syncer event', event);
                    this.contactList.add(event.newValue);
                }, this)
            );
        },

        loadState: function(event) {
            var params = helpers.parseParams(document.location.search);
            if(params.id) {
                this.loadContact(params.id);
            }
        },

        setupLayout: function() {
            helpers.addEvent(window, 'resize', this.adjustLayout, this);
            helpers.addEvent(window, 'load', this.adjustLayout, this);
        },

        adjustLayout: function() {
            contactListView.adjustLayout();
        },


        loadContact: function(uid) {
            var item = this.contactList.get(uid);
            contactDetailsView.connect(item);
            contactListView.setActive(item);
        },

        displayInfo: function(info) {
            if(info) {
                this.infoDiv.innerText = info;
                this.infoDiv.style.display = 'block';
            } else {
                this.infoDiv.innerText = '';
                this.infoDiv.style.display = 'none';
            }
        },

        setupDragDrop: function() {
            function hoverInfo(event) {
                this.displayInfo("Drop your vCards anywhere to add.");
            }

            helpers.addEvent(document.body, 'dragenter', hoverInfo, this);
            helpers.addEvent(document.body, 'dragover', hoverInfo, this);

            helpers.addEvent(document.body, 'dragleave', function(event) {
                this.displayInfo();
            }, this);

            helpers.addEvent(document.body, 'drop', function(event) {
                event.preventDefault();
                this.displayInfo();
                this.contactList.addVCards(event.dataTransfer.files);
            }, this);
        }

    };

});

