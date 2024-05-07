const router = require("express").Router();
const { history } = require("../module/History.js");
const { item } = require("../module/item.js")
var mongoose = require("mongoose");
// const { response } = require("express");

//Total Item
router.post("/totalItemSales", function (req, res) {
    console.log("totalItemsSales are", req.body)
    
    history.aggregate([{ $unwind: "$items" }, { $match: { 'user.userName': req.body.userName.userName } }, { $match: { 'time': { '$gte': new Date(req.body.start), '$lte': new Date(req.body.end) } } }, { $group: { _id: "$items.itemName", count: { '$sum': 1 }, totalsale: { $sum: "$items.itemquantity" } } }, { $sort: { totalsale: -1 } }]).then(function (response) {
        console.log(response);
        res.status(200).json(response);
    })
})


// Preparing status Order
router.post("/menuprepared", function (req, res) {
    console.log(req.body.pageNo)
    var pageNo = parseInt(req.body.pageNo);
    var size = parseInt(req.body.size);
    var query = {}
    if (pageNo < 0 || pageNo === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
    console.log("in menu prepared");



    history.count({}, function (err, totalCount) {
        if (err) {
            response = { "error": true, "message": "Error fetching data" }
            console.log("error in counting", err);
        }
        console.log("total Count", totalCount)
        history.find({"user.userName":req.body.userName,"user.status":"preparing"}, {}, query, function (err, data) {
            // Mongo command to fetch all data from collection.
            if (err) {
                console.log("error in finding", err)
                response = { "error": true, "message": "Error fetching data" };
            } else {
                var totalPages = Math.ceil(totalCount / size)
                response = { "error": false, "message": data, "pages": totalPages };
            }
            res.json(response);
        });
    })

})
// Completed Status Order
router.post("/completed", function (req, res) {
    console.log(req.body.pageNo)
    var pageNo = parseInt(req.body.pageNo);
    var size = parseInt(req.body.size);
    var query = {}
    if (pageNo < 0 || pageNo === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
    console.log("in menu prepared");



    history.count({}, function (err, totalCount) {
        if (err) {
            response = { "error": true, "message": "Error fetching data" }
            console.log("error in counting", err);
        }
        console.log("total Count", totalCount)
        history.find({"user.userName":req.body.userName,"user.status":"Completed"}, {}, query, function (err, data) {
            // Mongo command to fetch all data from collection.
            if (err) {
                console.log("error in finding", err)
                response = { "error": true, "message": "Error fetching data" };
            } else {
                var totalPages = Math.ceil(totalCount / size)
                response = { "error": false, "message": data, "pages": totalPages };
            }
            res.json(response);
        });
    })

})










//Least Selling items
router.post("/leastSales", function (req, res) {
    console.log("totalItemsSales are", req.body)

    history.aggregate([{ $unwind: "$items" }, { $match: { 'user.userName': req.body.userName.userName } }, { $match: { 'time': { '$gte': new Date(req.body.start), '$lte': new Date(req.body.end) } } }, { $group: { _id: "$items.itemName", count: { '$sum': 1 }, totalsale: { $sum: "$items.itemquantity" } } }, { $sort: { totalsale: 1 } }]).then(function (response) {
        console.log(response);
        res.status(200).json(response);
    })
})
// Most visited Customer
router.post("/customerRecord", function (req, res) {
    console.log(req.body);

    history.aggregate([{ $unwind: "$user" }, { $match: { 'user.userName': req.body.userName.userName } }, { $match: { 'time': { '$gte': new Date(req.body.start), '$lte': new Date(req.body.end) } } }, { $group: { _id: "$user.contactNumber", count: { $sum: 1 }, name: { $addToSet: "$user.customerName" } } }, { $sort: { count: -1 } }, { $limit: 15 }]).then(function (response) {
        console.log(response);
        res.status(200).json(response);
    }).catch(err => {
        console.log("error fjhafh");
        console.log(err);
        res.status(400).send({ messgae: "error in aggregation" });
    })
})
//Least Visited Customer
router.post("/leastcustomerRecord", function (req, res) {
    console.log(req.body);

    history.aggregate([{ $unwind: "$user" }, { $match: { 'user.userName': req.body.userName.userName } }, { $match: { 'time': { '$gte': new Date(req.body.start), '$lte': new Date(req.body.end) } } }, { $group: { _id: "$user.contactNumber", count: { $sum: 1 }, name: { $addToSet: "$user.customerName" } } }, { $sort: { count: 1 } }, { $limit: 15 }]).then(function (response) {
        console.log(response);
        res.status(200).json(response);
    }).catch(err => {
        console.log("error fjhafh");
        console.log(err);
        res.status(400).send({ messgae: "error in aggregation" });
    })
})
// Most Selling day
router.post("/mostSellingDay", function (req, res) {
    console.log(req.body)
    history.aggregate([{ $match: { 'user.userName': req.body.userName.userName } }, { $match: { 'time': { '$gte': new Date(req.body.start), '$lte': new Date(req.body.end) } } }, { '$project': { newFieldName: { '$dateToString': { format: '%Y-%m-%d', date: '$time' } } } }, { '$group': { _id: { newFieldName: '$newFieldName' }, viewCount: { '$sum': 1 }, } }, { '$sort': { 'viewCount': -1 } }]).then(function (response) {
        console.log(response, "is respose");
        res.status(200).json(response);
    }).catch(err => {
        response.status(400).json(err);
    })
})
// Happy day
router.post("/totalSales", function (req, res) {
    console.log("total sales", req.body);

    history.aggregate([{ $unwind: '$items' }, { $match: { 'user.userName': req.body.userName.userName } }, { $match: { 'time': { '$gte': new Date(req.body.start), '$lte': new Date(req.body.end) } } }, { $group: { _id: "$user.userName", totalsale: { $sum: { $multiply: ["$items.itemPrice", "$items.itemquantity"] } } } }, { $limit: 15 }]).then(function (response) {
        console.log(response);
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
})
// Total customer Visted
router.post("/totalCustomer", function (req, res) {
    history.aggregate([{ $match: { 'user.userName': req.body.userName.userName } }, { $match: { 'time': { '$gte': new Date(req.body.start), '$lte': new Date(req.body.end) } } }, { $group: { _id: "$user.userName", totalsale: { $sum: 1 } } }, { $limit: 15 }]).then(function (response) {
        console.log(response);
        res.status(200).json(response)
    }).catch(err => {
        res.status(400).json(err);
    })
})
router.post("/getDate", function (req, res) {
  
    history.aggregate([{ $match: { 'time': { '$gte': new Date(req.body.start), '$lte': new Date(req.body.end) } } }, { $limit: 15 }]).then(function (response) {
        return res.status(200).json(response);

    }, function (err) {
        return res.status(400).json(err)
    })
})
// Item Wise tax
router.get("/itemWiseTax", function (req, res) {
   
    item.aggregate([{ $project: { _id: "$name", totalsale: { $sum: ["$tax.vat", "$tax.gst", "$tax.serviceCharge"] } } }, { '$sort': { 'totalsale': -1 } }, { $limit: 15 }]).then(function (response) {
        return res.status(200).json(response);
    }, function (err) {
        return res.status(400).json(err);
    })
})
router.post("/itemwisetotaltax", function (req, res) {
    console.log(req.body)
    console.log("Called")
    history.aggregate([{ $unwind: "$items" },
    { $match: { "user.userName": req.body.userName.userName } },
    { $match: { 'time': { '$gte': new Date(req.body.start), '$lte': new Date(req.body.end) } } },
    {
        $project: {
            _id: "$items.itemName", taxsum: { $sum: ["$items.vat", "$items.gst", "$items.serviceCharge"] },
            totalamount: { $multiply: ["$items.itemPrice", "$items.itemquantity"] }
        }
    },
    { $group: { _id: "$_id", totalsale: { $sum: { $divide: [{ $multiply: ["$taxsum", "$totalamount"] }, 100] } } } }, { '$sort': { 'totalsale': -1 } }, { $limit: 15 }]).then(function (response) {
        return res.status(200).json(response);
    }, function (err) {
        return res.status(400).json(err);
    })
})
// Multiple detailing order
router.post("/iteminbill", function (req, res) {
    console.log("item bill is called");
    history.aggregate([{ $unwind: "$items" },
    { $match: { "user.userName": req.body.userName.userName } },
    { $match: { 'time': { '$gte': new Date(req.body.start), '$lte': new Date(req.body.end) } } },
    {
        $group: {
            _id: "$_id", totalitems: { $sum: 1 },
            subtotal: { $sum: { $multiply: ["$items.itemPrice", "$items.itemquantity"] } },
            totaltax: { $sum: { $divide: [{ $multiply: [{ $sum: ["$items.vat", "$items.gst", "$items.serviceCharge"] }, "$items.itemPrice", "$items.itemquantity"] }, 100] } },
            grosstotal: {
                $sum: {
                    $sum: [{ $sum: { $multiply: ["$items.itemPrice", "$items.itemquantity"] } },
                    { $sum: { $divide: [{ $multiply: [{ $sum: ["$items.vat", "$items.gst", "$items.serviceCharge"] }, "$items.itemPrice", "$items.itemquantity"] }, 100] } }]
                }
            },
            name: { $addToSet: "$user.contactNumber" }
        }

    },
    { '$sort': { 'grosstotal': -1 } }]).then(function (response) {
        console.log(response);
        return res.status(200).json(response)
    }, function (err) {
        console.log(err)
        return res.status(400).json(err)
    })

})

router.post("/delete", function (req, res) {
    history.deleteMany({ 'time': { '$gte': new Date(req.body.start), '$lte': new Date(req.body.end) } }).then(function (response) {
        return res.status(200).json({ message: "data deleted" })
    }, function (err) {
        return res.status(500).json(err);
    })

})


module.exports = router;