const express=require('express');
const router=express.Router();
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const jwtsecret="MYnameisPriyankaandiamlearnignnMern"
router.post("/createuser",[
    body('email').isEmail(),
    body('password','Incorrect Password').isLength({min:5}),
    body('name').isLength({min:5})
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const salt=await bcrypt.genSalt(10);
    let secpass=await bcrypt.hash(req.body.password,salt);
    try {
        await User.create({
            name: req.body.name,
            password: secpass,
            email: req.body.email,
            location: req.body.location
        })
        res.json({success:true});
        
    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
})

router.post("/loginuser",[
    body('email').isEmail(),
    body('password','Incorrect Password').isLength({min:5})
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    let email=req.body.email;
    try {
        let userData=await User.findOne({email});
        if(!userData){
            return res.status(400).json({errors: "Try logging with correct credentials"});
        }
        const cmp=await bcrypt.compare(req.body.password,userData.password);
        if(!cmp){
            res.status(400).json({errors: "incorrect password"});
        }
        const data={
            user:{
                id:userData.id
            }
        }
        const auth=jwt.sign(data,jwtsecret)
        return res.json({success:true,authToken:auth})
    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
})

module.exports=router;