const express = require('express');
const mongoose = require('mongoose');
const {User,validate} = require('../models/user');
const _ = require('lodash');
const router = express.Router();

router.use(express.json());

router.post('/',async (req,res)=>{
    const {error} = validate(req.body);
    if(error)  return res.status(400).send(error.details[0].message);

    let user  = await User.findOne({email:req.body.email});
    if(user)  return res.status(400).send('User already registered');

    // user = new User({
    //     name :  req.body.name,
    //     email :  req.body.email,
    //     password: req.body.password
    // });

    user = new User(_.pick(req.body,['name','email','password']));
    await user.save();

    //_.pick(user,['name','email']);
    res.send(_.pick(user,['_id','name','email']));
});

//password complexity - joi-password-complexity

module.exports=router;