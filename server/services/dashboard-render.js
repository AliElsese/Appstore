const connectDB = require('../database/connection')

module.exports = {
    showDashboardPage : (req,res) => {
        res.render('dashboard')
    },
    showLoginPage : (req,res) => {
        res.render('login')
    }
}