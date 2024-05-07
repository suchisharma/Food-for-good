const router= require("express").Router();
const { menu } = require("../module/Menu.js");

// Post Menu
router.post("/addmenu", function(req, res){
    console.log("reqbody is ", req.body);
    try{
      menu.findOne({ name: req.body.name }, function(error, Menu){
        if(error){
          conosle.log("error in menu");
        }
        if(Menu){
          return res.status(400).json({
            message: 'Item alread in the list'
          })
  
        }
        try{
  
          const newMenu = menu.create({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
          })
          res.status(201).send({
            message: "Item added"
          })
  
        }catch(error){
          res.status(400).send({
            message:"Item can't be added"
          })
        }
      })
  
    }catch(error){
      res.status(400).send({
        message:"Error in menu"
      })
    }
  })

//Get Menu
  router.get("/getmenu", function (req, res) {
    try {
      menu.find().then(function (items) {
        res.status(200).json(items);
      })
    } catch (error) {

      res.status(502).json(error);
    }
  });

  module.exports=router;