const mongoose= require('mongoose');
const couponsSchema=new mongoose.Schema({
    name:{type:String},
    Discount:{type:Number},
    

})
exports.coupons= mongoose.model("coupons", couponsSchema);