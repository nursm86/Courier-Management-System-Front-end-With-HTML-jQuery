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

    var loadEmployeeInfo = function(){
        $.ajax({
            url:"http://localhost:55484/api/employee/"+id+"/profile",
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
                    $('#showDob').html(data.dob);
                    $('#showPhone').html(data.contact);
                    $('#showAddress').html(data.address);
                    $('#showjDate').html(data.joining_date);
                    if(data.designation == 0){
                        $('#showdesig').html("Manager");
                    }
                    else{
                        $('#showdesig').html("non-Manager");
                    }
                    $('#showQuali').html(data.qualification);

                    $('#name').val(data.name);
                    $('#dob').val(data.dob);
                    $('#phone').val(data.contact);
                    $('#address').val(data.address);
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };
    loadEmployeeInfo();
    $("#updateInfo").click(function(){
       updateCustomerInfo();
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