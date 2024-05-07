const router=require("express").Router();
const {item} =require("../module/item.js")
//Menu Post
router.post("/addMenus", function(req, res){
    console.log(req.body);
    try{
        item.findOne({name: req.body.name}, function(err, name){
            console.log(req.body.name)
            if(err){
                console.log("error in finding name")
            }
            if(name)
            {
                return res.status(400).json({message:"Item already in menu"})
            }
            try{
                var data={
                    name:req.body.name,
                    price:req.body.price,
                    description:req.body.description,
                    tax:{
                        gst:req.body.tax.gst,
                        vat:req.body.tax.vat,
                        serviceCharge:req.body.tax.serviceCharge,
                    },
                    category:{
                        id:req.body.category.id,
                        name:req.body.category.name,
                    },
                    subCategory:{
                        id:req.body.subCategory.id,
                        name:req.body.subCategory.name,

                    }
                }
                const newitem= new item(data)
                newitem.save();
                return res.status(200).json({message:"item added"})
            }catch(err){console.log(err)}
        })
    }catch(error){console.log(error)}
})

// get Menu
router.get("/getMenu", function(req, res){
    try{
        item.find().then(function(response){
            return res.status(200).json(response);
        }).catch((err)=>{console.log(err)})

    }catch(error){console.log(error)}
})

module.exports=router;