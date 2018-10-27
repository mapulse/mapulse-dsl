
/*
 * Re: passing data to the parser .js
 * We just need to add to the options arg in
 * peg$parse function.
 * Then we just make sure to have included
 * let data = options.data at the top of 
 * grammar file, and we are able to use it.
*/

require('pegjs');
var parser = require('./grammar.js');
var Mapulse = function (data, query) {
    this.data = data;
    this.query = query;
};

Mapulse.prototype.call = function () {
    return parser.parse(
        this.query, 
        {
            data: this.data,
        }
    );
};

module.exports = Mapulse;
