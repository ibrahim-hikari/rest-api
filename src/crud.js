'use strict';

class Model {
    constructor(schema) {
        this.schema = schema;
    }

    read(_id) {
        if (_id) {
            return this.schema.findOne({ _id });
        } else {
            return this.schema.find({});
        }
    }

    create(record) {
        let newRecord = new this.schema(record);
        return newRecord.save();
    }

    update(_id, record) {
        return this.schema.findByIdAndUpdate(_id, record);
    }

    delete(_id) {
        return this.schema.findByIdAndDelete(_id);
    }
}

module.exports = Model;