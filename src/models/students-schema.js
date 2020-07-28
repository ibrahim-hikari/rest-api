'use strict';

const mongoose = require('mongoose');

const students = mongoose.Schema({
    std_num: { type: Number, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    nationality: { type: String, required: true },
    religion: { type: String, required: true },
});

module.exports = mongoose.model('students', students);