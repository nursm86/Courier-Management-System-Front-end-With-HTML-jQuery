$(document).ready(function(){
    var uname = Cookies.get('uname');
    var pass = Cookies.get('pass');
    var id = Cookies.get('id');

    // function getParams() {
    //     var idx = document.URL.indexOf('?');
    //     var params = new Array();
    //     if (idx != -1) {
    //         var pairs = document.URL.substring(idx + 1, document.URL.length).split('&');
    //         for (var i = 0; i < pairs.length; i++) {
    //             nameVal = pairs[i].split('=');
    //             params[nameVal[0]] = nameVal[1];
    //         }
    //     }
    //     return params;
    // }
    // params = getParams();
    // var postId = unescape(params.id);

    var updateCustomerInfo = function(){
        $.ajax({
            url:"http://localhost:55484/api/customer/"+id+"/profile",
            method:"PUT",
            header:"Content-Type:application/json",
            data:{
                name: $('#name').val(),
                contact: $('#phone').val(),
                address: $('#address').val(),
                sequrityQue: $('#sq').val()
            },
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    loadCustomerInfo();
                    $('#editmodal').modal('toggle');
                }
                else
                {
                    alert("Something Went Wrong!!!");
                }
            }
        });
    };

    var changePassword = function(){
        $.ajax({
            url:"http://localhost:55484/api/customer/"+id+"/updatePassword",
            method:"PUT",
            header:"Content-Type:application/json",
            data:{
                password: $('#npass').val()
            },
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    alert("Password Changed Successfully.Please Login Again!!");
                    window.location.href = "../Basic/login.html";
                }
                else
                {
                    alert("Something Went Wrong!!!");
                }
            }
        });
    };

    var loadCustomerInfo = function(){
        $.ajax({
            url:"http://localhost:55484/api/customer/"+id,
            method:"GET",
            header:"Content-Type:application/json",
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    var data=xmlhttp.responseJSON;
                    $('#showname').html(data.name);
                    $('#showEmail').html(data.user.emailAddress);
                    $('#showPhone').html(data.contact);
                    $('#showAddress').html(data.address);

                    $('#name').val(data.name);
                    $('#email').val(data.user.emailAddress);
                    $('#phone').val(data.contact);
                    $('#address').val(data.address);
                    $('#sq').val(data.sequrityQue);
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };
    loadCustomerInfo();

    var CustomerValidate = function(){
        var name = $('#name').val();
        var contact = $('#phone').val();
        var address = $('#address').val();
        var sequrityQue = $('#sq').val();
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
        if(sequrityQue == ""){
            flag = false;
            $("#errsq").html("Sequrity Que is required");
        }
        return flag;
    };
    $("#updateInfo").click(function(){
       if(CustomerValidate()){
        updateCustomerInfo();
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
    $('#sq').focus(function(){
        $('#errsq').html("");
    });

    $('#oldpass').focus(function(){
        $('#erroldpass').html("");
    });
    $("#npass").focus(function(){
        $('#errnpass').html("");
                
    });
    $("#cpass").focus(function(){
        $('#errcpass').html("");
    });

    $("#changePassword").click(function(){
        var op = $('#oldpass').val();
        var np = $("#npass").val();
        var cp = $("#cpass").val();
        if(op == pass){
            if(np == cp){
                if(np.length > 3){
                    changePassword();
                }
                else{
                    $('#errnpass').html("Password Must be at least 4 character Long!!!");
                    $('#errcpass').html("Password Must be at least 4 character Long!!!");
                }
            }
            else{
                $('#errnpass').html("Do not Match with confirm Password!!!");
                $('#errcpass').html("Do not Match With New Password!!!");
            }
        }
        else{
            $('#erroldpass').html("Old password Didn't Match!!!");
        }
    });
});