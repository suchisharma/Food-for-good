app.factory("otpverification",['$http',function($http){
    return {
        verifyData:verifyData,
        verifyloginData:verifyloginData,
        authloginotp:authloginotp,

    }
    function verifyData(data){
        return $http.post("http://localhost:3000/serv/auth/verifyOtp", data)
    }
    function verifyloginData(data){
        return $http.post("http://localhost:3000/serv/auth/loginOtp", data)
    }
    function authloginotp(data){
        return $http.post("http://localhost:3000/serv/auth/verifyloginotp", data)
    }
}])