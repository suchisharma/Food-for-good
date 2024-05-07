app.factory("reportService",['$cookies', "$http", function($cookies,$http){
   return{
    totalItemSales:totalItemSales,
    customerRecord:customerRecord,
    happyday:happyday,
    totalsales:totalsales,
    totalCustomer:totalCustomer,
    totaltax: totaltax,
    billdetails: billdetails,
    lestItemSales:lestItemSales,
    leastCustomer:leastCustomer,

   }
   function totalItemSales(data){
    return $http.post("http://localhost:3000/serv/analysis/totalItemSales", data)
   }
   function customerRecord(data){
    return $http.post("http://localhost:3000/serv/analysis/customerRecord",data)
   }
   function happyday(data){
    return $http.post("http://localhost:3000/serv/analysis/mostSellingDay",data)
   }
   function totalsales(data){
    return $http.post("http://localhost:3000/serv/analysis/totalSales", data)
   }
   function totalCustomer(data){
    return $http.post("http://localhost:3000/serv/analysis/totalCustomer",data)
   }

   function totaltax(data){
      return $http.post("http://localhost:3000/serv/analysis/itemwisetotaltax",data)
   }
   function billdetails(data){
      return $http.post("http://localhost:3000/serv/analysis/iteminbill", data)
   }

   function lestItemSales(data){
      return $http.post("http://localhost:3000/serv/analysis/leastSales", data)

   }

   function leastCustomer(data){
      return $http.post("http://localhost:3000/serv/analysis/leastcustomerRecord",data)
   }

   }


])