$(document).ready(function(){
    var uname = Cookies.get('uname');
    var pass = Cookies.get('pass');
    var id = Cookies.get('id');
    var type = Cookies.get('utype');

    if(uname == ""){
        Cookies.set("errmsg","Please Login First!!!");
        window.location.href = "../Basic/login.html";
    }
    else if(type != 1){
        Cookies.set("errmsg","You are not an Employee so you are not allowed there");
        window.location.href = "../Basic/login.html";
    }

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
                dob : $('#dob').val(),
                contact: $('#phone').val(),
                address: $('#address').val(),
                blood_Group : $('#bgroup').val(),
                qualification :$("#qualification").val()
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
                    console.log(xmlhttp.responseJSON.modelState);
                    alert("Something Went Wrong!!!");
                }
            }
        });
    };

    var EmployeeValidate = function(){
        var name = $('#name').val();
        var contact = $('#phone').val();
        var address = $('#address').val();
        var dob = $('#dob').val();
        var blood_Group  = $('#bgroup').val();
        var qualification = $("#qualification").val();
        var flag = true;
        if(name.length <4){
            flag = false;
            $('#errname').html("Name Must be at least 3 Character Long");
        }
        if(dob == ""){
            flag = false;
            $('#errdob').html("Date of Birth is required");
        }
        if(blood_Group == ""){
            flag = false;
            $('#errbgroup').html("Blood Group is Required");
        }
        if(qualification == ""){
            flag = false;
            $('#errqualification').html("Qualification is required");
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

    $("#updateDocument").click(function(){
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
    $('#dob').focus(function(){
        $('#errdob').html("");
    });
    $('#bgroup').focus(function(){
        $('#errbgroup').html("");
    });

});