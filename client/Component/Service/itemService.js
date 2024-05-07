app.factory('itemService',['$http', function($http){
    return{
        getsubCategory: getsubCategory,
        getCategory:getCategory,
        getMenu:getMenu,
        postCategory:postCategory,
        postSubCategory:postSubCategory,
        postMenu:postMenu,
        getCoupons:getCoupons,
    }

    function getsubCategory(){
        return $http.get("http://localhost:3000/serv/subCategory/getsubCategory")
    }
    function getCategory(){
        return  $http.get("http://localhost:3000/serv/category/getCategory")
    }
    function getMenu(){
        return $http.get("http://localhost:3000/serv/item/getMenu")
    }
    function postCategory(data){
        return  $http.post("http://localhost:3000/serv/category/addCategory", data)
    }
    function postSubCategory(data){
        return $http.post("http://localhost:3000/serv/subCategory/addSubCategory", data)
    }
    function postMenu(data){
        return $http.post("http://localhost:3000/serv/item/addMenus", data)
    }
    function getCoupons(){
        return  $http.get("http://localhost:3000/serv/coupons/getCoupons")
    }
}])