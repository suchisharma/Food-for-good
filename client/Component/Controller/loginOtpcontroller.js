app.controller("loginOtpcontroller", ['$scope','setGetdata','otpverification','$location','growl','$cookies', function($scope, setGetdata,otpverification,$location,growl,$cookies){
    
   sendotp=function(){
        var data={
        id: setGetdata.getID(),
        userName:setGetdata.getusername(),
        name: setGetdata.getname()
        }
        otpverification.verifyloginData(data).then(function(res){
            growl.success(res.data.message,{ttl:3000})
        }, function(err){
            growl.error(err.data.message,{ttl:3000})
        })

    }
    
 sendotp();
    $scope.login=function(){
        $location.path('/login')
    }

    $scope.submitOtplogin=function(otp)
    {
        var data={
            userId:setGetdata.getID(),
            otp:otp
        }
        console.log("data package is ", data);
        otpverification.authloginotp(data).then(function(res){
            console.log(res)
            $cookies.put('auth', true)
            growl.success("Otp verified",{ttl:3000})
            $location.path('/Home')


        }, function(err){
            console.log("error is",err)
            $scope.error=err.data.message

        })


    }
    
    
    // $scope.submitOtplogin=function(otp){
    //     var data={
    //         userId:setGetdata.getID(),
    //         otp:otp
    //     }
    //     console.log(data);
    //     otpverification.authloginotp(data).then(function(res){
    //         growl.success(res.data.message,{ttl:3000})
    //         $location.path('/Home')

    //     }, function(err){
    //         console.log(err);
    //         $scope.error=err.data.message;
        
    //     })



    // }


}])