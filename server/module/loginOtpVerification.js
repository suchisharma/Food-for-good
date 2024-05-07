const mongoose=require('mongoose');

const loginotpVerificationSchema=new mongoose.Schema({
    userId:String,
    otp:String,
    createdAt: Date,
    expireAt: Date,
});
const loginOtpVerification=mongoose.model(
    "loginOtpVerification",
    loginotpVerificationSchema

)
// exports.otpVerification= mongoose.model('otpVerification', otpVerificationSchema);
module.exports= loginOtpVerification;