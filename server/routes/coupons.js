const router = require("express").Router();
const { coupons } =require( "../module/coupons.js");

router.post("/newCoupons", function(req, res){
    console.log("coupons body", req.body);
    if(req.body.name.length<=0 || req.body.Discount.length<=0)
    {
        return res.status(400).json({messgae:"length can't be zero"})
    }
    else{
    coupons.findOne({name: req.body.name}, function(err, result){
        if(err)
        {
            console.log("error in if")
        }
        if(result)
        {
            return res.status(400).json({message:"Coupon already exixts!!!"})
        }
  
        try{
      
            const newCoupons= coupons.create({
                name: req.body.name,
                Discount: req.body.Discount,
                // user:[]
            })
           
            return res.status(200).send({
                message:"Coupon added"
            })

        } catch(error){
            return res.status(400).send({
                message:"error in creating coupon"
            })

        }

    })
}
})

router.get("/getCoupons", function(req,res){
    try{
        coupons.find().then(function(result){
            return res.status(200).json(result)
        }, function(err){
            return res.status(400).json(err)
        })

    }catch(error){
        return res.status(400).send({
            message:"error in finding coupons"
        })
    }
})


module.exports=router;