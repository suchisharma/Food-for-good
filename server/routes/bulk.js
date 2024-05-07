const router = require("express").Router();

const { history } = require("../module/History.js");

var counter=0;
//Bulk Insert
router.post("/bulk", function (req, res) {
    // var d = Q.defer();
    var bulk = history.collection.initializeOrderedBulkOp();
    console.log("lnegth=", req.body.length);
    for (var i = 0; i < req.body.length; i++) {
        console.log('loop', i)
        bulk.insert({
            user: {
                userId: req.body[i].userId,
                userName: req.body[i].userName,
                status: req.body[i].status,
                contactNumber: req.body[i].contactNumber,
                customerName: req.body[i].customerName,
                totalBill: req.body[i].Totalbill,

            },
            items: [{
                itemName: req.body[i].name,
                itemPrice: req.body[i].price,
                itemquantity: req.body[i].count,
                gst: req.body[i].tax.gst,
                vat: req.body[i].tax.vat,
                serviceCharge: req.body[i].tax.serviceCharge,
            }
            ],
             time: new Date()

        })
    }
    bulk.execute(function(err, response){
        if(err)
        {
            // console.log(err)
            return res.status(500).json(err);
        }
        if(res)
        {
            // console.log("response",response);
            
           
            console.log("counter inside",counter++);
            return res.status(200).json(response);
        }
    })
      



})
module.exports = router;