class Apifetures{
    constructor(query,querystr){
        this.query=query;
        this.querystr=querystr;
    }
  filter(){
    const queryObj={...this.query}
    const excludedfields=['page','sort','limit','fields']
    excludedfields.forEach(el=>delete queryObj[el])
    // console.log(req.query,queryObj)
   let querystr=JSON.stringify(queryObj)
   querystr= querystr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`)
//    let query= tourmodel.find(JSON.parse(querystr))
  return this;
  }  
sort(){
    if(this.querystr.sort){
        const sortby=this.querystr.sort.split(',').join(' ')
        this.query=this.query.sort(sortby)
    }else{
        this.query=this.query.sort('-createdAt')
    }
    return this;    
}
limitfields(){
    if(this.querystr.fields){
        const fields=req.query.fields.split(',').join(' ')
       this.query=this.query.select(fields)
    }
    else{
        this.query=this.query.select('-__v')
    }
    return this;
}
pagination(){
    const page=this.querystr.page*1 || 1
    const limit=this.querystr.limit*1 || 100
    const skip=(page-1)*limit
    this.querystr=this.querystr.skip(skip).limit(limit)
    return this
}

}
module.exports=Apifetures
