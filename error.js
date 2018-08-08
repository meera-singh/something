var fs = require('fs')

exports.logError = (req, res) => {
    if (!req.body.error) {
        res.json({
            success: false,
            msg: "Please send Error"
        })
    } else {
        var date = new Date()
        var day = date.getDate()
        var month = date.getMonth()
        var year = date.getFullYear()
        var filename = day + month + year;
        if (fs.existsSync('~/errorlog/' + filename)) {

            var data = `===========================================================================================
                time: ${new Date()}
                
                Error : 
                ${req.body.error}`;
            fs.appendFile('~/errorlog/' + filename, data, (err, data) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: "Something went wrong"
                    })
                } else {
                    res.json({
                        success: true,
                        msg: "Error logged"
                    })
                }
            })


        } else {
            var data = `===========================================================================================
            time: ${new Date()}
            
            Error : 
            ${req.body.error}`;
            fs.writeFile('~/errorlog/' + filename, data, (err, data) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: "Something went wrong"
                    })
                } else {
                    res.json({
                        success: true,
                        msg: "Error logged"
                    })
                }
            })
        }
    }
}