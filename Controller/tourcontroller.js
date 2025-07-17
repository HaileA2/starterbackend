const tourmodel = require('../models/tourmodel');
const Apifetures = require('../Utilities/ApiFeatures');
exports.Aliastoptour=(req,res,next)=>{
req.query.sort='duration'
req.query.limit='5'
req.query.fields='duration,price'
next()
}
// Get all tours
exports.getalltours = async (req, res) => {
  try {
    const features = new Apifetures(tourmodel.find(),req.query)
     .filter()
     .limitfields()
     .sort()
     .pagination();
    const tours = await features.query;
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours }
    });
  } catch (err) {
    res.status(400).json({
         status: 'fail',
          message: err.message
         });
        }
};

// Get a tour by ID
exports.gettourbyid = async (req, res) => {
  try {
    const tour = await tourmodel.findById(req.params.id);
    if (!tour) {
      return res.status(404).json(
        { status: 'fail', 
          message: 'No tour found'
         });
    }
    res.status(200).json({
         status: 'success',
         data: { tourmodel } 
        });
  } catch (err) {
    res.status(400).json({
         status: 'fail',
         message: err.message
         });
        }
};
// Create a new tour
exports.creatingtour = async (req, res) => {
  try {
    const newTour = await tourmodel.create(req.body);
    res.status(201).json({ 
        status: 'success', 
        data: { tourmodel: newTour } 
        });
  } catch (err) {
    res.status(400).json({
         status: 'fail',
         message: err.message
         });
}
};

// Update a tour
exports.updatetour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, 
    {
      new: true,
      runValidators: true
    });
    if (!tour) {
      return res.status(404).json({ status: 'fail', 
        message: 'No tour found'});
    }
    res.status(200).json({ 
        status: 'success', 
        data: { tour }
     });
  } catch (err) {
    res.status(400)
    .json({ status: 'fail',
         message: err.message 
        });
     }
};

// Delete a tour
exports.deletetour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) {
      return res.status(404).json({ 
        status: 'fail',
         message: 'No tour found'
         });
    }
    res.status(204).json({
         status: 'success',
          data: null 
        });
  } 
  catch (err) {
    res.status(400).json({ 
        status: 'fail',
         message: err.message
         });
  }
};
// Get tour stats
exports.gettourstats=async(req,res)=>{
try{
    const stat= await tourmodel.aggregate([
{
    $match:{price:{$gte:2}}
},
{
    $group:{
        _id:{$toUpper:'$difficulty'},
        Aveprice:{$avg:'$price'},
        mindur:{$min:'$durations'},
        maxdur:{$max:'$durations'}

    }
},
{
    $sort:{
        durations:1
    }
}

    ])
    res.status(200).json({
        status: 'success',
        data:{stat} 
       });
}
catch(err){
    res.status(400).json({
        status:"fail",
        message:err.message
    })

}
}
exports.getmonthlyplan=async(req,res) =>{
  try{
const year=req.params.year*1
 const plan=tourmodel.aggregate([
  {
    $match:{durations:{$gte:4}
  }}
 ])
   res.status(200).json({
        status: 'success',
        data:{plan} 
       });


  }catch(err){
    res.status(400).json({
        status:"fail",
        message:err.message
    })
  }
}