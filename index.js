 /*
 * Copyright [2018] [mapulse.io (Mapulse)]
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 */

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
