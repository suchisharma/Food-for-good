exports.getContacts = function(){
    var done = false
    var limit ;
    var d = Q.defer();
  var options = { sort: { "_id": -1 }, limit: 1 }
  var startDate
  
  async.whilst(function(){
    return !done 
  },function(callback){
    contactFeilds.find().then(function(res){
            if(res.length > 0)  startDate = res.posLastModified
            else  startDate = new Date("2001-01-01T09:11:48.959Z").toISOString() //assume date
  
            if(res.length == 0 ){
              var feilds = new contactFeilds({
                kamLastModified:startDate,
                posLastModified:startDate
              })
              feilds.save()
            }
              insertData(startDate,res._id)
              .then(function(result){
                  
                console.log(result,"result")
                done = result
                callback(null,done)
               
              }).catch(function(e){
                console.log(e,"error in function call")
              callback(e)
              })
          }).catch(function(err){
              console.log(err,"error in script")
          })
        },function(err){
          if(err) return 
          d.resolve(true)
        })
          
        return d.promise;
      }
  
  function insertData (startDate,feildsId){
    var d = Q.defer();
   var limit
  
  var options = {
    'method': 'POST',
    'url': `${config.pos.getContacts}/api/v1/pos/get_registered_contacts?partner=supportApp`,
    'headers': {
      'Authorization': 'Basic U0p6VE54WjhnOkkrb3FPVGdTbmNqUHNYMGRkVzRuYUYwR2ZPK1NNWFlFNWpwbTZvOFEraDQ9',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "after": `${startDate}`
    })
  
  };
  
    request(options, function (error, response,body) {
      
      if(body)  d.resolve(true)
   
      
      body = JSON.parse(body)
      limit = body.data.length
      var deployment = JSON.parse(body.data[0].deployment)
  
      var modify = {
        posLastModified:startDate
       }
      contactFeilds.findOneAndUpdate({_id:feildsId},modify).then(function(res){
        if(res) console.log("date updated")
       }).catch(function(e){
        console.log(e)
       })
      var bulk = contactSchema.collection.initializeOrderedBulkOp();
      console.log("data",limit);
  
      for(var i=0;i<limit;i++){
        console.log('I---',i)
      //console.log("data",body);
      
      bulk.find({mobile:body.data[i].phone}).upsert().updateOne(
        {$set: {
          name:body.data[i].name,
          email:body.data[i].email,
          mobile:body.data[i].phone,
          priority:body.data[i].priority,
          deployment:{
            //push according to pos data
            id:deployment._id,
            name:deployment.name,
            city:deployment.region.name,
            location:""
  
        },
        company:{
            //push according to pos data
            id:body.data[i].tenant_id,
            name:body.data[i].domainName,
            subDomain:""
  
        },
        createdOn:body.data[i].created,
        lastModified:body.data[i].updated,
        isDeleted:body.data[i].isDeleted
      }  }
      )
      }
        bulk.execute(function(err){
          if(err) return 
  
          if(limit<100)
             {
               console.log("less than 100")
                d.resolve(true)
             }
            else  d.resolve(false)
        });
        
  
  
     
    })
  
    return d.promise;
    
  
  }






  function getWeather(city) {
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
      request.addEventListener("loadend", function() {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([response, city]);
        } else {
          reject([this, response, city]);
        }
      });
      request.open("GET", url, true);
      request.send();
    });
  
    promise.then(function(response) {
      printElements(response);
    }, function(errorMessage) {
      printError(errorMessage);
    });
  }





  apicall=function(order){
    var promise = new Promise(function(resolve, reject) {
        orderService.bulkPlace(order).then(function (res) {
            resolve([res, order]);
        }, function(err){
            reject([this, err, order]);
        })

})
promise.then(function(response) {
    console(response);
  }, function(errorMessage) {
    console(errorMessage);
  })
}