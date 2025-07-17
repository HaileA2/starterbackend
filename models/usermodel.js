const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcryptjs")
const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name should be entered"]
    },
    email:{
        type:String,
        required:[true,"please provide your emal"],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,"provide the valid emal"]
    },
    photo:String,
    password:{
        type:String,
        required:[true,"please provide password"],
        minlength:8
    },
    passwordconfirm:{
        type:String,
        required:[true,"please confirm your password"],
        validate:{
            // this only work on create and save
            validator:function(el){
                return el === this.password
            }
        }
    }
})
userschema.pre("save",async function(next){
    if(!this.isModified("password")) return next()

        this.password= await bcrypt.hash(this.password,12)
        this.passwordconfirm=undefined
        next()
})

const User=mongoose.model("User",userschema)
module.exports=User