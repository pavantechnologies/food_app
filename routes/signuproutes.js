'use strict'
const express = require('express');
const router=express.Router();
const signupcontroller=require('../controllers/signupcontroller');


router.post('/',signupcontroller.signup);

router.post('/verify',signupcontroller.verify);

router.get('/business',function(req,res){
    res.send("from redirected verifying token from businss details")
});









module.exports=router;