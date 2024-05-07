
app.controller('reportController', ["$scope", "$http", "setGetdata", 'reportService', function ($scope, $http, setGetdata, reportService) {

    
    $scope.clear=function(){
        $scope.response="";
    }
    var usernameData = {
        userName: setGetdata.getusername()

    }
    var date = new Date();
    var datedata = {
        userName: usernameData,
        start: new Date(date.getFullYear(), date.getMonth(), 1),
        end: new Date(),
    }
    $scope.bracket = "totalsales";
    $scope.tableHead = "Name";
    $scope.tableHead2 = "Total Order";
    $scope.food = function () {
        
            $scope.loading=true;
        
        $scope.Report = "Report"
        $scope.titlehead = "Total Sale";
        $scope.reportModal = function (fromDate, toDate) {


            console.log(fromDate, "from date", toDate)
            var data = {
                userName: usernameData,
                start: fromDate,
                end: toDate,
            }
            reportService.totalItemSales(data).then(function (res) {
                $scope.loading=false;
                console.log(res);
                console.log($scope.response, "response is before food");
                $scope.response = res;
                console.log("response is after", $scope.response)
            }, function (err) {
                console.log("error is")
                console.log(err);
            })
        }
        

        reportService.totalItemSales(datedata).then(function (res) {
            $scope.loading=false;
            console.log(res);
            console.log($scope.response, "response is before food");
            $scope.response = res;
            console.log("response is after", $scope.response)
        }, function (err) {
            console.log("error is")
            console.log(err);
        })
    }

    $scope.totalSales = function () {
        $scope.loading=true;
        console.log("inside total saleas")
        $scope.Report = "Total Sale";
        $scope.titlehead = "Total Sale";
        $scope.reportModal = function (fromDate, toDate) {


            console.log(fromDate, "from date", toDate, "heheheh")
            var data = {
                userName: usernameData,
                start: fromDate,
                end: toDate,
            }
            reportService.totalsales(data).then(function (res) {
                $scope.loading=false;
                $scope.response = res;
            }, function (err) {
                console.log(err);
            })
        }
        
        reportService.totalsales(datedata).then(function (res) {
            $scope.loading=false;
            $scope.response = res;
        }, function (err) {
            console.log(err);
        })




    }

    $scope.totalCustomer = function () {
        $scope.loading=true;
        $scope.Report = "Total Customer";
        $scope.titlehead = "Total Customer";
        $scope.reportModal = function (fromDate, toDate) {


            console.log(fromDate, "from date", toDate, "heheheh")
            var data = {
                userName: usernameData,
                start: fromDate,
                end: toDate,
            }
            reportService.totalCustomer(data).then(function (res) {
                $scope.loading=false;
                $scope.response = res;
            }, function (err) {
                console.log(err);
            })
        }
        
        reportService.totalCustomer(datedata).then(function (res) {
            $scope.loading=false;
            $scope.response = res;
        }).catch(err => {
            console.log(err);
        })
    }


    $scope.customer = function () {
        $scope.loading=true;
        $scope.bracket = "name";
        $scope.tableHead = "Name";
        $scope.tableHead2 = "Contact Number"
        $scope.title = "Customer Report"
        $scope.customerReportModal = function (fromDate, toDate) {
            var data = {
                userName: usernameData,
                start: fromDate,
                end: toDate,
            }
            reportService.customerRecord(data).then(function (res) {
                $scope.loading=false;
                console.log("inside customer ")
                console.log(res);
                console.log($scope.response, "response is before customer");
                $scope.response = res;
                console.log("response is after", $scope.response)
            }, function (err) {
                console.log("error is")
                console.log(err);
            })
        }
       

        reportService.customerRecord(datedata).then(function (res) {
            $scope.loading=false;
            console.log("inside customer ")
            console.log(res);
            console.log($scope.response, "response is before customer");
            $scope.response = res;
            console.log("response is after", $scope.response)
        }, function (err) {
            console.log("error is")
            console.log(err);
        })

    }

    $scope.happyDay = function () {
        $scope.loading=true;

        $scope.searchDate = function (fromDate, toDate) {

            console.log(fromDate, "from date", toDate, "todate")
            var data = {
                userName: usernameData,
                start: fromDate,
                end: toDate,
            }
            reportService.happyday(data).then(function (res) {
                $scope.loading=false;
                var indexis = res.data.findIndex(ele => {
                    ele._id.newFieldName == null;
                    console.log(ele._id.newFieldName)
                })
                console.log("index is ", indexis);
                $scope.response = res;
                console.log($scope.response);
            }).catch(err => {
                console.log(err);
            })

        }
        
        reportService.happyday(datedata).then(function (res) {
            $scope.loading=false;
            var indexis = res.data.findIndex(ele => {
                ele._id.newFieldName == null;
                console.log(ele._id.newFieldName)
            })
            console.log("index is ", indexis);
            $scope.response = res;
            console.log($scope.response);
        }).catch(err => {
            console.log(err);
        })

    }

    $scope.taxWiseItem = function () {
        $scope.loading=true;
        $scope.Report = "Tax";
        $scope.titlehead = "Total Tax";
        $scope.reportModal = function (fromDate, toDate) {


            console.log(fromDate, "from date", toDate, "heheheh")
            var data = {
                userName: usernameData,
                start: fromDate,
                end: toDate,
            }
            reportService.totaltax(data).then(function (response) {
                $scope.loading=false;
                $scope.response = response
            }, function (err) {
                console.log(err);
            })
        }
        
        reportService.totaltax(datedata).then(function (response) {
            $scope.loading=false;
            console.log(response)
            $scope.response = response
        }, function (err) {
            console.log(err);
        })

    }
    $scope.billDetails = function () {
        $scope.loading=true;

        $scope.searchBillDetails=function(fromDate, toDate){
            var data = {
                userName: usernameData,
                start: fromDate,
                end: toDate,
            }
            reportService.billdetails(data).then(function(response){
                $scope.loading=false;
            $scope.response= response
        }, function(err){
            console.log(err)
        })

        }  


        reportService.billdetails(datedata).then(function(response){
            $scope.loading=false;
            $scope.response= response
        }, function(err){
            console.log(err)
        })


    }

    $scope.leastfood=function(){
        $scope.loading=true;
        $scope.Report = "Report"
        $scope.titlehead = "Total Sale";
        $scope.reportModal = function (fromDate, toDate) {


            console.log(fromDate, "from date", toDate)
            var data = {
                userName: usernameData,
                start: fromDate,
                end: toDate,
            }
            reportService.lestItemSales(data).then(function (res) {
                $scope.loading=false;
                console.log(res);
                console.log($scope.response, "response is before food");
                $scope.response = res;
                console.log("response is after", $scope.response)
            }, function (err) {
                console.log("error is")
                console.log(err);
            })
        }
        

        reportService.lestItemSales(datedata).then(function (res) {
            $scope.loading=false;
            console.log(res);
            console.log($scope.response, "response is before food");
            $scope.response = res;
            console.log("response is after", $scope.response)
        }, function (err) {
            console.log("error is")
            console.log(err);
        })

    }

    $scope.newcustomer=function(){
        $scope.loading=true;
        $scope.bracket = "name";
        $scope.tableHead = "Name";
        $scope.tableHead2 = "Contact Number"
        $scope.title = "Customer Report"
        $scope.customerReportModal = function (fromDate, toDate) {
            var data = {
                userName: usernameData,
                start: fromDate,
                end: toDate,
            }
            reportService.customerRecord(data).then(function (res) {
                $scope.loading=false;
                console.log("inside customer ")
                console.log(res);
                console.log($scope.response, "response is before customer");
                res.data.forEach(element => {
                    if(element.count==1)
                    {
                        $scope.response = res;

                    }
                    
                });
                
                console.log("response is after", $scope.response)
            }, function (err) {
                console.log("error is")
                console.log(err);
            })
        }
        

        reportService.customerRecord(datedata).then(function (res) {
            $scope.loading=false;
            console.log("inside customer ")
            console.log(res);
            console.log($scope.response, "response is before customer");
            res.data.forEach(element => {
                if(element.count==1)
                {
                    $scope.response = res;

                }
                
            });
            
            console.log("response is after", $scope.response)
        }, function (err) {
            console.log("error is")
            console.log(err);
        })

    }


    $scope.leastcustomer= function(){
        $scope.loading=true;
        $scope.bracket = "name";
        $scope.tableHead = "Name";
        $scope.tableHead2 = "Contact Number"
        $scope.title = "Customer Report"
        $scope.customerReportModal = function (fromDate, toDate) {
            var data = {
                userName: usernameData,
                start: fromDate,
                end: toDate,
            }
            reportService.leastCustomer(data).then(function (res) {
                $scope.loading=false;
                console.log("inside customer ")
                console.log(res);
                console.log($scope.response, "response is before customer");
                $scope.response = res;
                console.log("response is after", $scope.response)
            }, function (err) {
                console.log("error is")
                console.log(err);
            })
        }
       

        reportService.leastCustomer(datedata).then(function (res) {
            $scope.loading=false;
            console.log("inside customer ")
            console.log(res);
            console.log($scope.response, "response is before customer");
            $scope.response = res;
            console.log("response is after", $scope.response)
        }, function (err) {
            console.log("error is")
            console.log(err);
        })

    }
}])
