'use strict';

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const apiRouter = require('./route.js')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(apiRouter);
app.use(express.static('./public'));
app.set('view engine', 'ejs');

module.exports = {
    server: app,
    start: port => {
        let PORT = port || process.env.PORT || 3030;
        app.listen(PORT, () => console.log('Welcome to my world ' + PORT));
    }
};