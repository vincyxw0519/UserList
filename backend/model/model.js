const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
    firstname: String,
    lastname: String,
    sex: String,
    age: Number,
    password: String,
    },
    {
    collection: 'userlist'
    }
);

module.exports = mongoose.model('userlist', UserSchema);