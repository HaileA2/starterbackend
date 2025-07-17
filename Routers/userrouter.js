const express=require('express')
const userrouter=express.Router()
const usercontroller=require('../Controller/usercontroller.js')
const router=express.Router()
const authcontroller=require("../Controller/authcontroller.js")
const app=express()

userrouter.route('/:id')
router.param('id',(req,res,next,val)=>{
    console.log("this is only 🤣🤣forid")
    next()
})
userrouter.post("/signup",authcontroller.signup)

userrouter.route("/")
.get(usercontroller.allusers)
.post(usercontroller.createuser)

userrouter.route("/:id")
.get(usercontroller.getuser)
.patch(usercontroller.updateuser)
.delete(usercontroller.deleteuser)


module.exports=userrouter