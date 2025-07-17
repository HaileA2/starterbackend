// const mongoose=require('mongoose')
// const dotenv=require('dotenv')
// const tourmodel=require('../../models/tourmodel')
// const fs=require('fs')
// dotenv.config({path:'./config.env'})
// const local=process.env.LOCALDB;
// const  db=process.env.DBASE.replace('<PASSWORD>',process.env.DBPASS)

// mongoose.connect(db,{
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useFindAndModify:false,
//     useUnifiedTopology:true
// }).then(()=>{
//     console.log("DB is successfully connected")
// }).catch((err)=>{
//     console.log("error is:",err)
// }) 

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

// const importData=async()=>{
//     try{
//         await tourmodel.create(tours)
//         console.log('Data successfully loaded')
//     }catch(err){
//         console.log("Error loading data")
//         console.log(err)
//     }
//     process.exit()
// }
// //delete all data
// const deleteData=async()=>{
//     try{
//         await tourmodel.deleteMany()
//         console.log('Data successfully deleted')
//     }catch(err){
//         console.log("Error deleting data")
//         console.log(err)
//     }
//     process.exit()
// }

// if(process.argv[2]==='--import'){
//     importData()
// }
// else if(process.argv[2]==='--delete'){
//     deleteData()
// }
// else{
//     console.log("Please provide a valid argument")
//     process.exit()
// }