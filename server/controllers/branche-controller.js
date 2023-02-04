const connectDB = require('../database/connection')

exports.addBranche = (req,res) => {
    var branche = {
        userid : parseInt(req.body.userid),
        branchename : req.body.branchename,
        branchedescription : req.body.branchedescription,
        branchelocation : req.body.branchelocation,
        branchephone : req.body.branchephone,
        brancheopen : req.body.brancheopen,
        brancheclose : req.body.brancheclose,
        brancheimage : `server/uploads/${req.file.filename}`
    }
    console.log(branche)
    connectDB.query('INSERT INTO branches SET ?' , [branche] , (err,branches) => {
        if(err) console.log(err)
        res.send('ok')
    })
}

exports.find = (req,res) => {
    connectDB.query('SELECT * FROM branches WHERE userid = ?' , [req.params.userid] , (err,branches) => {
        if(err) res.send('wrong branche')
        res.send(branches)
    })
}

exports.addNewBranche = (req,res) => {
    connectDB.query('SELECT branchename,branchedescription,brancheimage FROM branches WHERE userid = ?' , [req.params.userid] , (err,branches) => {
        if(err) res.send(err)
        var branche = {
            userid : req.params.userid,
            branchename : branches[0].branchename,
            branchedescription : branches[0].branchedescription,
            branchelocation : req.body.branchelocation,
            branchephone : req.body.branchephone,
            brancheopen : req.body.brancheopen,
            brancheclose : req.body.brancheclose,
            brancheimage : branches[0].brancheimage,
        }
        connectDB.query('INSERT INTO branches SET ?' , [branche] , (err,results) => {
            if(err) res.send(err)
            console.log(branche)
            res.send('ok')
        })
    })
}