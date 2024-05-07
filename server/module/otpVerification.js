const mongoose=require('mongoose');

const otpVerificationSchema=new mongoose.Schema({
    userId:String,
    otp:String,
    createdAt: Date,
    expireAt: Date,
});
const otpVerification=mongoose.model(
    "otpVerification",
    otpVerificationSchema

)
// exports.otpVerification= mongoose.model('otpVerification', otpVerificationSchema);
module.exports= otpVerification;