app.controller("otpVerifycontroller", ['$http','setGetdata','$scope','otpverification','growl','$location', function($http, setGetdata,$scope,otpverification,growl,$location){
    $scope.submitOtp=function(otp)
    {
        var data={
            userId:setGetdata.getregisterId(),
            otp:otp
        }
        console.log("data package is ", data);
        otpverification.verifyData(data).then(function(res){
            console.log(res)
            growl.success("Otp verified",{ttl:3000})
            $location.path('/login')


        }, function(err){
            console.log("error is",err)
            $scope.error=err.data.message

        })


    }

}])