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
//reading the data from json file

app.use('/api/v1/users',userrouter) 
app.use('/api/v1/tours',tourrouter)
module.exports=app

 