$(document).ready(function(){
    function getParams() {
        var idx = document.URL.indexOf('?');
        var params = new Array();
        if (idx != -1) {
            var pairs = document.URL.substring(idx + 1, document.URL.length).split('&');
            for (var i = 0; i < pairs.length; i++) {
                nameVal = pairs[i].split('=');
                params[nameVal[0]] = nameVal[1];
            }
        }
        return params;
    }
    params = getParams();
    var id = unescape(params.id);

    var updateEmployeeInfo = function(){
        $.ajax({
            url:"http://localhost:55484/api/employee/"+id+"/profile",
            method:"PUT",
            header:"Content-Type:application/json",
            data:{
                name: $('#name').val(),
                contact: $('#phone').val(),
                address: $('#address').val()
            },
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    window.location.href = "../Employee/employee_home.html";
                }
                else
                {
                    alert("Something Went Wrong!!!");
                }
            }
        });
    };

    var EmployeeValidate = function(){
        var name = $('#name').val();
        var contact = $('#phone').val();
        var address = $('#address').val();
        var flag = true;
        if(name.length <4){
            flag = false;
            $('#errname').html("Name Must be at least 3 Character Long");
        }
        if(contact.length <11 || contact.length > 15){
            flag = false;
            $("#errphone").html("Phone Number is not Valid");
        }
        if(address.length < 5){
            flag = false;
            $('#erraddress').html("Address Must be at least 5 character long");
        }
        return flag;
    };

    $("#updateInfo").click(function(){
       if(EmployeeValidate()){
            updateEmployeeInfo();
       }
    });

    $('#name').focus(function(){
        $('#errname').html("");
    });
    $('#phone').focus(function(){
        $('#errphone').html("");
    });
    $('#address').focus(function(){
        $('#erraddress').html("");
    });

});