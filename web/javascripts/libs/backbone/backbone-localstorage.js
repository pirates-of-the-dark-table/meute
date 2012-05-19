// A simple module to replace `Backbone.sync` with *localStorage*-based
// persistence. Models are given GUIDS, and saved into JSON objects + a index.
// Simple as that.

define(
    ['underscore', 'backbone'],
    function(_, Backbone) {

        /**
         * Helper functions
         **/

        // Generate four random hex digits.
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };

        // Generate a pseudo-GUID by concatenating random hexadecimal.
        function guid() {
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        };

        function buildKey(categoryName, id) {
            return categoryName + '-' + id;
        }

        function buildIndexKey(categoryName) {
            return categoryName + '-index';
        }

        function getIndex(categoryName) {
            var data = localStorage.getItem(buildIndexKey(categoryName));
            return data ? _.without(JSON.parse(data), null) : [];
        }

        function saveIndex(categoryName, index) {
            localStorage.setItem(
                buildIndexKey(categoryName),
                JSON.stringify(index)
            );
        }

        function addToIndex(categoryName, model) {
            var index = getIndex(categoryName);
            index.push(model.id);
            saveIndex(categoryName, index)
        }

        function removeFromIndex(categoryName, model) {
            var index = getIndex(categoryname);
            saveIndex(categoryName, _.without(index, model.id));
        }

        function doSync(categoryName, method, model) {
            switch (method) {
            case "read":

                var data;

                if(model.id) {
                    // read single item
                    return JSON.parse(
                        localStorage.getItem(buildKey(categoryName, model.id))
                    );
                } else {
                    // read collection
                    return _.map(getIndex(categoryName), function(id) {
                        return JSON.parse(
                            localStorage.getItem(buildKey(categoryName, id))
                        );
                    });
                }

                break;

            case "create":

                if(! model.id) {
                    model.id = guid();
                    // has to be set as well, so it is actually saved and later recovered.
                    model.attributes.id = model.id;
                }

                addToIndex(categoryName, model);

                // fall through!
            case "update":

                localStorage.setItem(
                    buildKey(categoryName, model.id),
                    JSON.stringify(model)
                );

                return model;
                break;

            case "delete":

                removeFromIndex(categoryName, model);
                localStorage.removeItem(buildKey(categoryName, model.id));

                return model;
                break;
            }
        }

        /**
         * Backbone extension
         **/

        Backbone._preLocalStorageSync = Backbone.sync;

        _.extend(Backbone, {

            // call Backbone.keepOriginalSync() to keep the original syncing method
            // intact.
            // Your callback will hence be called twice, once (the first time),
            // when the data is in localStorage, then (possibly) again when the
            // data ended up on server or whereever.
            keepOriginalSync: function() {
                this.afterSync = this._preLocalStorageSync;
            },

            // overridden Backbone.sync to store given model in localStorage.
            sync: function(method, model, options) {

                // determine categoryName based on model or collection setting.

                var categoryName = model.categoryName ||
                    model.collection.categoryName;

                if(! (typeof(categoryName) == 'string')) {
                    options.error(
                        "categoryName neither set for model: ", model,
                        "nor it's collection: ", model.collection,
                        "Won't sync with localStorage."
                    );
                    return;
                }

                var response = doSync(categoryName, method, model);

                if (response) {
                    options.success(response);
                } else {
                    options.error("Record not found");
                }

                if(this.afterSync) {
                    this.afterSync.apply(this, arguments);
                }
            }

        });

        return Backbone;
    }
);

