var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userLogin = new Schema({
    email: { type: String, required: true, unique: true },
    name: String,
    password: String,
    status: Number,
    time: [{
        loginTime: Date,
        logoutTime: Date
    }]
})

module.exports = mongoose.model('userLogin', userLogin);