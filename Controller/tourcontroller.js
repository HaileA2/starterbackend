const fs = require('fs');
const path = require('path');
const tours = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'dev-data', 'data', 'tours-simple.json')));

exports.checkid = (req, res, next, val) => {
    console.log("this is only for id", val)
    const id=req.params.id*1
    if(id>tours.length){
        return res.status(404).json({
            status:"fail",
            message:"invalid id"
        })
    }
    next()
}
exports.getalltours = (req, res) => {
    res.status(200).json({
        status: "success",
        data: tours.length,
        result: { tours }
    })
}
 exports.updaterout=(req,res)=>{
    
    res.status(200).json({
        status:"success",
        data:{
            tour:'<upadated tour here>'
        } 
    })
}
exports.gettourbyid=(req,res)=>{
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
exports.creatingtour=(req,res)=>{
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