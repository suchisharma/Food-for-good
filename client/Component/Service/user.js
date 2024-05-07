// app.factory('user',['$http', function($http){
//     userFactory={}
//     userFactory.create=function(link, data){
//         return $http.post("http://localhost:3000/serv/"+link, data)
//     }
//     return userFactory
// }])

app.factory('user',['$http',function($http){
    return{
        register:register,
        login:login,
        protected:protected
    }

    function register(data){
        return $http.post("http://localhost:3000/serv/auth/register",data)
    }
    function login(data){
        return $http.post("http://localhost:3000/serv/auth/login",data)
    }
    function protected(token){
        return $http.get("http://localhost:3000/serv/auth/protected",{ headers:{ Authorization : token}})
    }

}])