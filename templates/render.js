module.exports = function (type, data, indent) {
    var output;

    if (Array.isArray(data) && type !== 'arglist') {
        return _.map(data, function (d) {
            return module.exports(type, d, indent);
        }).join('\n\n');
    }

    if (data === undefined) {
        return '';
    }

    switch (type) {
        case 'function':
        case 'class':
        case 'module':
        case 'namespace':
        case 'parameter':
        case 'attribute':
        case 'return':
            output = templates[type](data);
            break;

        case 'block':
            output = data;
            break;

        case 'oneline':
            output = data.replace(/\n/mg, ' ');
            break;

        case 'arglist':
            output = arglist(data);
            break;
    }

    return deindent(output || '', indent).trimRight();
};

var fs = require('fs');
var _ = require('lodash');
var locals = {
    render: module.exports,
    domain: 'js'
};
var options = {
    variable: 'data',
    imports: locals
};
var loadTemplate = function (name) {
    var s = fs.readFileSync(__dirname + '/../templates/' + name);
    return _.template(s, null, options);
};
var templates = {
    'class': loadTemplate('class.tmpl'),
    'function': loadTemplate('function.tmpl'),
    'module': loadTemplate('module.tmpl'),
    'namespace': loadTemplate('namespace.tmpl'),
    'parameter': loadTemplate('parameter.tmpl'),
    'return': loadTemplate('return.tmpl'),
    'attribute': loadTemplate('attribute.tmpl')
};
var deindent = function (text, tab) {
    var indent = text.match(/^ +/);
    var re;

    indent = indent || [''];
    re = RegExp('^' + indent[0], 'gm');
    text = text.replace(re, tab || '');

    return text;
};

var arglist = function (args) {
    if (!args || args.length === 0) {
        return '';
    }
    // TODO: optional, defaults, nullable, etc
    return _.map(args, _.property('name')).join(', ');
};
