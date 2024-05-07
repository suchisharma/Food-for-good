const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const http=require('http').createServer(app);
const io= require('socket.io')(http,{
  cors: {
    origin: "http://127.0.0.1:5501",
    methods: ["GET", "POST"],
  },
});
const connection = require("./socket/socket");
const { connectMongoose, User } = require("./module/database.js");
// const { menu } = require("./module/Menu.js");
// const {history}=require("./module/History.js");
const history = require("./routes/historyRoute.js");
const bulk=require("./routes/bulk.js")
const analysis = require("./routes/analysis.js");
const auth = require("./routes/auth.js")
const menu = require("./routes/menuRoute.js")
// const coupon=require("./routes/couponRoute.js");
const coupons=require("./routes/coupons.js");
const category = require("./routes/categrory.js")
const subCategory = require("./routes/subCategory.js")
const item = require("./routes/item.js")
// const pdf = require("./routes/pdf");
// const { compareSync, hash, genSalt } = require("bcrypt");
const bcrypt = require("bcrypt");
const cors = require("cors");
const expressSession = require("express-session");
// const { Socket } = require('socket.io');
connectMongoose();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())

require('./passportconfig');
//Protected Route

// app.post("/register", function (req, res) {
//   if (req.body.name >= 0 || req.body.name <= 0) {
//     res.status(401).json({
//       message: 'user can"t be created'
//     })
//   }
//   else {
//     console.log("register body", req.body);
//     try {
//       User.findOne({ userName: req.body.userName }, function (error, user) {
//         if (error) {
//           console.log("error");
//         }
//         if (user) {
//           return res.status(400).json({
//             message: 'Failed to create new user, user already register'

//           })
//         }
//         try {
//           bcrypt.genSalt(10).then(function (salt) {
//             bcrypt.hash(req.body.password, salt).then(( password)=> {
//               if (error) {
//                 console.log("error in hashing");
//               }
//               if (password) {
//                 const newUser = User.create({
//                   name: req.body.name,
//                   userName: req.body.userName,
//                   password: password,
//                 }, function (error, userCreated) {
//                   if (error) {
//                     console.log("error in creating");
//                   }
//                   return res.status(201).send({
//                     message: "user created"

//                   });

//                 });

//               }
//             }).catch(err=>{
//               return res.status(400).send({
//                 message:"Error in hashing"
//               })

//             })
//           })



//         } catch (err) {
//           res.status(400).send({
//             message: "Error in creating user"
//           })
//         }
//       })
//     } catch (error) {
//       return res.status(400).json({
//         messgae: "user cant be created"
//       })

//     }
//   }
// })



//////


// app.post("/register",async (req, res)=>{
//   if(req.body.name >=0 || req.body.name <=0)
//   {
//     res.status(401).json({
//       message: 'user can"t be created'
//     })
//   }
//   else{
//   console.log("register body",req.body);
//   const user= await User.findOne({userName: req.body.userName});
//   if(user) return res.status(400).json({
//     message: 'Failed to create new user'
// })
//   const salt= await genSalt(10);
//   const hashedPass= await hash(req.body.password, salt)
//   const newUser = User.create({
//     name: req.body.name,
//     userName: req.body.userName,
//     password: hashedPass,
//   });

//   res.status(201).send({
//     message: "user created"

//   });
// }

// });



////

// app.post('/login', function(req, res){

//   User.findOne({userName: req.body.userName}).then( User=>{

//     if(!User){
//       return res.status(401).send({
//         success: false,
//         message: "could not find user"
//       })
//     }


//     if(!compareSync(req.body.password, User.password)){
//       return res.status(401).send({
//         success: false,
//         message: "incorrect password"
//       })

//     }

//     const payload= {
//       userName: User.userName,
//       id: User._id
//     }

//     const token= jwt.sign(payload, "secret", {expiresIn: "1d"})

//     return res.status(200).send({
//       success: true,
//       message: "Logged in successfully",
//       token: "Bearer " +token
//     })


//   })

// })


///

// app.post('/login', function (req, res) {
//   try {
//     User.findOne({ userName: req.body.userName }, function (error, User) {
//       if (error) {
//         console.log("Error");
//       }
//       if (!User) {
//         return res.status(401).send({
//           success: false,
//           message: "could not find user"
//         })
//       }

//       if (!bcrypt.compareSync(req.body.password, User.password)) {
//         return res.status(401).send({
//           success: false,
//           message: "incorrect password"
//         })
//       }

//       const payload = {
//         userName: User.userName,
//         id: User._id
//       }

//       const token = jwt.sign(payload, "secret", { expiresIn: "1d" })

//       return res.status(200).send({
//         success: true,
//         message: "Logged in successfully",
//         token: "Bearer " + token
//       })

//     })
//   } catch (error) {
//     return res.status(400).send({
//       message: "Cant login"
//     })
//   }

// })

//




app.get('/protected',
  passport.authenticate('jwt', { session: false }), function (req, res) {
    return res.status(200).send({
      success: true,
      user: {
        id: req.user.id,
        userName: req.user.userName,
        name: req.user.name
      }
    })

  })




// app.post("/menu", async (req, res) => {
//   console.log("reqbody is ", req.body);
//   const Menu = await menu.findOne({ name: req.body.name });
//   if (Menu) return res.status(400).json({
//     message: 'Item alread in the list'
//   })
//   const newMenu = menu.create({
//     name: req.body.name,
//     price: req.body.price,
//     category: req.body.category,
//     description: req.body.description,
//   })
//   res.status(201).send({
//     message: "Item added"
//   })
// })




/////////////////////

// Menu

app.post("/menu", function (req, res) {
  console.log("reqbody is ", req.body);
  try {
    menu.findOne({ name: req.body.name }, function (error, Menu) {
      if (error) {
        conosle.log("error in menu");
      }
      if (Menu) {
        return res.status(400).json({
          message: 'Item alread in the list'
        })

      }
      try {

        const newMenu = menu.create({
          name: req.body.name,
          price: req.body.price,
          category: req.body.category,
          description: req.body.description,
        })
        res.status(201).send({
          message: "Item added"
        })

      } catch (error) {
        res.status(400).send({
          message: "Item can't be added"
        })
      }
    })

  } catch (error) {
    res.status(400).send({
      message: "Error in menu"
    })
  }
})








//Menu

app.get("/getmenu", function (req, res) {
  try {

    
    menu.find().then(function (items) {

      
      res.status(200).json(items);
    })
  } catch (error) {
    
    res.status(502).json(error);
  }
});


app.use("/serv/auth", auth)
app.use("/serv/menu", menu)
// app.use("/serv/coupon", coupon)
app.use("/serv/category", category)
app.use("/serv/item", item)
app.use("/serv/coupons", coupons)
app.use("/serv/subCategory", subCategory)
app.use("/serv/historyRoute", history);
app.use("/serv/bulk", bulk)
app.use("/serv/analysis", analysis);

// Socket Connection 
io.on('connection', function(socket){
  console.log("hello")
  console.log(socket.id);

})




// Port Listen 
http.listen(3000, function (error) {
  if (error) {
    console.log("error in running server");
  }
  console.log("listing on http://localhost:3000")
})








