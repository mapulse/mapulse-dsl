const mocha = require('mocha');
const chai = require('chai');
const assert = chai.assert;
const Mapulse = require('../index');
const m = new Mapulse();

describe('----MapD Test Suite----', function () {
    describe ('simple retrieval', function () {
        it('should retrieve a single value', function () {
            m.set({example_0: 'some value'}, 'from data\nreturn (.example_0 data)');
            assert.equal(m.call(), 'some value');
        });
        it('should retrieve a nested value', function () {
            m.set({
                example_1: {
                    example_1: {
                        example_1: 'some nested value',
                    },
                }
            }, 'from data\nreturn (.example_1.example_1.example_1 data)');
            assert.equal(m.call(), 'some nested value');
        });
        it('should get the 4th value in the array = 10305', function () {
            m.set([
                {example_1: 15},
                {example_1: 25},
                {example_1: 45},
                {example_1: 10305},
            ], 'from data\nreturn (.3.example_1 data)');
            assert.equal(m.call(), 10305);
        })
    });
    describe('basic arithmetics with data', function () {
        it('should subtract data.example_0 by 10 to return 5', function () {
            m.set({
                example_0: 15
            }, 'from data\nreturn (- (.example_0 data) 10)');
            assert.equal(m.call(), 5);
        });
    });
    describe('filter through the array dataset', function () {
        it('should get the first value that is greater than 5', function () {
            m.set([
                {example_0: -190},
                {example_0: 3},
                {example_0: 4},
                {example_0: 19999},
            ], 'from data\nreturn (.0 (filter (map data .example_0) (gt 5)))');
            assert.equal(m.call(), 19999);
        });
        it('should get the element whose value is greater than 5', function () {
            m.set([
                {example_0: -190},
                {example_0: 3},
                {example_0: 4},
                {example_0: 19999},
            ], 'from data\nreturn (.0 (filter data (gt 5 $ .example_0)))');
            assert.equal(m.call(), 19999);
        });
        it('should get the index of the value that is greater than 5', function () {
            m.set([
                {example_0: -190},
                {example_0: 3},
                {example_0: 4},
                {example_0: 19999},
            ], 'from data\nreturn (findIndex (map data .example_0) gt 5)');
            assert.equal(m.call(), 3);
        });
    });
    describe('using reduce to produce an acc', function () {
        it('should loop through and accumulate 10, 15, 20 to get 45', function () {
            m.set([
                {example_0: 10},
                {example_0: 15},
                {example_0: 20},
            ], 'from data\nreturn (reduce (map data .example_0) +)');
            assert.equal(m.call(), 45);
        });
    });
});
