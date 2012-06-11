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
    'underscore', 'vcardjs', 'helpers'
], function(_, vCardJS, helpers) {

    var VCard = vCardJS.VCard;

    var ContactList = function() {
        this._bindings = {};
        this.items = [];
    }

    function instanceMethods(contactList) {
        return {
            
            save: function() {
                return contactList.save(this);
            },

            setAttributes: function() {
                console.log('set attributes', arguments);
            }

        };
    }

    ContactList.prototype = {

        add: function(item) {
            this.items.push(item);
            this.trigger('add', [item]);
        },

        get: function(uid) {
            return this._wrap(syncer.getItem('contacts', uid));
        },

        _wrap: function(attributes) {
            return _.extend(
                {},
                (attributes instanceof VCard) ?
                    attributes :
                    new VCard(attributes),
                instanceMethods(this)
            );
        },

	      build: function() {
            return this._wrap(new VCard());
	      },

        save: function(attributes) {
            var item = this._wrap(attributes);
            if(item.validate()) {
                syncer.setItem('contacts', item.uid, item.toJCard());
                this.add(item);
            } else {
                console.error("Item has errors:", item.errors);
            }
            return item;
        },

        addVCards: function(fileList) {
            _.each(fileList, function(file) {
                var reader = new FileReader();

                helpers.addEvent(reader, 'load', function() {
                    vCardJS.VCF.parse(reader.result, function(vcard) {
                        this.create(vcard);
                    }, this);
                }, this);

                reader.readAsText(file);
            }, this);
        },

        bind: function(ref, receiver, bindings) {
            this._bindings[ref] = {
                receiver: receiver, bindings: bindings
            };

            if(bindings.add) { // call 'add' for all current items
                _.each(this.items, function(item) {
                    bindings.add.apply(receiver, [item])
                });
            }
        },

        unbind: function(ref) {
            delete this._bindings[ref];
        },

        trigger: function(type, args) {
            console.log('TRIGGER', type);
            _.each(this._bindings, function(attrs) {
                var handler = attrs.bindings[type];
                if(handler) {
                    handler.apply(attrs.receiver, args);
                }
            }, this);
        }

    };

    return ContactList;

});

