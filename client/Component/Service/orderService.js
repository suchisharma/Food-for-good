// app.factory("orderService",['$http',function($http){
//      getFactory={};
//      getFactory.getApi=function(link,data)
//      {
//         return $http.get("http://localhost:3000/serv/"+link);
//      }
//      return getFactory;

// }])


app.factory("orderService",['$http', function($http){

   return {
      order:order,
      getMenu:getMenu,
      orderPlace:orderPlace,
      bulkPlace:bulkPlace,
      preparingOrder:preparingOrder,
      completedOrder:completedOrder
   }

   function order(data){
      return $http.post("http://localhost:3000/serv/historyRoute/historyData",data)
   }

   function getMenu(){
      return $http.get("http://localhost:3000/serv/menu/getmenu");

   }
   function preparingOrder(data){   
      return $http.post("http://localhost:3000/serv/analysis/menuprepared",data);
   }
   function completedOrder(data){
      return $http.post("http://localhost:3000/serv/analysis/completed",data)
   }
   function orderPlace(data){
      return $http.post("http://localhost:3000/serv/historyRoute/history",data)
   }
   function bulkPlace(data){
      return $http.post("http://localhost:3000/serv/bulk/bulk",data)
   }

}])