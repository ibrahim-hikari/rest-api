'use strict';

const JWT_SECRET = process.env.JWT_SECRET,
    jwt = require('jsonwebtoken');
const crypto = require('crypto');

const login = (req, res) => {
    try {
        let refreshId = req.body.userId + JWT_SECRET;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        let token = jwt.sign(req.body, JWT_SECRET);
        console.log('here', req.body.refreshKey)
        let buffer = Buffer.from(hash);
        let refresh_token = buffer.toString('base64');
        res.status(201).send({ accessToken: token, refreshToken: refresh_token })
    } catch (err) {
        res.status(500).send({ error: err })
    }
};

const refresh_token = (req, res) => {
    try {
        req.body = req.jwt;
        let token = jwt.sign(req.body, JWT_SECRET);
        res.status(201).send({ id: token });
    } catch (err) {
        res.status(500).send({ error: err })
    }
};

module.exports = {
    login,
    refresh_token
}