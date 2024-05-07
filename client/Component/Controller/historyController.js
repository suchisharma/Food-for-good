app.controller('historyController', ['setGetdata', '$scope', '$http', 'user', 'orderService', function (setGetdata, $scope, $http, user, orderService) {

  $scope.isDisabled = true;
  var completedOrder = [];
  var pagenumber = 1;
  $scope.postData = {
    userName: setGetdata.getusername(),
    pageNo: pagenumber,
    size: 10
  }
  orderService.completedOrder($scope.postData).then(function (res) {
  
    res.data.message.forEach(element => {
     
        completedOrder.push(element);
      
    })
    $scope.response = completedOrder;
    console.log($scope.response)
  }).catch(err => {
    console.log(err);
  })

    






    $scope.previous = function () {
      if (pagenumber == 1) {
        $scope.itIsDisabled = true
        $scope.nextDisabled = false;
        // page();
    }
      else {
        $scope.itIsDisabled = false
        pagenumber--;
        completedOrder=[];
        $scope.postData = {
          userName: setGetdata.getusername(),
          pageNo: pagenumber,
          size: 10
        }
        orderService.completedOrder($scope.postData).then(function (res) {
  
          res.data.message.forEach(element => {
           
              completedOrder.push(element);
            
          })
          $scope.response = completedOrder;
        }).catch(err => {
          console.log(err);
        })
      }

    }
    $scope.next = function () {
      if (pagenumber >=50) {
        $scope.nextDisabled = true;
        $scope.itIsDisabled = false;
        // page();
      }
      else {
        $scope.itIsDisabled = false
        pagenumber++;
        completedOrder=[];
        $scope.postData = {
          userName: setGetdata.getusername(),
          pageNo: pagenumber,
          size: 10
        }
        orderService.completedOrder($scope.postData).then(function (res) {
  
          res.data.message.forEach(element => {
           
              completedOrder.push(element);
            
          })
          $scope.response = completedOrder;
        }).catch(err => {
          console.log(err);
        })

      }
    }



  $scope.orderId = function (item) {

    $scope.totalbill = item.user.totalBill;

    $scope.itms = item;
  }




}])