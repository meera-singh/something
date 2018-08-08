var dbTasks = require('../../models/tasks')

exports.history = (req, res) => {
    dbTasks.findOne({ email: req.decoded.email }, (err, data) => {
        if (err) {
            res.json({
                success: false,
                msg: "Database Error"
            })
        } else {
            // console.log(data)
            res.json({
                success: true,
                msg: "User data",
                data: data
            })
        }
    })
}