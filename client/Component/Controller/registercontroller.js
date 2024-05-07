angular.module('MainApp').controller('registercontroller',  ['$scope', '$location', '$http','user','setGetdata', function ($scope, $location, $http,user, setGetdata) {
    $scope.Name=null;
    $scope.userName=null;
    $scope.password=null;
    $scope.switchLogin=function(){
        $location.path('/login');

    }
    $scope.submitInfo=function(name, userName, password){
        $scope.loading=true
        var data={
            name:name,
            userName:userName,
            password:password
        };
        console.log(data);
         user.register(data).then(function (res) {
            $scope.loading=false;
            console.log(res);
            console.log("response dtat",res.data.data.userId);
            setGetdata.setregisterId(res.data.data.userId)
            // console.log(res.data.message);
            // alert("user Created");
            $location.path("/OtpVerify");
        }, (err) => {
            $scope.loading=false;
            alert(err.data.message);
        });  
    }
}])