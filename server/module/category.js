const mongoose= require("mongoose");
const categroySchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    }


})
exports.category=mongoose.model("category", categroySchema)