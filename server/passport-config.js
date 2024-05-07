const passport= require("passport");
// const User=require('./database');
const { User}= require("./database.js");


passport.serializeUser((userObj, done) => {
    done(null, userObj._id);
    // console.log(User);
});
passport.deserializeUser((idFromCookie, done) => {

    User.findById(idFromCookie)
      .then((userObj) => {    // null as the first argument means NO ERRORS OCCURRED
        done(null, userObj);  // userObj as a second argument is set to the `req.user` when calling `done()`
      })
      .catch((err) => done(err)); // err as the first argument means we tell Passport there was an error
  });
  



  // passport.serializeUser((user, cb)=>{
  //       cb(null, user._id);
  //    })
    
  //    passport.deserializeUser((id, cb)=>{
  //       User.findOne({_id: id}, (err, user)=>{
  //           cb(err, user);
  //       });
  //    });
  
  module.exports = passport;