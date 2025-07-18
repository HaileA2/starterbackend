const jwt = require('jsonwebtoken');
const User=require('./../models/usermodel')
const { ServerClosedEvent } = require("mongodb")
 exports.signup=async(req,res,next)=>{
    const newuser=await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        passwordconfirm:req.body.passwordconfirm
    })
    const Token=jwt.sign({id:newuser._id},process.env.JWTSECRET,{expiresIn:process.env.JWTEXPIRESIN})

    res.status(201).json({
        status:"success",
        code:201,

        Token,
        data:{newuser}

    })
 }