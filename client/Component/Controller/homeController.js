
app.controller('homeController', ['$scope', '$http', 'setGetdata', 'growl', '$window', '$cookies', '$location', 'orderService', 'user', 'itemService','$q', function ($scope, $http, setGetdata, growl, $window, $cookies, $location, orderService, user, itemService, $q) {
    $scope.filterby = '';
    $scope.bill='0';
    $scope.disableCopun=false;
    reload = function () {
        $window.location.reload();
        var token = $cookies.get('token');
        console.log("token is")
        console.log(token);


        user.protected(token).then(function (res) {
            console.log(res);
            $location.path('/Home')
            setGetdata.setData(res.data.user.id, res.data.user.userName, res.data.user.name, res.data.success);
            // Auth.setUser(res.data.user);
        }).catch(err => {
            console.log(err);
            $location.path('/login');
        })

    }
 // Logout function
    $scope.logOut = function () {
        $window.localStorage.clear();
        $cookies.remove('token');
        $cookies.remove('auth');
        $location.path('/login');
        $window.localStorage.clear();
        $location.path('/login');
    }





    // Pagination Preparing //
    var store = [];
    var pagenumber=1;
    $scope.number=pagenumber;
    var data = {
        userName: setGetdata.getusername(),
        pageNo:pagenumber,
        size:10
        
    }
    console.log("user name is =", data)
    orderService.preparingOrder(data).then(function (response) {
        console.log("response in history data is sadas");
        console.log("data in response", response);
        // $scope.data=response.data;

        response.data.message.forEach(element => {
            // console.log(element)
            store.push(element);
        })
        $scope.data = store;
        console.log($scope.data)
    }).catch(err=>{
        console.log(err);
    })
    
        


        $scope.previous = function () {
            if (pagenumber == 1) {
                $scope.itIsDisabled = true
                $scope.nextDisabled = false;
                // page();
            }
            else {
                pagenumber--;
                $scope.number=pagenumber;
                store=[];
                var data = {
                    userName: setGetdata.getusername(),
                    pageNo:pagenumber,
                    size:10
                    
                }
                orderService.preparingOrder(data).then(function (response) {
                    console.log("response in history data is sadas");
                    console.log("data in response", response.data);
                    // $scope.data=response.data;
            
                    response.data.message.forEach(element => {
                        store.push(element);
            
                    })
                    $scope.data = store;
                }).catch(err => {
                    console.log(err);
                })

                
            }

        }
        $scope.next = function () {
            $scope.itIsDisabled = false;
            if (pagenumber >=50) {
                $scope.nextDisabled = true;
                $scope.itIsDisabled = false;
                console.log("ifpage ")
                
            }
            else {
                pagenumber++;
                $scope.number=pagenumber;
                var data = {
                    userName: setGetdata.getusername(),
                    pageNo:pagenumber,
                    size:10
                    
                }
                store=[];
                orderService.preparingOrder(data).then(function (response) {
                    console.log("response in history data is sadas");
                    console.log("data in response", response.data);
                    // $scope.data=response.data;
            
                    response.data.message.forEach(element => {
                        store.push(element);
            
                    })
                    $scope.data = store;
                }).catch(err => {
                    console.log(err);
                })

            }
        }
        console.log(store.length);


        
   


    $scope.status = {
        availableOptions: [
            {
                id: 1,
                name: "Preparing"
            }, {
                id: 2,
                name: "Prepared",
            }, {
                id: 3,
                name: "Completed",
            },
        ],
        selectedOption: { id: 1, name: "Preparing" }
    };

// Update Status 
    $scope.update = function (selectedstatus, item) {
        response = selectedstatus.name;

        if (response != "Completed") {
            item.color = "pink";
        }
        else {
            item.color = "#99dec8";
        }
    }

// Submit History
    $scope.submitHistory = function (item) {
        if (response == "Completed") {

            console.log("item in res ", item);
            console.log("item id in res is", item._id);
            console.log("item status in res is", item.user.status)
            item.user.status = "Completed";
            console.log("item status after completion is", item.user.status);
            console.log(item);
            itemid = item._id;
            $http.put("http://localhost:3000/serv/historyRoute/" + item._id, item).then(function (res) {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
            var index = store.findIndex(x => x._id == item._id);
            if (index > -1) {
                store.splice(index, 1);
            }
            var length = $scope.data.length;
            // $scope.newData = $scope.data;
            $scope.filteredItems=store;
            // setGetdata.completedItems(dataArray);
            //   console.log(dataArray,"dhsh");
            //    console.log("new data is after sicing in object is=",$scope.data);
            console.log($scope.data);
            response = "";
        }
        else {
            console.log(response)
        }

    }
    $scope.orderId = function (item) {
        // growl.success("item added",{ttl:2000})

        $scope.totalbill = item.user.totalBill;

        $scope.itms = item;
    }

// Fetch Menu
    $scope.menuCalled = function () {

        var newCart = [];
        var sum = 0;
        var tax = 0;
        var res = [];
        itemService.getMenu().then(function (res) {
            console.log(res);
            res = res.data;
            res.forEach(items => {
                items.count = 0;
            })
            setGetdata.getMenucall(res);
            console.log(res);

        }).catch(err => {
            console.log(err);
        })

        $scope.response = setGetdata.getMenu();
        // console.log($scope.response[0]);

        $scope.increment = function (items) {
            if (!items.count) {
                items.count = 0;
            }
            items.count++;
            // var tax=((items.tax.gst+items.tax.vat+items.tax.serviceCharge)/100);

            if (items.count == 1) {
                order(items);
            }
            $scope.items = items;
            sum = sum + (items.price + (items.price * ((items.tax.gst + items.tax.vat + items.tax.serviceCharge) / 100)));
            $scope.bill = sum;
        }

        decrease = function (items) {
            if (!items.count) {
                items.count = 0
            }
            if (items.count > 0) {
                items.count--;
                $scope.items = items;
                sum = sum - (items.price + (items.price * ((items.tax.gst + items.tax.vat + items.tax.serviceCharge) / 100)));
                $scope.bill = sum;
            }
        }
        $scope.decrement = function (items) {
            decrease(items);
        }

        order = function (items) {
            if (items) {
                growl.success("Added to cart", { ttl: 2000 });
            }
            else {
                growl.warning("cant add to cart");
            }
            let count = 0;
            newCart.push(items);
            $scope.newCart = newCart;
            setGetdata.setItems(items);
        }

        $scope.remove = function (items) {
            var index = newCart.indexOf(items)
            if (index > -1) {
                var totalprice = ((items.price + (items.price * ((items.tax.gst + items.tax.vat + items.tax.serviceCharge) / 100))) * items.count);
                items.count = 0;
                sum = sum - totalprice;
                $scope.bill = sum;
                newCart.splice(index, 1);

            }
        }

        $scope.place = function (items, contactNumber, customerName) {
            console.log("inside place")
            console.log("contact Number is", contactNumber)
            bill = $scope.bill;
            setGetdata.placeItems(items);
            items.forEach(element => {
                element.userId = setGetdata.getID();
                element.userName = setGetdata.getusername();
                element.status = "preparing";
                element.Totalbill = bill;
                element.customerName = customerName;
                element.contactNumber = contactNumber;

            });
            if (contactNumber != null) {
                console.log(items)
                growl.success("Order Placed.", { ttl: 2000 });
                alert("Order Placed. Thank you!!!");
                orderService.orderPlace(items).then(function (res) {
                    console.log(res);
                    items.count = 0;
                    reload();
                }).catch(err => {
                    console.log(err);
                })
            }
            else {
                console.log(contactNumber)
                growl.error("Enter contact number", { ttl: 3000 });
            }
            $scope.response = setGetdata.getMenu();
        }




        //////////////////////category called////////////////////////////////

        itemService.getsubCategory().then(function (response) {
            $scope.getsubCategoryName = response.data;
            console.log($scope.getsubCategoryName)

        }, function (err) {
            console.log(err);
        })
        $scope.filter = function (datais) {
            $scope.filterby = datais;
        }

    }


    function sleep(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }
// Bulk Order place 
    $scope.bulkOrder = function () {
        $scope.loading=false;
        console.log("bulk order called")
        var menuItems = [];
        itemService.getMenu().then(function (res) {
            // console.log(res);
            res.data.forEach(items => {
                items.count = 0;
                menuItems.push(items);

            })
            looping();
            $scope.loading=false;

        }, function (Err) {
            console.log("err", Err)
        })


        looping =   async function  () {
            var fail = 0;
            var placeorder = [];
            var statusArray = ["Completed", "preparing"];
            var counter = 0;
            var order = [];
            while (counter != 10) {
                $scope.loading=true;
                $scope.disablebulk=true;
                var count = 0;
                while (count != 100000) {
                    var text = "";

                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

                    for (var j = 0; j < 5; j++) {
                        text += possible.charAt(Math.floor(Math.random() * possible.length));
                    }
                    var contact = Math.floor(100000000 + Math.random() * 10000000000);

                    var randomIndex = Math.floor(Math.random() * menuItems.length);
                    var statusNumber = Math.floor(Math.random() * statusArray.length);
                    var number = Math.floor(1 + Math.random() * 10);


                    var item = menuItems[randomIndex];
                    var totalamount = item.price * number;
                    var amountIncludingTax = totalamount + (totalamount * (item.tax.gst + item.tax.vat + item.tax.serviceCharge) / 100);
                    item.userId = setGetdata.getID();
                    item.userName = setGetdata.getusername();
                    item.status = statusArray[statusNumber];
                    item.Totalbill = amountIncludingTax;;
                    item.customerName = text;
                    item.contactNumber = contact;
                    item.count = number;

                    order.push(item);

                    count++;
                    // console.log("count in while",count)  

                }
                // console.log(order);
                //    apicall(order).then(function (result) {
                //     console.log("this is result",result);
                // }, function (error) {
                //     console.log("this is error",error);
                // }, function(update){
                //     console.log("this is ", update);
                // });
                await(orderService.bulkPlace(order).then(function (res) {
                    $scope.loading=false;
            $scope.disablebulk=false;
                    console.log(res)
                    // order.length=0;
                    // order=[];
                    order=[];
                    console.log("fail is", fail);



                }, function (err) {

                    console.log(err)
                    // order = [];
                    fail++;

                }))
                order=[];
                
        
                counter++;
                
               
                
                console.log(counter);
                // 
            }
            console.clear();
            console.log("cleared")
            
            


           





            // }
        }
    }
     function apicall(order) {
                
                
                var deferred = $q.defer();
                console.log("inside deffer")

                return orderService.bulkPlace(order).then(function(response){
                    deferred.resolve(response.data);
                    return deferred.promise;
                }, function(response){
                    deferred.reject(response);
                    return deferred.promise;

                })
            }
    



     $scope.getcouponcode=function(){
        itemService.getCoupons().then(function(response){
            $scope.coupon=response.data;
            console.log(response.data)
        }, function(error){
            console.log(error)
        })
     }

     $scope.appliedCoupon=function(item)
     {
        console.log(item)
        $scope.disableCopun=true;
        $scope.bill=$scope.bill-item.Discount;
     }






}])

