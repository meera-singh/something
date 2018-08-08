var dbAssignTasks = require('../../models/assignTasks')
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


exports.completeTask = (req, res) => {
    completion={
        completed: true,
        completedAt: new Date()
    }
    dbAssignTasks.findOneAndUpdate({$and:[{email: req.decoded.email},{'task._id': req.body.taskId}]},{$push:{'task.$.completion':completion}},(err,data)=>{
        if(err){
            res.json({
                success:false,
                msg : 'database error'
            })
        }else if(!data||data==null){
            res.json({
                success: false,
                msg: "No such user found"
            })
        }else{
            console.log('=-=-==-=-=-',req.body)
            console.log('------', req.decoded._id)
            dbAssignTasks.findOne( { email: req.decoded.email, 'task._id': req.body.taskId} , {'task.$.':1}, (err, atdata) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: "Database Error"
                    })
                } else if (!atdata || atdata == null) {
                    res.json({
                        success: false,
                        msg: "No such user found"
                    })
                } 
                else {
                    console.log(atdata.task[0].details)
                    assignedTask1={
                        
                            task: atdata.task[0].details,
                            completedAt: new Date()
        
                    }
                  dbTasks.findOneAndUpdate({ email: req.decoded.email },{$push:{assignedTask:assignedTask1}}, (err,data) => {
                        if(err){
                      res.json({
                          success:false,
                          msg:"database error"
                      })
                        }else{
                           res.json({
                               success:true,
                               msg:"task locked"
                           }) 
                            
                        }
                    })
                        
                    }
                
            
                
            })
        }
    })
    
}

exports.showAssignedTasks = (req, res) => {
    
    dbAssignTasks.findOne({ userId: req.decoded._id }, (err, data) => {
        if (err) {
            res.json({
                success: false,
                msg: "Error in database"
            })
        }else if(!data||data==null){
            res.json({
                success: false,
                msg: "No data found"
            })
        } else {
            console.log("p==-=-=-=-=",data)
            var taskData = [];
            var date = new Date();
            data.task.forEach(element => {
                
                if (element.lastDate) {
                    taskData.push(element)
                }else{
                    taskData.push(element)
                }
            });
            res.json({
                success: true,
                msg: "All data",
                data: taskData
            })
        }
    })
}