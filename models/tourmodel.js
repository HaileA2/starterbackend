const mongoose=require('mongoose');
const slugify=require('slugify')
const validator=require('validator')
const tourSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A tour must have a name'],
        unique:true,
        maxlength:[40,'the name must have less or equal than 40 chars'],
        minlength:[10,'the name must have greater than 10 chars'],
        validator:[validator.isAlpha,'tour name only must contain characters']
    },
    slug:String,
    durations:{
        type:Number,
        required:[true,'a tour must have a duration']
    },
    maxGroupSize:{
        type:Number,
        required:[true,'A tour must have a group size']
    },
    difficulty:{
        type:String,
        required:[true,'A tour must have a difficulty'],
        enum:['easy','medium','diffcult']
    },
    ratingAverage:{
        type:Number,
        default:4.5
    },
    ratingQuantity:{
        type:Number,
        default:0
    },
    summary:{
        type:String,
        trim:true,
        
    },
    password:{
type:String,
trim:true
    },
    description:{
        type:String,
        trim:true,
      
    },
   price:{
    type:Number,
    required:[true,'A tour must have a price']
   },
   priceDiscount:{
    type:Number
   },
   imagecover:{
    type:String,
    required:[true,'A tour must have a cover image']
   },
   images:[String],
    createdAt:{
     type:Date,
     default:Date.now(),
     select:false
    },
    startDates:[Date] 
},
{
        toJSON:{virtuals:true},
        toObject:{virtuals:true}
    }
)
tourSchema.virtual("durationweek").get(function(){
return this.durations /7
})
tourSchema.pre("find",function(next){
this.find({durations:{$gt:4}})
})
tourSchema.pre('save', function (next) {
  console.log('About to save user:', this.name);
  this.name = this.name.toUpperCase(); // Modify before save
  next(); // Continue
});
tourSchema.post('save', function (doc) {
  console.log('User saved successfully:', doc.name);
});
tourSchema.pre("aggregate",function(next){
    console.log(this.pipeline())
    next()
})

const Tour=mongoose.model('Tour',tourSchema)
module.exports=Tour
