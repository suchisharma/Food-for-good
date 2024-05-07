const router= require("express").Router();
const {category}=require("../module/category.js");
var mongoose=require("mongoose")
//Post New Category 
router.post("/addCategory",function(req, res){
    try{
    category.findOne({name:req.body.name}, function(err, name){
        if(err){
            console.log("error in creating");
        }
        if(name){

           return res.status(400).json({message:"Category already exisit"})
        }
        try{
            const newCategory=category.create({
                name:req.body.name
            }, function(err, category){
                if(err)
                {
                    console.log("error in creating newCategory");
                }
                if(category)
                {
                    return res.status(200).json({message:"category created Successfull"})
                }
            })
        }catch(error){
            console.log("error in creating catergory")
        }

    })
    }catch(error){
        console.log(error)
        console.log("error in try");
    }
})
// Get category
router.get("/getCategory",function(req,res){

    try{
        category.find().then(function(response){
            res.status(200).json(response)
        })
    }catch(error){console.log("error in trying")}


})

module.exports= router;