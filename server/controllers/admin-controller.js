const connectDB = require('../database/connection')
const axios = require('axios')

exports.find = (req,res) => {
    var username = req.params.username
    connectDB.query('SELECT * FROM admin WHERE username = ?' , [username] , (err,user) => {
        if(user == undefined || user.length == 0) {
            return res.send('wrong user');
        }
        res.send(user)
    })
}