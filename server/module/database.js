const mongoose= require('mongoose');

exports.connectMongoose=()=>{

    mongoose.connect('mongodb://localhost:27017/training-test')

}



const userSchema= new mongoose.Schema({
    name: {
        type:String,
        required: true
    },  
    userName:{
        type: String,
        required: true, 
        unique: true
    }, 
    password: {
        type: String,
        required: true, 
        unique: true
    },
    verifide: Boolean// line added
})

exports.User= mongoose.model("user", userSchema);