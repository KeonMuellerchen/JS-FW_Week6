const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findorcreate = require('mongoose-findorcreate');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username: String,
    password: String
});

userSchema.plugin(findorcreate);
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;