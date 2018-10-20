const fs = require('fs');
const peg = require('pegjs');
const grammar = fs.readFileSync('grammar.pegjs', 'utf8');
const query = fs.readFileSync('query.mapulse', 'utf8');
const parser = peg.generate(grammar);
const result = parser.parse(query);


/*
const parser = require('./grammar.js');
const result = parser.parse(query, {}, 
    {
        dog0: {
            paw: {
                size: 10,
            },
        },
    }
);*/

/*
 * Re: passing data to the parser .js
 * We just need to add an argument to the 
 * peg$parse function inside the generated
 * parser file, call it _data.
 * Then we just make sure to have included
 * let data = _data at the top of the grammar
 * file, and we are able to use it.
* */

console.log('Result: ', result);
