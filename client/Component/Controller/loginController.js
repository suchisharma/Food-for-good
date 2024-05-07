app.controller('loginController',
['$scope', '$location','$window','$cookies','$cookieStore','setGetdata','user','socket', function($scope, $location, $window, $cookies,$cookieStore,setGetdata,user,socket)
  { 

    /*       SWITCH            */
    $scope.siwtchRegister=function(){
        $location.path('/Register');

    }

    /*      LOGIN              */

    $scope.autherationCheck=function(userName, password){
        var newData={
            userName: userName,
            password: password
        };  
        // $http.post('http://localhost:3000/login', newData)
        user.login(newData).then(function (res) {
            console.log(res)
            $window.localStorage.setItem("token", res.data.token);
            console.log(res)
            $cookies.put('token', res.data.token);
            console.log("token is")
            console.log(token);
            // user.create('auth/protected', { headers:{ Authorization : token}}).then(function (res){
            user.protected(token).then(function (res){
                console.log("response is")
                console.log(res);
                socket.socketConnection();
                setGetdata.setData(res.data.user.id ,res.data.user.userName, res.data.user.name, res.data.success);
               
                console.log("inside protected route data",res.data.user.userName);
                $location.path('/loginOtp');
            
            }).catch(err=>{
                console.log("in error")
                console.log(err);
                $location.path('/login');
               })
        },(err) => {
            console.log("error");
            $scope.error=err.data.message;
            console.log(err.data.message);
        });

        var token= $window.localStorage.getItem("token");
        console.log($window.localStorage);
    }    
}])
