const config = require('config');
const express = require('express');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const {User} = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();

router.use(express.json());

router.post('/',async (req,res)=>{
    const {error} = validate(req.body);
    if(error)  return res.status(400).send(error.details[0].message);

    let user  = await User.findOne({email:req.body.email});
    if(!user)  return res.status(400).send('Invalid email or password');

    const validpassword = await bcrypt.compare(req.body.password,user.password);
    if(!validpassword) return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();
    //private key in config or environment variable
    res.send(token);
});

//password complexity - joi-password-complexity
function validate(req){
    const schema = Joi.object({
        email : Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required()
    });
    return schema.validate(req);
}
module.exports=router;