'use strict';

module.exports = (err, req, res, next) => {
    res.status(500);
    res.statusMessage = 'Generic Server Erorr!';
    res.send({ erorr: err })
};