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
    });
});
