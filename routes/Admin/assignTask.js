var dbAssignTasks = require('../../models/assignTasks')

exports.assignTask = (req, res) => {
    
    if (!req.body.status || !req.body.email || !req.body.details ||!req.body.startDate) {
        res.json({
            success: false,
            msg: "Please Enter all details"
        })
    } else if ((req.body.status == 4 && !req.body.date) || (req.body.status == 5 && (!req.body.date || !req.body.gap))) {
        res.json({
            success: false,
            msg: "Please provide all details"
        })
    } else {
        dbAssignTasks.findOne({ email: req.body.email }, (err, userData) => {
            if (err) {
                res.json({
                    success: false,
                    msg: "Something went wrong"
                })
            } else if (!userData || userData == null) {
                if (req.body.status == 4) {
                    var newTask = {
                        details: req.body.details,
                        status: req.body.status,
                        date: req.body.date,
                        lastDate: req.body.lastDate,
                        startDate:req.body.startDate
                    }
                } else if (req.body.status == 5) {
                    var newTask = {
                        details: req.body.details,
                        status: req.body.status,
                        date: req.body.date,
                        gap: req.body.gap,
                        lastDate: req.body.lastDate,
                        startDate:req.body.startDate
                    }
                } else {
                    var newTask = {
                        details: req.body.details,
                        status: req.body.status,
                        lastDate: req.body.lastDate,
                        startDate:req.body.startDate
                    }
                }
                var newUser = new dbAssignTasks({
                    email: req.body.email,
                    task: [newTask]
                })
                newUser.save((err, savedData) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: "Database Error"
                        })
                    } else {
                        res.json({
                            success: true,
                            msg: "New task assigned"
                        })
                    }
                })
            } else {
                if (req.body.status == 4) {
                    var newTask = {
                        details: req.body.details,
                        status: req.body.status,
                        date: req.body.date,
                        lastDate: req.body.lastDate,
                        startDate:req.body.startDate
                    }
                } else if (req.body.status == 5) {
                    var newTask = {
                        details: req.body.details,
                        status: req.body.status,
                        date: req.body.date,
                        gap: req.body.gap,
                        lastDate: req.body.lastDate,
                        startDate:req.body.startDate
                    }
                } else {
                    var newTask = {
                        details: req.body.details,
                        status: req.body.status,
                        lastDate: req.body.lastDate,
                        startDate:req.body.startDate
                    }
                }
                dbAssignTasks.findOneAndUpdate({ email: req.body.email }, { $push: { task: newTask } }, (err, updated) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: "Something went wrong"
                        })
                    } else {
                        res.json({
                            success: true,
                            msg: "Task assigned"
                        })
                    }
                })
            }
        })
    }
}