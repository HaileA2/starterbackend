const User=require('./../models/usermodel')
 exports.signup=async(req,res,next)=>{
    const newuser=await User.create(req.body)

    res.status(201).json({
        status:"success",
        code:201,
        data:{newuser}
    })
 }