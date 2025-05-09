const express=require('express');
const fs=require('fs');
const path=require('path');
const morgan=require('morgan')
const tourrouter=require('./Routers/tourrouter.js')
const userrouter=require('./Routers/userrouter.js')
//this is comment
const app=express();
app.use(express.json())
app.use((req,res,next)=>{
    console.log("hello from the middleware ")
    next()
})
app.use(morgan('dev'))
//reading the data from json file and parsing it into js object and storing it in tours var
app.use('/api/v1/users',userrouter) 
app.use('/api/v1/tours',tourrouter)
// STARTING THE SERVER with  port 3001
module.exports=app

 