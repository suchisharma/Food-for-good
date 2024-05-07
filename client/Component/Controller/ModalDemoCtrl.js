app.controller('ModalDemoCtrl', function ($scope, $http, $uibModal, itemService) {

  $scope.showPopup = function (path, value) {
    console.log(value)

    user = { 'first_name': 'JON', 'last_name': 'Smith', 'address': 'Ny' };
    $scope.modalInstance = $uibModal.open({
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: path,
      controller: 'ModelHandlerController',
      controllerAs: '$ctrl',

      resolve: {
        categoryData:['$http','growl', function($http, growl){
          return  itemService.getCategory().then(function (res) {
            return $scope.categoryData = res.data;
        }, function(err){
          growl.error("err",{ttl:3000})
        })
        
      }],
      subCategoryData:['$http','growl', function($http, growl){
        return itemService.getsubCategory().then(function (response) {
          return $scope.subCategoryData = response.data;
      }, function(err){
        growl.error("err",{ttl:3000})
      })
      }]
    }
    });
    $scope.modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date()); 
      console.log("absb");
    });

  }


});

app.controller("ModelHandlerController", function ($scope, growl,$uibModalInstance, $http,categoryData, subCategoryData,itemService) {
  console.log("categoryData",categoryData)
  $scope.getsubCategoryButton = true;
  $scope.categoryData=categoryData;
  $scope.categoryDataUpadte = function (selected) {
    if (selected) {
        $scope.getsubCategoryButton = false;
        $scope.myfilter = selected.name;
    }
  }
  $scope.subCategoryData = subCategoryData;
  
  
  $scope.cancelModal = function () {
    console.log("cancle modal");
    $uibModalInstance.dismiss('close');
  }
  $scope.ok = function ( value,itemName,itemPrice, gst, vat, serviceCharge, selected, selectedItem, description) {
    if(value==1)
    {
     
      var data = {
        name: itemName,
        price: itemPrice,
        description:description,
        tax: {
            gst: gst,
            vat: vat,
            serviceCharge: serviceCharge,
        },
        category: {
            id: selected._id,
            name: selected.name,
        },
        subCategory: {
            id: selectedItem._id,
            name: selectedItem.name
        }
    }
    console.log("data is ",data);
    itemService.postMenu(data).then(function (res) {
            console.log(res.data.message);
            growl.success(res.data.message, { ttl: 2000 })
            console.log($scope.itemName);
            console.log("in post")
         

          }).catch(function(err){
            console.log(err)
            console.log("in error")
                growl.warning(err.data.message, { ttl: 2000 })
          })
    
        }
        if(value==2)
        {
          var data={
            name:itemName,
          }
          itemService.postCategory(data).then(function(response){
            console.log("inside res", response)

            growl.success(response.data.message,{ttl:3000});
          }, function(err){
            console.log(err)
            console.log("inside err")
            growl.warning(err.data.message,{ttl:3000});
          })
        }
        if(value==3){
          var data={
            name: itemName,
            category:{
              id: itemPrice._id,
              name: itemPrice.name

            }
          }
          itemService.postSubCategory(data).then(function(response){
            console.log("in response",response)
            growl.success(response.data.message,{ttl:3000});
          }, function(err){
            console.log("in error",err)
            growl.warning(err.data.message,{ttl:3000})
          })
        }
        console.log(value)
        $uibModalInstance.close('save');
          console.log("ok called")
  }


});	
