
define([
  'underscore', 'helpers',
  'contact_list_view', 'contact_details_view',
  'navigation_view', 'remoteStorage', 'remoteStorage-modules'
], function(_, helpers, contactListView,
            contactDetailsView, navigationView) {

  var contacts = remoteStorage.contacts;

  var ready = false;
  
  return {

    initialize: function() {

      this.infoDiv = document.getElementById('info');

      var _this = this;

      navigationView.setup({
        div: document.getElementById('navigation')
      });

      remoteStorage.loadModule('contacts');

      // this.setupSyncer();

      this.setupDragDrop();

      contactListView.setup({
        model: remoteStorage.contacts,
        div: document.getElementById('contact-list')
      });

      contactDetailsView.setup({
        model: remoteStorage.contacts,
        div: document.getElementById('contact')
      });

      this.setupLayout();

      ready = true;

      this.loadState();

    },

    // setupSyncer: function() {
    //     syncer.display(
    //         'remotestorage-connect',
    //         ['contacts'],
    //         'syncer/',
    //         _.bind(function(event) {
    //             console.log('syncer event', event);
    //             if(event.newValue) {
    //                 this.contactList.add(event.newValue);
    //             }
    //         }, this)
    //     );
    // },

    loadState: function(event) {
      if(! ready) {
        console.log('not ready yet');
        return;
      }
      console.log("EVENT", event);
      var params = helpers.parseParams(document.location.search);

      console.log("loadState", params);

      if(! params.action) {
        params.action = 'list';
      }

	    var actionHandler = this.actions[params.action];
	    if(! actionHandler) {
		    console.error("Unknown action: ", params.action);
	    } else {
		    actionHandler.apply(this, [params]);
	    }
    },

    setupLayout: function() {
      helpers.addEvent(window, 'resize', this.adjustLayout, this);
      helpers.addEvent(window, 'load', this.adjustLayout, this);
      this.adjustLayout();
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
        remoteStorage.contacts.addVCards(event.dataTransfer.files);
      }, this);
    },

    actions: {

      show: function(params) {
        this.loadContact(params.id);
        contactDetailsView.show();
      },

      me: function() {
		    contactDetailsView.setTitle('Me');
        contactDetailsView.connect(
          this.contactList.get('me') || this.contactList.build({
            uid: 'me'
          })
        );
        contactDetailsView.show();
        navigationView.setActive('me');
      },

      list: function() {
        contactDetailsView.hide();
      },

	    new: function() {
		    contactDetailsView.setTitle('New Contact');
		    contactDetailsView.connect(this.contactList.build());
		    contactDetailsView.show();
		    navigationView.setActive('new');
	    }

    }

  };

});

