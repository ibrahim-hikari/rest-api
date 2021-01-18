'use strict';

require('dotenv').config();

const jwt = require('jsonwebtoken'),
    SECRET = process.env.JWT_SECRET,
    crypto = require('crypto');

const verifyRefreshBodyField = (req, res, next) => {
    if (req.body && req.body.refresh_token) {
        return next();
    } else {
        return res.status(400).send({
            error: 'need to pass refresh_token field'
        });
    }
}

const validRefreshNeeded = (req, res, next) => {
    let buffer = Buffer.from(req.body.refresh_token, 'base64');
    let refresh_token = buffer.toString();
    let hash = crypto.createHmac('sha5512', req.jwt.refreshKey).update(req.jwt.userId + SECRET).digest('base64');
    if (hash === refresh_token) {
        req.body = req.jwt;
        return next();
    } else {
        return res.status(400).send({ error: 'Invalid Refresh Token' });
    }
};

const validJWTNeeded = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            console.log(jwt.verify(authorization[1], SECRET))
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                req.jwt = jwt.verify(authorization[1], SECRET);
                return next();
            }
        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }
};

module.exports = {
    verifyRefreshBodyField,
    validRefreshNeeded,
    validJWTNeeded
}