define(['underscore'], function(_) {

    return {
        // bind event handler for given type to given element.
        // Example:
        //   helpers.addEvent(window, 'load', function(event) {
        //     // window.onload was fired!
        //   });
        // 'handler' will be bound to given 'context'.
        addEvent: function(elem, type, handler, context) {
	          var wrappedHandler = function(event) {
		            event = event || window.event;
		            handler.apply(this, [event]);
		            return !event.cancelBubble;
	          }
            var boundHandler = context ? _.bind(wrappedHandler, context) : wrappedHandler;
            if(elem == null || elem == undefined) {
                return;
            } else if(elem.addEventListener) {
                elem.addEventListener(type, boundHandler, false);
            } else if(elem.attachEvent) {
                elem.attachEvent("on" + type, boundHandler);
            } else {
                elem["on" + type] = boundHandler;
            }
        },

        // stop event from propagating and prevent default.
	      stopEvent: function(event) {
	          if(event.stopPropagation) {
		            event.stopPropagation();
	          } else {
		            event.cancelBubble = true;
	          }
	          if(event.preventDefault) {
		            event.preventDefault();
	          }
	      },

        // combination of addEvent / stopEvent
        catchEvent: function(elem, type, handler, context) {
            var boundHandler = context ? _.bind(handler, context) : handler;
            this.addEvent(elem, type, function(event) {
                this.stopEvent(event);
                boundHandler(event);
            }, this);
        },

        setParams: function(params) {
            history.pushState({}, null, this.generateParams(params));
            Meute.loadState();
        },

        classNames: function(elem) {
            return (elem.getAttribute('class') || '').split(/\s+/);
        },

        addClass: function(elem, className) {
            var classNames = this.classNames(elem);
            classNames.push(className)
            elem.setAttribute('class', classNames.join(' '));
        },

        removeClass: function(elem, className) {
            var classNames = this.classNames(elem);
            delete classNames[classNames.indexOf(className)];
            elem.setAttribute('class', classNames.join(' '));
        },

        generateParams: function(params) {
            return _.inject(params, function(output, value, key) {
                var sep = output.length == 0 ? '?' : '&';
                return output + sep + key + '=' + value;
            }, '') || '?';
        },

        parseParams: function(queryString) {
            return _.inject(queryString.split(/[\?&]/), function(params, part) {
                var md = part.split('=');
                if(md[0]) {
                    params[md[0]] = md[1];
                }
                return params;
            }, {});
        },

        showElement: function(element) {
            element.style.display = 'block';
        },

        hideElement: function(element) {
            element.style.display = 'none';
        },

        div: function(className, content) {
            var div = document.createElement('div');
            div.setAttribute('class', className);
            if(! (content instanceof Array)) {
                content = [content];
            }
            _.each(content, function(part) {
                if(! part) {
                    return;
                }
                if(typeof(part) == 'string') {
                    part = document.createTextNode(part);
                }
                console.log('will append part', part, 'to', div);
                div.appendChild(part);
            });
            return div;
        },

        input: function(object, name, labelText, type, selectOptions) {
            var label = '';
            var id = 'form-input-' + name;
	          var input;

	          if(labelText) {
		            label = document.createElement('label');
		            label.innerHTML = labelText;
		            label.setAttribute('for', id);
	          }

	          if(type == 'select') {
		            input = document.createElement('select');
		            _.each(selectOptions, function(label, value) {
		                var option = document.createElement('option');
		                option.setAttribute('value', value);
		                option.innerHTML = label;
		                if(object[name] == value) {
			                  option.setAttribute('selected', 'selected');
		                }
		                input.appendChild(option);
		            });
	          } else {
		            input = document.createElement('input');
		            input.setAttribute('type', type || 'text');
		            input.setAttribute('value', object[name] || '');
	          }
	          input.setAttribute('id', id);
	          input.setAttribute('name', name);
            return this.div('input', [label, input]);
        },

	      button: function(label, handler, context, type) {
	          var input = document.createElement('input');
	          input.setAttribute('type', type || 'button');
	          input.setAttribute('value', label);
	          if(handler) {
		            this.catchEvent(input, 'click', function(event) {
		                handler.apply(context || this, [event]);
		            }, this);
	          }
	          return input;
	      },

	      submit: function(label) {
	          return this.button(label, null, null, 'submit');
	      }
    };

});

