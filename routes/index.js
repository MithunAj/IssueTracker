const express = require('express');
const router = express.Router();
const homeController = require('../controller/home')



router.get('/home',homeController.homePage)

router.get('/',function(req,res){
    return res.redirect('/home');
})

router.use('/projects',require('./project'));

router.use('/issues',require('./issue'));

module.exports = router;
