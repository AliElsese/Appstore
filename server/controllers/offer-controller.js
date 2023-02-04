const connectDB = require('../database/connection')

exports.addOffer = (req,res) => {
    var proid = parseInt(req.params.proid)
    connectDB.query('SELECT * FROM products WHERE proid = ?' , [proid] , (err,products) => {
        if(err) res.send(err)
        var prostatus = 'false'
            progallery = []
            procolor = []
            prosize = []
            gallery = req.files['progallery']
        for( var i = 0; i < gallery.length; i++){
            progallery.push('server/uploads/'+ gallery[i].filename)
        }
        var color = req.body['procolor']
        for( var y = 0; y < color.length; y++){
            procolor.push(color[y])
        }
        var size = req.body['prosize']
        for( var x = 0; x < size.length; x++){
            prosize.push(size[x])
        }
        var userid = parseInt(req.body.userid),
            brancheimage = products[0].brancheimage,
            cataid = parseInt(req.body.cataid),
            proname = req.body.proname,
            prodescription = req.body.prodescription,
            procurrentprice = req.body.procurrentprice,
            prooldprice = req.body.prooldprice,
            totalsales = req.body.totalsales,
            procolor = JSON.stringify(procolor),
            prosize = JSON.stringify(prosize),
            proimage = `server/uploads/${req.files['proimage'][0].filename}`,
            progallery = JSON.stringify(progallery),
            provideo = `server/uploads/${req.files['provideo'][0].filename}`,
            prostatus = prostatus,
            offerimage = `server/uploads/${req.files['offerimage'][0].filename}`,
            sql = 'INSERT INTO offers SET userid = ? , brancheimage = ? , cataid = ? , proname = ? , prodescription = ? , procurrentprice = ? , prooldprice = ? , totalsales = ? , procolor = ? , prosize = ? , proimage = ? , progallery = ? , provideo = ? , prostatus = ? , offerimage = ?'
    
        console.log(proimage)
        connectDB.query(sql , [userid,brancheimage,cataid,proname,prodescription,procurrentprice,prooldprice,totalsales,procolor,prosize,proimage,progallery,provideo,prostatus,offerimage] , (err,offer) => {
            if(err) res.send(err)
            res.send(offer)
        })
    })
}

exports.find = (req,res) => {
    connectDB.query('SELECT * FROM offers WHERE userid = ?' , [req.params.userid] , (err,offers) => {
        if(err) res.send('wrong offer')
        var offers1 = []
        for(var i = 0; i < offers.length; i++){
            var offer = {
                offerid : offers[i].offerid,
                userid : offers[i].userid,
                brancheimage : offers[i].brancheimage,
                cataid : offers[i].cataid,
                proname : offers[i].proname,
                prodescription : offers[i].prodescription,
                procurrentprice : offers[i].procurrentprice,
                prooldprice : offers[i].prooldprice,
                totalsales : offers[i].totalsales,
                procolor : JSON.parse(offers[i].procolor),
                prosize : JSON.parse(offers[i].prosize),
                proimage : offers[i].proimage,
                progallery : JSON.parse(offers[i].progallery),
                provideo : offers[i].provideo,
                prostatus : offers[i].prostatus,
                offerimage : offers[i].offerimage
            }
            offers1.push(offer)
        }
        res.send(offers1)
    })
}

exports.deleteOffer = (req,res) => {
    connectDB.query('DELETE FROM offers WHERE offerid = ?' , [req.params.offerid] , (err,offer) => {
        if(err) res.send(err)
        res.send('deleted')
    })
}

// user
exports.allOffers = (req,res) => {
    connectDB.query('SELECT * FROM offers' , (err,offers) => {
        if(err) res.send(err)
        var offers1 = []
        for(var i = 0; i < offers.length; i++){
            var offer = {
                offerid : offers[i].offerid,
                userid : offers[i].userid,
                // brancheimage : offers[i].brancheimage,
                // cataid : offers[i].cataid,
                // proname : offers[i].proname,
                // prodescription : offers[i].prodescription,
                // procurrentprice : offers[i].procurrentprice,
                // prooldprice : offers[i].prooldprice,
                // totalsales : offers[i].totalsales,
                // procolor : JSON.parse(offers[i].procolor),
                // prosize : JSON.parse(offers[i].prosize),
                // proimage : offers[i].proimage,
                // progallery : JSON.parse(offers[i].progallery),
                // provideo : offers[i].provideo,
                // prostatus : offers[i].prostatus,
                offerimage : offers[i].offerimage
            }
            offers1.push(offer)
        }
        res.send(offers1)
    })
}

exports.singleOffer = (req,res) => {
    connectDB.query('SELECT * FROM offers WHERE offerid = ?' , [req.params.offerid] , (err,offers) => {
        if(err) res.send('wrong offer')
        var offers1 = []
        for(var i = 0; i < offers.length; i++){
            var offer = {
                // offerid : offers[i].offerid,
                userid : offers[i].userid,
                brancheimage : offers[i].brancheimage,
                cataid : offers[i].cataid,
                proname : offers[i].proname,
                prodescription : offers[i].prodescription,
                procurrentprice : offers[i].procurrentprice,
                prooldprice : offers[i].prooldprice,
                totalsales : offers[i].totalsales,
                procolor : JSON.parse(offers[i].procolor),
                prosize : JSON.parse(offers[i].prosize),
                proimage : offers[i].proimage,
                progallery : JSON.parse(offers[i].progallery),
                provideo : offers[i].provideo,
                prostatus : offers[i].prostatus
                // offerimage : offers[i].offerimage
            }
            offers1.push(offer)
        }
        res.send(offers1)
    })
}