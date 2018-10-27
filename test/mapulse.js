const fs = require('fs');
const query = fs.readFileSync('query.mapulse','utf8');
const Mapulse = require('../index');
const data = [{
    hello: 10,
}];

const mapulse = new Mapulse (data, query);
console.log(mapulse.call());
