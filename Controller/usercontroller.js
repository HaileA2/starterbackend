
exports.checkid=(req,res,next,val)=>{
    console.log("this is only for id",val)
    next()
}

exports.updateuser=(req,res)=>{
    res.status(500).json({
        status:"fail",
        data:"this route is not yet defined"
    })

}
exports.createuser=(req,res)=>{
    res.status(500).json({
        status:"fail",
        data:"this route is not yet defined"
    })

}
exports.getuser=(req,res)=>{
    res.status(500).json({
        status:"fail",
        data:"this route is not yet defined"
    })

}
exports.deleteuser=(req,res)=>{
    res.status(500).json({
        status:"fail",
        data:"this route is not yet defined"
    })

}
exports.allusers=(req,res)=>{
    res.status(500).json({
        status:"fail",
        data:"this route is not yet defined"
    })

}