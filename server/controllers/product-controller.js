const connectDB = require('../database/connection')

exports.addProduct = (req,res) => {
    var prostatus = 'false'
    var progallery = []
    var procolor = []
    var prosize = []
    var gallery = req.files['progallery']
    for( var i = 0; i < gallery.length; i++){
        progallery.push('server/uploads/'+ gallery[i].filename)
    }
    var color = req.body['procolor']
    for( var i = 0; i < color.length; i++){
        procolor.push(color[i])
    }
    var size = req.body['prosize']
    for( var i = 0; i < size.length; i++){
        prosize.push(size[i])
    }
    var userid = parseInt(req.body.userid),
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
        provideo = req.files['provideo'][0].filename,
        prostatus = prostatus
        sql = 'INSERT INTO products SET userid = ? , cataid = ? , proname = ? , prodescription = ? , procurrentprice = ? , prooldprice = ? , totalsales = ? , procolor = ? , prosize = ? , proimage = ? , progallery = ? , provideo = ? , prostatus = ?'

    connectDB.query(sql , [userid,cataid,proname,prodescription,procurrentprice,prooldprice,totalsales,procolor,prosize,proimage,progallery,provideo,prostatus] , (err,products) => {
        if(err) res.send(err)
        res.send('ok')
    })
}

exports.find = (req,res) => {
    connectDB.query('SELECT * FROM products WHERE userid = ?' , [req.params.userid] , (err,products) => {
        if(err) res.send('wrong product')
        var products1 = []
        for(var i = 0; i < products.length; i++){
            var product = {
                proid : products[i].proid,
                userid : products[i].userid,
                cataid : products[i].cataid,
                proname : products[i].proname,
                prodescription : products[i].prodescription,
                procurrentprice : products[i].procurrentprice,
                prooldprice : products[i].prooldprice,
                totalsales : products[i].totalsales,
                procolor : JSON.parse(products[i].procolor),
                prosize : JSON.parse(products[i].prosize),
                proimage : products[i].proimage,
                progallery : JSON.parse(products[i].progallery),
                provideo : products[i].provideo,
                prostatus : products[i].prostatus
            }
            products1.push(product)
        }
        res.send(products1)
    })
}

exports.updateProduct = (req,res) => {
    var progallery = []
    var procolor = []
    var prosize = []
    var gallery = req.files['progallery']
    for( var i = 0; i < gallery.length; i++){
        progallery.push('server/uploads/'+ gallery[i].filename)
    }
    var color = req.body['procolor']
    for( var i = 0; i < color.length; i++){
        procolor.push(color[i])
    }
    var size = req.body['prosize']
    for( var i = 0; i < size.length; i++){
        prosize.push(size[i])
    }
    var proid = parseInt(req.body.proid),
        proname = req.body.proname,
        prodescription = req.body.prodescription,
        procurrentprice = req.body.procurrentprice,
        prooldprice = req.body.prooldprice,
        totalsales = req.body.totalsales,
        procolor = JSON.stringify(procolor),
        prosize = JSON.stringify(prosize),
        proimage = `server/uploads/${req.files['proimage'][0].filename}`,
        progallery = JSON.stringify(progallery),
        provideo = req.files['provideo'][0].filename,
        sql = 'UPDATE products SET proname = ? , prodescription = ? , procurrentprice = ? , prooldprice = ? , totalsales = ? , procolor = ? , prosize = ? , proimage = ? , progallery = ? , provideo = ? WHERE proid = ?'

    connectDB.query(sql , [proname,prodescription,procurrentprice,prooldprice,totalsales,procolor,prosize,proimage,progallery,provideo,proid] , (err,results) => {
        if(err) res.send(err)
        res.send('data updated')
    })
}

exports.deleteProduct = (req,res) => {
    connectDB.query('DELETE FROM products WHERE proid = ?' , [req.params.proid] , (err,product) => {
        if(err) res.send(err)
        res.send('deleted')
    })
}

// user
exports.allProducts = (req,res) => {
    prostatus = 'true'
    connectDB.query('SELECT * FROM products WHERE prostatus = ?' , [prostatus] , (err,products) => {
        if(err) res.send(err)
        var products1 = []
        for(var i = 0; i < products.length; i++){
            var product = {
                proid : products[i].proid,
                userid : products[i].userid,
                cataid : products[i].cataid,
                proname : products[i].proname,
                prodescription : products[i].prodescription,
                procurrentprice : products[i].procurrentprice,
                prooldprice : products[i].prooldprice,
                totalsales : products[i].totalsales,
                procolor : JSON.parse(products[i].procolor),
                prosize : JSON.parse(products[i].prosize),
                proimage : products[i].proimage,
                progallery : JSON.parse(products[i].progallery),
                provideo : products[i].provideo,
                prostatus : products[i].prostatus
            }
            products1.push(product)
        }
        res.send(products1)
    })
}

exports.singleProduct = (req,res) => {
    connectDB.query('SELECT * FROM products WHERE proid = ?' , [req.params.proid] , (err,products) => {
        if(err) res.send('wrong product')
        connectDB.query('SELECT userid,brancheimage FROM branches WHERE userid = ?' , [products[0].userid] , (err,branche) => {
            if(err) res.send('wrong product')
        var products1 = []
        for(var i = 0; i < products.length; i++){
            var product = {
                proid : products[i].proid,
                userid : products[i].userid,
                cataid : products[i].cataid,
                proname : products[i].proname,
                prodescription : products[i].prodescription,
                procurrentprice : products[i].procurrentprice,
                prooldprice : products[i].prooldprice,
                totalsales : products[i].totalsales,
                procolor : JSON.parse(products[i].procolor),
                prosize : JSON.parse(products[i].prosize),
                proimage : products[i].proimage,
                progallery : JSON.parse(products[i].progallery),
                provideo : products[i].provideo,
                prostatus : products[i].prostatus
            }
            products1.push(product)
        }
        res.send({products1 , branche})
        })
    })
}

exports.categorieProducts = (req,res) => {
    connectDB.query('SELECT * FROM products WHERE cataid = ?' , [req.params.cataid] , (err,products) => {
        if(err) res.send(err)
        var products1 = []
        for(var i = 0; i < products.length; i++){
            var product = {
                proid : products[i].proid,
                userid : products[i].userid,
                cataid : products[i].cataid,
                proname : products[i].proname,
                prodescription : products[i].prodescription,
                procurrentprice : products[i].procurrentprice,
                prooldprice : products[i].prooldprice,
                totalsales : products[i].totalsales,
                procolor : JSON.parse(products[i].procolor),
                prosize : JSON.parse(products[i].prosize),
                proimage : products[i].proimage,
                progallery : JSON.parse(products[i].progallery),
                provideo : products[i].provideo,
                prostatus : products[i].prostatus
            }
            products1.push(product)
        }
        res.send(products1)
    })
}