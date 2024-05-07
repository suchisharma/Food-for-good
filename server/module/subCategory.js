const mongoose=require("mongoose")
const subCategorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    category:{
        id:String,
        name:String
    }
})

exports.subCategory=mongoose.model('subCategory', subCategorySchema);