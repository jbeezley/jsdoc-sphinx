/* global describe, it */

require('should');
var tree = require('../lib/tree');
var taffy = require('taffydb').taffy;

describe('tree', function () {
    it('empty tree', function () {
        tree(taffy([])).should.eql({
            attributes: {},
            functions: {},
            modules: {},
            namespaces: {}
        });
    });
});
