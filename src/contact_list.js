// var examples = {
//     'uuid:4154cd70-ad6e-11e1-afa6-0800200c9a66': {
//         fn: 'Alice',
//         n: {
//             'given-name': ['Alice']
//         },
//         photo: 'http://localhost:9292/new-meute/img/alice-thumb.png',
//         nickname: 'Alice',
//         uid: 'uuid:4154cd70-ad6e-11e1-afa6-0800200c9a66'
//     },
//     'uuid:0dc62900-ad68-11e1-afa6-0800200c9a66': {
//         fn: 'Bob Bathtub',
//         n: {
//             'given-name': ['Bob'],
//             'family-name': ['Bathtub']
//         },
//         nickname: 'Bob',
//         uid: 'uuid:0dc62900-ad68-11e1-afa6-0800200c9a66',
//         email: [{
//             type: 'work',
//             value: 'big-bob@banker.inc',
//         }, {
//             type: 'home',
//             value: 'bitter-bob@bmail.bom'
//         }],
//         photo: 'http://localhost:9292/new-meute/img/bob-thumb.png'
//     }
// };


define([
  'underscore', 'helpers', 'remoteStorage'
], function(_, helpers) {

    // var VCard = vCardJS.VCard;

    // var ContactList = function() {
    //     this._bindings = {};
    //     this.items = {};
    // }

    // // returns a set of instance methods for a VCard instance.
    // // these methods bind the instance to this ContactList.
    // function instanceMethods(contactList) {
    //     return {
            
    //         save: function() {
    //             return contactList.save(this);
    //         },

    //         setAttributes: function(attributes) {
    //             _.each(attributes, function(value, key) {
    //                 this.setAttribute(key, value);
    //             }, this);
    //         }
    //     };
    // }

    // ContactList.prototype = {

    //     // add given contact to this list and trigger the 'add' event.
    //     add: function(contact) {
    //         this.items[contact.uid] = contact;
    //         this.trigger('add', [contact]);
    //     },

    //     // get a VCard instance by uid from storage.
    //     // if the given contact cannot be found, null is
    //     // returned.
    //     get: function(uid) {
    //         return this._wrap(syncer.getItem('contacts', uid));
    //     },

    //     // wrap given attributes or VCard instance, in such a way,
    //     // to always return a new VCard instance, extended with
    //     // instanceMethods.
    //     // Return null if attributes is null in any way. 
    //     _wrap: function(attributes) {
    //         if(! attributes) {
    //             return null;
    //         }
    //         return _.extend(
    //             new VCard((attributes instanceof VCard) ?
		// 	  attributes.toJCard() : attributes),
    //             instanceMethods(this)
    //         );
    //     },

    //     // build a new VCard instance bound to this contact list.
	  //     build: function(attributes) {
    //         return this._wrap(new VCard(attributes));
	  //     },

    //     // persist given attributes or vcard instance.
    //     // return a new item instance, possibly with
    //     // information added (such as 'rev', 'uid', ...)
    //     save: function(attributes) {
    //         var item = this._wrap(attributes);
    //         if(item.validate()) {
    //             syncer.setItem('contacts', item.uid, item.toJCard());
    //             if(item.uid in this.items) {
    //                 this.trigger('update', [item]);
    //             } else {
    //                 this.add(item);
    //             }
    //         } else {
    //             console.error("Item has errors:", item.errors);
    //         }
    //         return item;
    //     },

    //     // remove given contact from storage and trigger 'remove' event.
    //     // TODO: add undo.
    //     destroy: function(contact) {
    //         syncer.removeItem('contacts', contact.uid);
    //         delete this.items[contact.uid];
    //         this.trigger('remove', [contact]);
    //     },

    //     // add VCards by parsing all files from the given FileList instance.
    //     // such a list can be obtained from a drop event or file input.
    //     addVCards: function(fileList) {
    //         _.each(fileList, function(file) {
    //             var reader = new FileReader();

    //             helpers.addEvent(reader, 'load', function() {
    //                 vCardJS.VCF.parse(reader.result, function(vcard) {
    //                     this.create(vcard);
    //                 }, this);
    //             }, this);

    //             reader.readAsText(file);
    //         }, this);
    //     },

    //     // bind given receiver to this contact list, by setting
    //     // a set of event handlers.
    //     // the given ref can be used to overwrite or remove this
    //     // binding (unbind).
    //     // handlers is a map { name : function }, e.g.:
    //     //   { add: function() { console.log('added'); } }
    //     bind: function(ref, receiver, handlers) {
    //         this._bindings[ref] = {
    //             receiver: receiver, handlers: handlers
    //         };

    //         if(handlers.add) {
    //             // call 'add' for all current items,
    //             // in case the receiver is bound late.
    //             _.each(this.items, function(item) {
    //                 handlers.add.apply(receiver, [item])
    //             });
    //         }
    //     },

    //     // remove binding with the given ref.
    //     unbind: function(ref) {
    //         delete this._bindings[ref];
    //     },

    //     // trigger event of given type with the given arguments.
    //     trigger: function(type, args) {
    //         _.each(this._bindings, function(binding) {
    //             var handler = binding.handlers[type];
    //             if(handler) {
    //                 handler.apply(binding.receiver, args);
    //             }
    //         }, this);
    //     }

    // };

    // return ContactList;

  return remoteStorage.contacts;

});

