const mongoose= require('mongoose');

const historySchema= new mongoose.Schema({

       user:{
       
       },
       status:{},
       items:[],
    
       // date:{},
       time:{type: Date, default: Date.now},
})


exports.history= mongoose.model("history", historySchema)