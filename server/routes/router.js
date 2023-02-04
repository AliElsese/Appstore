const express = require('express');
const route = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination : (req , file , cb) => {
        cb(null , './server/uploads')
    },

    filename : (req , file , cb) => {
        cb(null , file.originalname)
    }
})
const upload = multer({ storage : storage })

const adminController = require('../controllers/admin-controller')
const categorieController = require('../controllers/categorie-controller')
const productController = require('../controllers/product-controller')
const brancheController = require('../controllers/branche-controller')
const offerController = require('../controllers/offer-controller');
const orderController = require('../controllers/order-controller');
const dashboardRender = require('../services/dashboard-render');

// api admin
route.get('/api-admin/:username' , adminController.find)

// api categorie
route.get('/api-categories' , categorieController.find)

//api product
route.post('/api-addProduct' , upload.fields([{name : 'proimage'} , {name : 'progallery' , maxCount : 10} , {name : 'provideo'}]) , productController.addProduct)
route.get('/api-products/:userid' , productController.find)
route.post('/api-updateProduct' , upload.fields([{name : 'proimage'} , {name : 'progallery' , maxCount : 10} , {name : 'provideo'}]) , productController.updateProduct)
route.delete('/api-deleteProduct/:proid' , productController.deleteProduct)
// user
route.get('/api-categorieProducts/:cataid' , productController.categorieProducts)
route.get('/api-allProducts' , productController.allProducts)
route.get('/api-singleProduct/:proid' , productController.singleProduct)

// api offer
route.post('/api-addOffer/:proid' , upload.fields([{name : 'offerimage'} , {name : 'proimage'} , {name : 'progallery' , maxCount : 10} , {name : 'provideo'}]) , offerController.addOffer)
route.get('/api-offers/:userid' , offerController.find)
route.delete('/api-deleteOffer/:offerid' , offerController.deleteOffer)
// user
route.get('/api-allOffers' , offerController.allOffers)
route.get('/api-singleOffer/:offerid' , offerController.singleOffer)

// api branche
route.post('/api-addBranche' , upload.single('brancheimage') , brancheController.addBranche)
route.get('/api-branche/:userid' , brancheController.find)
route.post('/api-addNewBranche/:userid' , upload.single('brancheimage') , brancheController.addNewBranche)

// api order
route.post('/api-addOrder' , orderController.addOrder)

route.get('/dashboard' , dashboardRender.showDashboardPage)
route.get('/login' , dashboardRender.showLoginPage)

module.exports = route