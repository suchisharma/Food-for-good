const mongoose= require('mongoose');
const menuSchema= new mongoose.Schema(
    {
        name:{
            type: String,
            require: true
        },
        price:{
            type: Number,
            required: true
        },
        category:{
            type: String,
            required: true
        },
        description: {
            type: String, 
            required: true
        }
     
})

exports.menu= mongoose.model("menu", menuSchema)