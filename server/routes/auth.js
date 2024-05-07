const router= require("express").Router();
const bcrypt= require("bcrypt");
const jwt = require('jsonwebtoken');
const passport = require('passport');
const speakeasy=require('speakeasy');
const otpVerification= require("../module/otpVerification");
const loginOtpVerification= require("../module/loginOtpVerification");
const nodemailer= require("nodemailer");
const { connectMongoose, User } = require("../module/database.js");
connectMongoose();
router.use(passport.initialize());
router.use(passport.session());
require('../passportconfig');

var transpoter=nodemailer.createTransport({
  host:"smtp.gmail.com",
  auth:{
    user: 'ankitbhatt640@gmail.com',
    pass: 'nppjhiqblerrratw'
  }
})
//Register
router.post("/register", function (req, res) {
    if (req.body.name >= 0 || req.body.name <= 0) {
      res.status(401).json({
        message: 'user can"t be created'
      })
    }
    else {
      console.log("register body", req.body);
      try {
        User.findOne({ userName: req.body.userName }, function (error, user) {
          if (error) {
            console.log("error");
          }
          if (user) {
            return res.status(400).json({
              message: 'Failed to create new user, user already register'
  
            })
          }
          try {
            
            bcrypt.genSalt(10).then(function (salt) {
              bcrypt.hash(req.body.password, salt).then(( password)=> {
                if (error) {
                  console.log("error in hashing");
                }
                if (password) {
                  const newUser = User.create({
                    name: req.body.name,
                    userName: req.body.userName,
                    password: password,
                    verifide: false, //line added 
                  }, function (error, userCreated) {
                    if (error) {
                      console.log("error in creating");
                    }
                    else{
                      sendOtpVerificationEmail(userCreated, res)
                    // return res.status(201).send({
                    //   message: "user created"
  
                    // });
                  }
  
                  });
  
                }
              }).catch(err=>{
                return res.status(400).send({
                  message:"Error in hashing"
                })
  
              })
            })
  
  
  
          } catch (err) {
            res.status(400).send({
              message: "Error in creating user"
            })
          }
        })
      } catch (error) {
        return res.status(400).json({
          messgae: "user cant be created"
        })
  
      }
    }
  })

//Login
  router.post('/login', function (req, res) {
    try {
      User.findOne({ userName: req.body.userName }, function (error, User) {
        if (error) {
          console.log("Error");
        }
        if (!User) {
          return res.status(401).send({
            success: false,
            message: "could not find user"
          })
        }
  
        if (!bcrypt.compareSync(req.body.password, User.password)) {
          return res.status(401).send({
            success: false,
            message: "incorrect password"
          })
        }
  
        const payload = {
          userName: User.userName,
          id: User._id
        }
  
        const token = jwt.sign(payload, "secret", { expiresIn: "1d" })
        
        return res.status(200).send({
          success: true,
          message: "Logged in successfully",
          token: "Bearer " + token
        })
  
      })
    } catch (error) {
      return res.status(400).send({
        message: "Cant login"
      })
    }
  
  })

router.post('/loginOtp', async function(req, res){
  console.log("hello world")
  console.log("login otp bod is ",req.body)
  // await sendTwoFactorAuthentication(req.body.id, req.body.userName, req.body.name, res);
  var _id=req.body.id;
  var userName=req.body.userName;
  console.log("username is ", userName);
  var name=req.body.name;
  console.log("id is ",_id)
  try{
    const otp= `${Math.floor(1000+Math.random()*9000)}`;
  
    const mailOptions1={
      from: 'ankitbhatt640@gmail.com',
      to: req.body.userName,
      subject:"otp for logging in to device",
      html:`<p>hi ${name}</p>
      <p> Please Enter <b> ${otp}</b> for authentication and complete signin process. Please hurry up it expires in 10 minutes</p> 
      <p> Regards </p>
      <p>pos </p>`
    }
    // const saltRounds=10;
    console.log(otp)
    const hashedOtp=await bcrypt.hash(otp, 10)
    console.log("hashed otp",hashedOtp);
    const newloginOtpVerification=await new loginOtpVerification({
      userId: _id,
      otp: hashedOtp,
      createdAt: Date.now(),
      expireAt: Date.now()+10000,
    })
    await newloginOtpVerification.save();
    await transpoter.sendMail(mailOptions1)
    return res.status(200).send({
      status: "Pending",
      message:"Otp Sent",
      data:{
        userId:_id,
        userName,
      }
    })

  }
  catch(error){
    return res.status(400).send({
      status:"failed",
      'message': error.message,
    })
  }

})

//protected

  router.get('/protected',
  passport.authenticate('jwt', { session: false }),  function (req, res) {
    console.log("req in protected route is ", req.user.id);
     
   
    return res.status(200).send({
      success: true,
      user: {
        id: req.user.id,
        userName: req.user.userName,
        name: req.user.name
      }
    })

  })

  const sendOtpVerificationEmail= async({_id, userName, name}, res)=>{
    console.log("id is ",_id)
    try{
      const otp= `${Math.floor(1000+Math.random()*9000)}`;
      const mailOptions={
        // from: 'ankitbhatt640@gmail.com',
        to: userName,
        subject:"verify your email",
        html:`<p>hi ${name}</p>
        <p> Please Enter <b> ${otp}</b> for verification of your email and complete signup. Please hurry up it expires in 10 minutes</p> 
        <p> Regards pos </p>`
      }
      const saltRounds=10;
      console.log(otp)
      const hashedOtp=await bcrypt.hash(otp, 10)
      console.log("hashed otp",hashedOtp);
      const newOtpVerification=await new otpVerification({
        userId: _id,
        otp: hashedOtp,
        createdAt: Date.now(),
        expireAt: Date.now()+10000,
      })
      await newOtpVerification.save();
      await transpoter.sendMail(mailOptions)
      res.json({
        status: "Pending",
        message:"Otp Sent",
        data:{
          userId:_id,
          userName,
        }
      })

    }
    catch(error){
      res.json({
        status:"failed",
        'message': error.message,
      })
    }
  }

  router.post("/verifyOtp", async(req, res)=>{
    console.log(req.body)
    try{
      let{userId, otp}= req.body;
      if(!userId || !otp){
        return res.status(401).send({
          success: false,
          message: "empty otp not allowed"
        })
        
        // throw error("empty otp details are not allowed")
      }
      else{
        var  otpVerificationRecord = await otpVerification.find({userId})
      }
      if(otpVerificationRecord.length<=0)
      {
        return res.status(401).send({
          success: false,
          message: "Account record dosn't exixt or already verified. please signup again login"
        })
       
      }
      else{
        const {expiredAt}= otpVerificationRecord[0];
        const hashedOtp=otpVerificationRecord[0].otp;
        if(expiredAt<Date.now()){
          await otpVerification.deleteMany({userId});
          return res.status(401).send({
            success: false,
            message: "Code expired. please request agian"
          })
        }
        else{
          const validOtp= await bcrypt.compare(otp, hashedOtp)
          if(!validOtp){
            return res.status(401).send({
              success: false,
              message: "invalid otp"
            })
          }
          else{
           await User.updateOne({_id:userId},{verifide:true})
           await otpVerification.deleteMany({userId})
          }
        }
        return res.status(200).send({
          success: true,
          message: "Otp Verified, Please Login"
        })
      }

    }catch(error){
      res.json({
        status:"Failed",
        message:error.message,
      })

    }


  })

  const sendTwoFactorAuthentication= async(_id, userName, name, res)=>{
    console.log("id is ",_id)
    try{
      const otp1= `${Math.floor(1000+Math.random()*9000)}`;
      const mailOptions={
        // from: 'ankitbhatt640@gmail.com',
        to: userName,
        subject:"otp for logging in to device",
        html:`<p>hi ${name}</p>
        <p> Please Enter <b> ${otp}</b> for authentication and complete signin process. Please hurry up it expires in 10 minutes</p> 
        <p> Regards </p>
        <p>pos </p>`
      }
      const saltRounds=10;
      console.log(otp1)
      const hashedOtp=await bcrypt.hash(otp1, 10)
      console.log("hashed otp",hashedOtp);
      const newloginOtpVerification=await new loginOtpVerification({
        userId: _id,
        otp: hashedOtp,
        createdAt: Date.now(),
        expireAt: Date.now()+10000,
      })
      await newloginOtpVerification.save();
      await transpoter.sendMail(mailOptions)
      return res.status(200).send({
        status: "Pending",
        message:"Otp Sent",
        data:{
          userId:_id,
          userName,
        }
      })

    }
    catch(error){
      return res.status(400).send({
        status:"failed",
        'message': error.message,
      })
    }
  }

  router.post("/verifyloginotp", async(req, res)=>{
    console.log(req.body)
    try{
      
       var userId=req.body.userId;
      var otp=req.body.otp;
      console.log("userid in verify otp login is ", userId)
      console.log("otp in verify otp login is ", otp)

      if(!userId || !otp){
        return res.status(401).send({
          success: false,
          message: "empty otp not allowed"
        })
        
        // throw error("empty otp details are not allowed")
      }
      else{
        var  loginotpVerificationRecord = await loginOtpVerification.find({userId})
        console.log("loginnot provider ", loginotpVerificationRecord);
      }
      if(loginotpVerificationRecord.length<=0)
      {
        return res.status(401).send({
          success: false,
          message: "Account record dosn't exixt or already verified. please signup again login"
        })
       
      }
      else{
        const {expiredAt}= loginotpVerificationRecord[0];
        const hashotp=loginotpVerificationRecord[0].otp;
        if(expiredAt<Date.now()){
          await loginOtpVerification.deleteMany({userId});
          return res.status(401).send({
            success: false,
            message: "Code expired. please request agian"
          })
        }
        else{
          const validOtp1= await bcrypt.compare(otp, hashotp)
          if(!validOtp1){
            return res.status(401).send({
              success: false,
              message: "invalid otp"
            })
          }
          else{
           await User.updateOne({_id:userId},{verifide:true})
           await loginOtpVerification.deleteMany({userId})
          }
        }
        return res.status(200).send({
          success: true,
          message: "Otp Verified, Please Login"
        })
      }

    }catch(error){
      res.json({
        status:"Failed",
        message:error.message,
      })

    }

  })

  
  

  module.exports = router;