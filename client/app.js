var app=angular.module("MainApp",['ui','ui.router','ui.bootstrap', 'angular-growl', 'ngCookies']);

app.config(['$stateProvider','$locationProvider','$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider,){
    $stateProvider
    .state('login',{ 
        url:'/login',
        templateUrl:'Component/View/Login.html',
        controller: 'loginController'
    }).state('Register',{
        url: '/Register',
        templateUrl:'Component/View/Register.html',
        controller: 'registercontroller'
    }).state('OtpVerify',{
        url:'/OtpVerify',
        templateUrl:'Component/View/OtpVerify.html',
        controller:'otpVerifycontroller'
    }).state('loginOtp',{
        url:'/loginOtp',
        templateUrl:'Component/View/loginOtp.html',
        controller:'loginOtpcontroller'
    }).state('Home',{
            url: '/Home',
            templateUrl:'Component/View/Home.html',
            controller:'homeController'
    }).state('Home.History',{
        url:"/History",
        templateUrl:"Component/View/History.html",
        controller:'historyController'
    }).state('Home.Report',{
        url:"/Report",
        templateUrl:"Component/View/Report.html",
        controller:'reportController'
    }).state('Home.Details',{
        url:"/Details",
        templateUrl:"Component/View/Details.html",
        controller:"ModalDemoCtrl"
    });
    $urlRouterProvider.otherwise('/login');

}])




app.controller("MainController",['setGetdata', '$location','$scope','$http','$cookies','user',function(setGetdata, $location, $scope,$http,$cookies,user){
    var token= $cookies.get('token');
    var auth=$cookies.get('auth');
    console.log("token is")
    console.log(token);
   if(auth=="true"){
    user.protected(token).then(function (res){

                console.log("response in Maincontroller",res);
                $location.path('/Home')
                setGetdata.setData(res.data.user.id ,res.data.user.userName, res.data.user.name, res.data.success);
                // Auth.setUser(res.data.user);
}, function(err){
    console.log(err);
                $location.path('/login');
})
   }
   else{
    $location.path('/login');
   }
}])