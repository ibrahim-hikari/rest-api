'use strict';

const schema = require('./students-schema.js');
const Model = require('../crud.js');

class Students extends Model {
    constructor() {
        super(schema);
    }
}

module.exports = Students;