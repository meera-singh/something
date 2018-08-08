var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var task = new Schema({
    email: String,
    tasks: [{
        date: Date,
        details: [{
            time: String,
            task: String,
            updated: Date
        }],
        
    }],
    assignedTask:[{
        task: String,
        completedAt: Date
    }],
    updatedAt: [Date]
})

module.exports = mongoose.model('task', task);