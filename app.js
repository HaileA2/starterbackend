const express=require('express');
const fs=require('fs');
const { get } = require('http');
const path=require('path');
const app=express();
app.use(express.json())
//reading the data from json file and parsing it into js object and storing it in tours var
const tours= JSON.parse(fs.readFileSync(path.join(__dirname,'dev-data','data','tours-simple.json'))) 
//getting the data by get method and sendng it into response

app.use((req,res,next)=>{
    console.log("hello from the middleware ")
})


getalltours=(req,res)=>{
    res.status(200).json({
       status:"success",
       data:tours.length,
       result:{tours}
    })
}

//getting the data by id and sending it into response
const gettourbyid=(req,res)=>{
    console.log(req.params)
    const id=req.params.id*1
    if(id>tours.length){
         res.status(404).json({
            status:"fail",
            message:"invalid id"
        })
         const tour=tours.find(el=>el.id===id)
    res.status(200).json({
       status:"success",
    })

    }
}
const creatingtour=(req,res)=>{
    const newid=tours[tours.length-1].id+1
    const newtour=Object.assign({id:newid},req.body)
    tours.push(newtour)
    fs.writeFile(path.join(__dirname,'dev-data','data','tours-simple.json'),JSON.stringify(tours),err=>{
        res.status(201).json({
            status:"success",
            data:{
                tour:newtour
            }
        })
    })
}
   const updaterout=(req,res)=>{
    const id=req.params.id*1
    if(id>tours.length){
        return res.status(404).json({
            status:"fail",
            message:"invalid id"
        })
    }
    res.status(200).json({
        status:"success",
        data:{
            tour:'<upadated tour here>'
        } 
    })
}
// app.get('/api/v1/tours',getalltours)
// app.get('/api/v1/tours/:id',gettourbyid)
// app.post("/api/v1/tours",creatingtour)
// app.patch('/api/v1/tours/:id',updaterout)

app.route('/api/v1/tours/:id')
.get(gettourbyid)
.patch(updaterout);
app.route('/api/v1/tours')
.get(getalltours)
.post(creatingtour)

//creating and listening to the server
const port=3001;
app.listen(port,()=>{
    console.log(`Hey every thing is going well here ${port}`)  
})

 