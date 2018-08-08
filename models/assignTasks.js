var mongoose = require('mongoose')
var Schema = mongoose.Schema

/**
 * status
 * 1:daily
 * 2:alternate days MWF
 * 3:Alternate days TTS
 * 4:Fixed day Single  //specific date necessary
 * 5:Repeat after particular interval  //specific date and gap necessary
 */


var assignTask = new Schema({
    email: {
        type: String,
        unique: true
    },
    task: [{
        details: String,
        status: Number,
        startDate:Date,
        lastDate: Date,
        date: Date,
        gap: Number,
        completion: [{
            date: Date,
            completed: Boolean,
            competedAt: Date
        }]
    }]
})

module.exports = mongoose.model('assigntask', assignTask)