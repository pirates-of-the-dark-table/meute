define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/contact/import.html'
], function($, _, Backbone, template){

    var View = Backbone.View.extend({

        tagName: 'div',

        el: $('<div id="import"></div>'),

        template: _.template(template),

        events: {
            'click .submit': 'doImport',
            'click .choose': 'chooseFile',
            'change input[type="file"]': 'addFile',
            'dragenter .drop-target': 'activateDropTarget',
            'dragleave .drop-target': 'deactivateDropTarget',
            'drop .drop-target': 'dropFiles'
        },

        files: [],

        render: function(){
            this.$el.html(this.template());
            return this;
        },

        close: function(){
            this.$el.html('');
        },

        activateDropTarget: function() {
            this.$('.drop-target').addClass('active');
        },

        deactivateDropTarget: function() {
            this.$('.drop-target').removeClass('active');
        },

        dropFiles: function(evt) {
            evt.originalEvent.preventDefault();
            this.addFiles(evt.originalEvent.dataTransfer.files);
            this.deactivateDropTarget();
        },

        chooseFile: function() {
            this.$('input[type="file"]').click();
        },

        addFile: function(evt) {
            var input = this.$('input[type=file]')[0];
            this.addFiles(input.files);
        },

        addFiles: function(files) {
            _.each(files, function(file) {
                var i = this.files.length;
                this.renderFile(file, i);
                this.files[i] = file;
            }, this);
        },

        renderFile: function(file, index) {
            var li = $('<li class="file">');
            li.attr('data-index', index);
						li.text(file.name || file.fileName);
            this.$('.files').append(li);
        },

        doImport: function(){
            _.each(this.files, function(file) {
                if(! file) {
                    return;
                }

			          var reader = new FileReader();

                reader.onload = _.bind(function() {
                    this.collection.addFromVCardData(reader.result);
                }, this);

			          reader.readAsText(file);
                
            }, this);
		    }
		    
    });

    return View;
});
