app.service('setGetdata', function(){
    let id=null;
    let registerid=null;
    let name=null;
    let userName=null;                                       
    let success=false;
    var item=[];
    var orderItems=[];
    var completedOrder=[];
    var response=[];
    var token=null;
    this.setregisterId=function(registeredId)
    {
        registerid=registeredId;
    }
    this.getregisterId=function(){
        return registerid;
    }
    this.setData= function(requestUserid, requestUsername, requestName, requestSuccess){   
        id=requestUserid;
        name=requestName,
        userName= requestUsername;  
        success= requestSuccess;     
        console.log("success is ="+ success);
        console.log("id is"+id)
    },
    this.getMenucall=function(responses){
        response.push(responses);

    }
    this.getMenu=function(){
        return response;
    }
    this.pasteToken=function(token){
        token=token;

    }
    this.getToken=function(){
        return token;
    }

    this.getusername= function(){
        console.log("inside get user function and user name is "+ userName);
        return userName;
    },
    this.getname= function(){
        return name;
    }
    this.getsuccess=function(){
        return success;
    }
    this.getID=function(){
        return id;
    }
    console.log("setget username is ="+userName)
    this.setItems=function(items)
    {
        // item=items;
         item.push(items);

    }
    this.getItem=function(){
        return item;
    }
    this.placeItems=function(items)
    {
        orderItems= items;

    }
    this.getplaceItems=function(){
        return orderItems;
    }
    this.completedItems=function(arrayItems)
    {
        
       completedOrder=arrayItems;
    }
    this.getCompletedOrder=function(){
        return completedOrder;
    }
})