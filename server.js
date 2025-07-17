const app=require('./app.js')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})
const  db=process.env.DBASE.replace('<PASSWORD>',process.env.DBPASS)
const local=process.env.LOCALDB
const port=process.env.PORT || 3001
mongoose.connect(db)
.then(()=>{
    console.log("DB SUCCESSFULLY 😂")
}).catch((err)=>{
    console.log(err)
})   
// creating and listing the port...   

app.listen(port,()=>{
    console.log(`GOOD🤣 ${port} port`)  
})