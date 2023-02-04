const connectDB = require('../database/connection')

exports.find = (req,res) => {
    connectDB.query('SELECT * FROM categories' , (err,categories) => {
        if(err) res.send('wrong categorie')
        res.send(categories)
    })
}