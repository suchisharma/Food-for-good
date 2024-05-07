const router= require("express").Router();
const {subCategory}=require("../module/subCategory")
// add SubCategory
router.post("/addSubCategory", function(req, res){
    try{
        subCategory.findOne({name:req.body.name}, function(err, item){
            if(err){
                console.log("error in finding")
            }
            if(item){
                return res.status(400).json({message: "subCategor Already exisit"})
            }
            try{
                var data={
                    name: req.body.name,
                category:{
                    id:req.body.category.id,
                    name: req.body.category.name
                }
            }
            const newsubCategory=new subCategory(data);
            newsubCategory.save();
            res.status(200).json({message:"Subcategory added"})        
            }catch(err){
                console.log(err);
                console.log("error in creating subcategory")
            }

        })
    }catch(error){console.log("error in try")}

})

//Get SubCategory
router.get("/getsubCategory", function(req, res){
    try{
        subCategory.find().then(function(response){
            return res.status(200).json(response)
        })

    }catch(error){console.log(error)}
})

module.exports=router;      