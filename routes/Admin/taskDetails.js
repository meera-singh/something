var dbTasks = require('../../models/tasks')
var dbUserLogin = require('../../models/login')


exports.getTasks = (req, res) => {
    if (!req.body.option) {
        res.json({
            success: false,
            msg: "Please provide option"
        })
    } else {
        var option = req.body.option;
        switch (option) {
            case 'all':
                dbTasks.find({}, (err, data) => {
                    if (err) {
                        res.json({
                            success: true,
                            msg: "Database Error"
                        })
                    } else {
                        dbUserLogin.find({}, (err, lData) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: "Error in database"
                                })
                            } else {
                                res.json({
                                    success: true,
                                    msg: "All data",
                                    taskData: data,
                                    loginData: lData
                                })
                            }
                        })

                    }
                })
                break;
            case 'email':
                dbTasks.findOne({ email: req.body.email }, (err, data) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: "Database Error"
                        })
                    } else {
                        dbUserLogin.findOne({ email: req.body.email }, (err, lData) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: "Error in database"
                                })
                            } else {
                                res.json({
                                    success: true,
                                    msg: "All data",
                                    data: data,
                                    loginData: lData
                                })
                            }
                        })
                    }
                })
                break;
            case 'date':
                dbTasks.findOne({ email: req.body.email }, (err, data) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: "Database Error"
                        })
                    } else {
                        var filterData = [];
                        var from = [];
                        lData.forEach(element => {
                            data.forEach(element2 => {
                                if (element.email == element2) {
                                    var x = {
                                        taskData: element2,
                                        loginData: element
                                    }
                                    final.push(x);
                                }
                            })
                        })
                        var from = Date(req.body.from);
                        var to = new Date(req.body.to);
                        data.tasks.forEach(element => {
                            if (element.date >= from && element.date <= to) {
                                filterData.push(element)
                            }
                        });
                        dbUserLogin.findOne({ email: req.body.email }, (err, lData) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: "Error in database"
                                })
                            } else {
                                res.json({
                                    success: true,
                                    msg: "All data",
                                    data: filterData,
                                    loginData: lData
                                })
                            }
                        })
                    }
                })
                break;
            default:
                res.json({
                    success: false,
                    msg: "Invalid option"
                })
        }
    }
}