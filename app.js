const express=require('express');
const fs=require('fs');
const path=require('path');
const morgan=require('morgan')


//this is comment
const app=express();
app.use(express.json())
const userrouter=express.Router()
const tourrouter=express.Router()
app.use('/api/v1/tours',tourrouter)
app.use('/api/v1/users',userrouter)
//reading the data from json file and parsing it into js object and storing it in tours var
const tours= JSON.parse(fs.readFileSync(path.join(__dirname,'dev-data','data','tours-simple.json'))) 


// 1) CREATING MIDDLWARE FUNCTION
app.use((req,res,next)=>{
    console.log("hello from the middleware ")
    next()
})
app.use(morgan('dev'))



//2)HADLING THE UNHANDLED ROUTES
getalltours=(req,res)=>{
    res.status(200).json({
       status:"success",
       data:tours.length,
       result:{tours}
    })
}

//getting the data by id and sending it into response

const updateuser=(req,res)=>{
    res.status(500).json({
        status:"fail",
        data:"this route is not yet defined"
    })

}
const createuser=(req,res)=>{
    res.status(500).json({
        status:"fail",
        data:"this route is not yet defined"
    })

}

const getuser=(req,res)=>{
    res.status(500).json({
        status:"fail",
        data:"this route is not yet defined"
    })

}
const deleteuser=(req,res)=>{
    res.status(500).json({
        status:"fail",
        data:"this route is not yet defined"
    })

}
const allusers=(req,res)=>{
    res.status(500).json({
        status:"fail",
        data:"this route is not yet defined"
    })

}



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

//CREATING THE ROUTES
tourrouter.route('/:id')
.get(gettourbyid)
.patch(updaterout);
tourrouter.route('/')
.get(getalltours)
.post(creatingtour)

userrouter.route("/")
.get(allusers)
.post(createuser)

userrouter.route("/:id")
.get(getuser)
.patch(updateuser)
.delete(deleteuser)

// STARTING THE SERVER with  port 3001
const port=3001;
app.listen(port,()=>{
    console.log(`Hey every thing is going well here ${port}`)  
})

 