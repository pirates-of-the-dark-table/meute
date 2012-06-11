define(['underscore'], function(_) {

    return {
        addEvent: function(elem, type, handler, context) {
            var boundHandler = context ? _.bind(handler, context) : handler;
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

        setParams: function(params) {
            history.pushState({}, null, this.generateParams(params));
            Meute.loadState();
        },

        classNames: function(elem) {
            return elem.getAttribute('class').split(/\s+/);
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
            }, '');
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
                div.appendChild(part);
            });
            return div;
        },

        input: function(object, name, labelText, type) {
            var label = document.createElement('label');
            var input = document.createElement('input');
            var id = 'form-input-' + name;
            input.setAttribute('type', type || 'text');
            input.setAttribute('name', name);
            input.setAttribute('id', id);
            input.setAttribute('value', object[name] || '');
            label.innerText = labelText;
            label.setAttribute('for', id);
            return this.div('input', [label, input]);
        }
    };

});