'use strict';

module.exports = (req, res, next) => {
    res.status(404);
    res.statusMessage = 'Not Found';
    res.send({ erorr: 'Ops! Not Found' })
}