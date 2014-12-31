/* global describe, it */

require('should');
var dir = process.env.COV_PATH || 'templates';
var render = require('../' + dir + '/render');

describe('render', function () {
    describe('basic', function () {
        it('parameter', function () {
            render('parameter', {
                name: 'avar',
                description: 'This is a variable',
                type: '{string}'
            }).should.equal([
                ':param avar: This is a variable',
                ':type avar: {string}'
            ].join('\n'));
        });

        it('return', function () {
            render('return', {
                description: 'some value',
                type: '{object}'
            }).should.equal([
                ':return: some value',
                ':rtype: {object}'
            ].join('\n'));
        });

        describe('block', function () {
            it('single line, no indent', function () {
                render('block',
                    'This is a line of text.'
                ).should.equal(
                    'This is a line of text.'
                );
            });
            it('indented line, no indent', function () {
                render('block',
                    '    This is a line of text.'
                ).should.equal(
                    'This is a line of text.'
                );
            });
            it('indented line, with indent', function () {
                render('block',
                    '    This is a line of text.',
                    '  '
                ).should.equal(
                    '  This is a line of text.'
                );
            });
            it('multiline, no indents', function () {
                render('block', [
                    'This is a line of text.',
                    'Line 2'
                ].join('\n')).should.equal([
                    'This is a line of text.',
                    'Line 2'
                ].join('\n'));
            });
            it('multiline, second line indented', function () {
                render('block', [
                    'This is a line of text.',
                    '    Line 2'
                ].join('\n')).should.equal([
                    'This is a line of text.',
                    '    Line 2'
                ].join('\n'));
            });
            it('multiline, first line indented', function () {
                render('block', [
                    '    This is a line of text.',
                    'Line 2'
                ].join('\n')).should.equal([
                    'This is a line of text.',
                    'Line 2'
                ].join('\n'));
            });
            it('indented multiline, no indent', function () {
                render('block', [
                    '    This is a line of text.',
                    '    Line 2'
                ].join('\n')).should.equal([
                    'This is a line of text.',
                    'Line 2'
                ].join('\n'));
            });
            it('indented multiline, two space indent', function () {
                render('block', [
                    '    This is a line of text.',
                    '      Line 2'
                ].join('\n'), '  ').should.equal([
                    '  This is a line of text.',
                    '    Line 2'
                ].join('\n'));
            });
        });

        describe('oneline', function () {
            it('single line', function () {
                render('oneline', 'A line').should.equal('A line');
            });
            it('multiline', function () {
                render('oneline', 'A line\nAnother line.').should.equal('A line Another line.');
            });
        });

        describe('arglist', function () {
            it('no args', function () {
                render('arglist').should.equal('');
            });
            it('empty args', function () {
                render('arglist', []).should.equal('');
            });
            it('one arg', function () {
                render('arglist', [
                    {
                        name: 'arg1',
                        description: '',
                        type: 'string'
                    }
                ]).should.equal('arg1');
            });
            it('two args', function () {
                render('arglist', [
                    {
                        name: 'arg1',
                        description: '',
                        type: 'string'
                    },
                    {
                        name: 'arg2',
                        description: 'zzz',
                        type: 'object'
                    }
                ]).should.equal('arg1, arg2');
            });
        });

        it('function', function () {
            render('function', {
                type: 'function',
                name: 'foo',
                parameters: [
                    {
                        name: 'a',
                        description: 'A var',
                        type: 'integer'
                    },
                    {
                        name: 'b',
                        description: 'B var',
                        type: 'string'
                    }
                ],
                description: 'A function that does something.\nAfter doing something it returns something.',
                'return': {
                    description: 'A return value',
                    type: 'object'
                }
            }).trim().should.equal([
                '.. js:function:: foo(a, b)',
                '',
                '    A function that does something.',
                '    After doing something it returns something.',
                '',
                '    :param a: A var',
                '    :type a: integer',
                '',
                '    :param b: B var',
                '    :type b: string',
                '',
                '    :return: A return value',
                '    :rtype: object'
            ].join('\n'));
        });

        it('class', function () {
            render('class', {
                name: 'Foo',
                parameters: [
                    {
                        name: 'a',
                        description: 'A var',
                        type: 'integer'
                    }
                ],
                description: 'A class that does something.\n  * one\n  * two',
                underline: '--------',
                attributes: [
                    {
                        name: 'bar',
                        description: 'An attribute.\nThis is a block description.'
                    }
                ],
                functions: [
                    {
                        name: 'foo',
                        description: 'A class method',
                        type: 'method'
                    }
                ]
            }).trim().should.equal([
                'Foo',
                '--------',
                '',
                '.. js:class:: Foo(a)',
                '',
                '    A class that does something.',
                '      * one',
                '      * two',
                '',
                '    :param a: A var',
                '    :type a: integer',
                '',
                '    .. js:attribute:: bar',
                '    ',
                '        An attribute.',
                '        This is a block description.',
                '',
                '     .. js:method:: foo()',
                '     ',
                '         A class method'
            ].join('\n'));
        });
    });
});
