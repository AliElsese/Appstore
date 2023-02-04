const connectDB = require('../database/connection')

exports.addOrder = (req,res) => {
    var order = [],
        
        sql = 'INSERT INTO orders SET ?'
    for(var i = 0; i < 4; i++){
        var user = {
            userName : req.body.userName,
            userJob : req.body.userJob,
            userPhone : req.body.userPhone,
            userAddress : req.body.userAddress,
            deliveryMode : req.body.deliveryMode
        }
        order.push(user)
    }
    console.log(order.length)
    for(var x = 0; x < order.length; x++){
        connectDB.query('INSERT INTO orders SET userName = ? , userJob = ? , userPhone = ? , userAddress = ? , deliveryMode = ?' , [order[x].userName,order[x].userPhone,order[x].userJob,order[x].userAddress,order[x].deliveryMode] , (err,results) => {
            if(err) res.send(err)
        })
    }
    res.sendStatus(200)
    // connectDB.query(sql , [order1] , (err,result) => {
    //     if(err) res.send(err)
    //     res.sendStatus(200)
    // })
}