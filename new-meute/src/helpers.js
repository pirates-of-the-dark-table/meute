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

        parseParams: function(queryString) {
            return _.inject(queryString.split(/[\?&]/), function(params, part) {
                var md = part.split('=');
                if(md[0]) {
                    params[md[0]] = md[1];
                }
                return params;
            }, {});
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
        }
    };

});