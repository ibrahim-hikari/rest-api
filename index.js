'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

const server = require('./src/server.js');

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

const mongooseOptions = {
    autoIndex: false,
    bufferMaxEntries: 0,
    poolSize: 5,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
};

mongoose.connect(MONGODB_URI, mongooseOptions);

server.start(PORT);