var dbTasks = require('../../models/tasks')

var checkDate = (bodyDate, allDates) => {
    return new Promise((resolve, reject) => {
        var flag = 0;
        // console.log("-=-=-===-=-=-=-=-=-=-=-=", bodyDate)
        var date1 = new Date(bodyDate)
        var date2 = date1.setHours(0, 0, 0, 0)
        // console.log("////////////////////////////", typeof(date2), date2)
        var date = date2;
        allDates.forEach(element => {
            // element.date = element.date.setHours(0, 0, 0, 0)
            // console.log(typeof(element.date).setHours(0, 0, 0, 0), element.date.setHours(0, 0, 0, 0))
            // console.log(element.date.getTime(), '=======', date, '----------', element.date.getTime() == date)
            if (element.date.setHours(0, 0, 0, 0) == date) {
                flag = 1
            }
        });
        resolve({
            flag: flag
        })
    })

}
exports.taskEntry = (req, res) => {
    var date = new Date(req.body.date)
    var date1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    // console.log(req.body.date, typeof req.body.date, new Date(req.body.date), typeof new Date(req.body.date))
    // var date = req.body.date;
    // req.body.date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (!req.body.date || !req.body.time || !req.body.task) {
        res.json({
            success: false,
            msg: "You have not entered all details"
        })
    } else {
        dbTasks.findOne({ email: req.decoded.email }, (err, taskData) => {
            if (err) {
                res.json({
                    success: false,
                    msg: "Database error"
                })
            } else if (!taskData || taskData == null) {
           
                var newTask = new dbTasks({
                    email: req.decoded.email,
                    tasks: [{
                        date: date1,
                        details: [{
                            time: req.body.time,
                            task: req.body.task,
                            updated: new Date()
                        }]
                    }]
                })
                console.log('hello',newTask);
                newTask.save((err, savedData) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: "Details not saved. Please retry"
                        })
                    } else {
                        res.json({
                            success: true,
                            msg: "Data inserted"
                        })
                    }
                })
            } else {
                var newtaskentry;
                // console.log('****************', req.body)
                checkDate(req.body.date, taskData.tasks).then(data => {
                    console.log(data)
                    if (data.flag != 1) {
                        newtaskentry = {
                            date: date1,
                            details: [{
                                time: req.body.time,
                                task: req.body.task,
                                updated: new Date()
                            }]
                        }
                        console.log('---------------------------------')
                        console.log(newtaskentry)
                        dbTasks.findOneAndUpdate({ email: req.decoded.email }, { $push: { tasks: newtaskentry, updatedAt: new Date() } }, (err, upData) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: "Database Error"
                                })
                            } else {
                                res.json({
                                    success: true,
                                    msg: "Task updated"
                                })
                            }
                        })
                    } else {
                        newtaskentry = {
                            time: req.body.time,
                            task: req.body.task,
                            updated: new Date()
                        }
                        console.log('else part', newtaskentry)
                        dbTasks.findOneAndUpdate({ $and: [{ email: req.decoded.email }, { 'tasks.date': date1 }] }, { $push: { 'tasks.$.details': newtaskentry, updatedAt: new Date() } }, (err, upData) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: "Something went wrong"
                                })
                            } else {
                                res.json({
                                    success: true,
                                    msg: "Task entered"
                                })
                            }
                        })
                    }
                }).catch(err => {
                    console.log(err)
                    res.json({
                        success: false,
                        msg: "Something went wrong"
                    })
                })
            }
        })
    }
}