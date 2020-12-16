'use strict';

const fs = require('fs');
const util = require('util');
const reddir = util.promisify(fs.readdir);

const folder = `${__dirname}/../models`

const loadFile = (req, res, next) => {
    let modelName = req.params.model.replace(/[^a-z0-9-_]/gi, '');
    const Model = require(`${folder}/${modelName}-model.js`);
    req.model = new Model();
    next();
}

module.exports = { loadFile };