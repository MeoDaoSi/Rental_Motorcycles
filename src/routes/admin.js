const express = require('express');
const router = express.Router();
const location = require('./location')
const user = require('./user')
const accessory = require('./accessory')
const rental = require('./rental')
const authAdmin = require('../middleware/authAdmin');
const User = require('../app/models/User');
const AppError = require('../utils/AppError')

router.get('/login', (req, res) => {
    if(!req.session.admin){

        return res.render('loginAdmin');
    }
    return res.redirect('/admin/dashboard')
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await User.findOne({email, role: "ADMIN"})
        console.log(admin);
        if( !admin ){
            throw new AppError('403', "Email not founded");
        }
        isMatch = admin.password === password;
        if( !isMatch ){
            throw new AppError('403', "Incorrect password")
        }
        req.session.admin = admin;
        return res.redirect('/admin/dashboard');
    } catch (error) {
        return res.redirect('/')
    }
})

// router.use(authAdmin);

router.get('/dashboard',(req, res) => {
    res.render('dashboard');
})

router.use('/location',location);

router.use('/accessory',accessory);

router.use('/rental',rental);

router.use('/user',user);

module.exports = router