'use strict';

const mongoose = require('../../common/services/mongoose.service');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    permissionLevel: Number
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true
});

userSchema.findById = function (cb) {
    return this.model('Users').find({ id: this.id }, cb);
};

const User = mongoose.model('Users', userSchema);

const findByEmail = (email) => {
    return User.find({ email: email });
};

const findById = (id) => {
    return User.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        })
}

const createUser = (userData) => {
    const user = new User(userData);
    return user.save();
};

const updateUser = (_id, userData) => {
    return User.findByIdAndUpdate(_id, userData)
}

const list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        User.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

const patchUser = (id, userData) => {
    return User.findOneAndUpdate({
        _id: id
    }, userData)
}

const removeById = (userId) => {
    return new Promise((resolve, reject) => {
        User.deleteMany({ _id: userId }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

module.exports = {
    findByEmail,
    findById,
    createUser,
    updateUser,
    list,
    patchUser,
    removeById
}