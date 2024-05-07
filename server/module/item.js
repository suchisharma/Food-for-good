const mongoose=require("mongoose");
const itemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tax:{
         gst:{
            type:Number,
            required:true
         },
         vat:{
            type:Number,
            required:true,
         },
         serviceCharge:{
            type:Number,
            required:true
         }
    },
    category: {
        id:String,
        name:String,
      },
   subCategory: {
        id:String,
        name:String,
    
    },
    

})

exports.item=mongoose.model("item",itemSchema);