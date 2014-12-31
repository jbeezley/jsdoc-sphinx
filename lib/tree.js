
var handlers = {};

var handle = function (data, root, level, el) {
    if (_.has(handlers, el.kind)) {
        return handlers[el.kind](data, root, level, el);
    } else {
        // print warning on verbose output
        return null;
    }
};

var parseRoot = function (data, root, level) {
    level = level || 0;
    data({memberof: root.longname}).each(_.partial(handle, data, root, level));
};

handlers.namespace = function (data, root, level, el) {
    root.namespaces[el.name] = el;
    el.namespaces = {};
    el.functions = {};
    el.attributes = {};
    parseRoot(data, el, level + 1);
};

module.exports = function (data) {
    var root = {
        namespaces: {},
        modules: {},
        functions: {},
        attributes: {}
    };

    data({undocumented: true}).remove();
    data({memberof: [undefined, 'window']}).each(function (el) {
        handle(data, root);
    });

    return root;
};
