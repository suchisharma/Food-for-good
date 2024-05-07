const router=require("express").Router();
const {history}=require("../module/History.js");
const pdfkit= require('pdfkit')
const fs= require('fs');

var mongoose= require("mongoose");
var count=1;
// Post data To MongoDB
router.post("/history", (req,res)=>{
  console.log(req.body);
  count++;
  var items=[];
  req.body.map(function(i){
    var it={
      itemName:i.name,
      itemPrice: i.price,
      itemquantity:i.count,
      gst:i.tax.gst,
      vat:i.tax.vat,
      serviceCharge:i.tax.serviceCharge,
    }
    items.push(it);
  })
 
  var data={
    user:{
      userId: req.body[0].userId,
      userName:req.body[0].userName,
      status: req.body[0].status,
      contactNumber:req.body[0].contactNumber,
      customerName:req.body[0].customerName,
      totalBill: req.body[0].Totalbill,

    },
    items:items,
    status: req.body[0].Status,
  }
    const newhistory=new history(data)
    newhistory.save(); 
    res.status(201).send({
      message: "history updated"
    })
 

  })
// Get Data from MongoDB
  router.post('/historyData', function(req, res){
   
    try{

       history.find({"user.userName": req.body.userName}).then(function(items){
    
      res.status(200).json(items);
    })
  } catch(error){
      
      res.status(502).json(error);
    }
  })

  //Status Update 
  router.put("/:id",  function(req, res) {
    console.log("Called");
    console.log(req.body);
    console.log("id is", req.params.id);
    try {
      const post =  history.findById(req.params.id);
      
      console.log("id in try", req.params.id);
        try {
          console.log("Hello world");
          history.findById({_id:mongoose.Types.ObjectId(req.params.id)},function(err,res){
            console.log("response is ",res);
          })
          history.updateOne({_id:mongoose.Types.ObjectId(req.params.id)},{$set:{"user.status":req.body.user.status}},function(err,res){
            console.log("error ",err)
            console.log("resp ",res)
          })
        } catch (err) {      
          console.log(err);

          res.status(500).json(err);
        }
      } catch (err) {
        console.log("outside catch error is =", err);
      res.status(500).json(err);
    }
  });
  

  module.exports= router;