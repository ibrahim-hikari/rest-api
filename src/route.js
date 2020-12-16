'use strict';

const express = require('express');
const methodOverride = require('method-override');
const router = express.Router();

const modelFinder = require('./common/middlewares/model-finder')

// router.use(methodOverride(middleware));

router.param('model', modelFinder.loadFile);

router.get('/', test);

function test(req, res) {
    res.status(200).send('hello Narnia')
}

router.get('/ourapi/v1/:model', [findAll]);
router.get('/ourapi/v1/:model/:_id', findById);
router.post('/ourapi/v1/:model', createOne);
router.put('/ourapi/v1/:model/:_id', updateOne);
router.delete('/ourapi/v1/:model/:_id', deleteOne);

function findAll(req, res, next) {
    req.model.read()
        .then(data => {
            res.json({ data })
        })
        .catch(next);
}

function findById(req, res, next) {
    let _id = req.params._id;
    console.log('_ID', _id);
    req.model.read(_id)
        .then(data => {
            res.json(data)
        })
}

function createOne(req, res, next) {
    let record = req.body;
    console.log('data', record)
    req.model.create(record)
        .then(data => {
            res.json(data)
        })
        .catch(next);
}

function updateOne(req, res, next) {
    let _id = req.params._id;
    let record = req.body;

    req.model.update(_id, record)
        .then(data => {
            res.json(data)
        })
        .catch(next)
}

function deleteOne(req, res, next) {
    let _id = req.params._id
    req.model.delete(_id)
        .then(
            res.send('DELETED')
        )
        .catch(next)
}


module.exports = router;