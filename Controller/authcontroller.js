const jwt = require('jsonwebtoken');
const User=require('./../models/usermodel')
const { ServerClosedEvent } = require("mongodb")
const signuptoken=id=>{
    return jwt.sign({id},
        process.env.JWTSECRET,
        {expiresIn:process.env.JWTEXPIRESIN})
}
 exports.signup=async(req,res,next)=>{
    const newuser=await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        passwordconfirm:req.body.passwordconfirm
    })
const Token=signuptoken(newuser._id)
    res.status(201).json({
        status:"success",
        code:201,

        Token,
        data:{newuser}

    })
 }
 exports.login=async(req,res,next)=>{
    const {email,password}=req.body
    if(!email || !password){
        return next(new AppError("please fullfill the req",400))
    }
const user=await User.findOne({email}).select("+password")
 if(!user || !(await user.correctPassword(password , User.password) ) ){
    return next(new AppError("incorrect password and emal" ,401))
 }
 const token=signuptoken(User._id)
 res.status(200).json({
    status:"success",
    token,

 })

 }
 exports.protect=async(req,res,next)=>{
    //Get token and check if there
    let token
 if(req.headers.authorization && req.headers.authorization.startWith("Bearer")){
     token=req.headers.authorization.split(' ')[1]
 }
 console.log(token)

 if(!token){
   return next(new AppError(" you are not logged in,please login to get access",401))
   
 }
    //verification token

    //check if the user still exists

    // check if user changed password after token issued
    next()
 }