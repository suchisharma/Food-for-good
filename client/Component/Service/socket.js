app.factory("socket", function($rootScope){
    var url = "http://localhost:3000/";
    var socket=io.connect(url);
    return {
        socketConnection:socketConnection
    }
    function socketConnection(){
        var response= socket.on('connection')
        console.log(response);
        console.log("hello")
        // alert( response.id, "socket id");
        return response;
        
    }
})