$(document).ready(function(){

    $("#userName").focus(function(){
        $("#msg").html("");
    });
    
    $("#password").focus(function(){
        $("#msg").html("");
    });
    
    $("#login").click(function(){
        Validate();
    });
    
    var Validate = function(){
        $.ajax({
            url:"http://localhost:55484/api/user/login",
            method:"POST",
            header:"Content-Type:application/json",
            data:{
                userName:$("#userName").val(),
                password:$("#pass").val()
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    var data=xmlhttp.responseJSON;
                    Cookies.set("uname",$("#userName").val());
                    Cookies.set("pass",$("#pass").val());
                    Cookies.set("id",data.id);
                    if(data.userType == 0){
                        window.location.href = "../Admin/admin_home.html";
                    }
                    else if(data.userType == 1){
                        if(data.status ==1){
                            window.location.href = "../Employee/employee_home.html";
                        }
                        else if(data.status == 0){
                            window.location.href = "../Employee/updateDocument.html?id="+data.id;
                        }
                    }
                    else{
                        if(data.status == 0){
                             $("#msg").html("You are not Varified Yet.Please wait till We Varify you!!");
                        }
                        else{
                            window.location.href = "../Customer/customer_home.html";
                        }
                    }
                }
                else
                {
                    $("#msg").html("Wrong User Name or password!!");
                }
            }
        });
    };
    
    $("#Register").click(function(){
        if(CustomerValidate()){
            if($("#erruname").html() !=""){
                alert("please choose another username");
                $('#uname').focus();
            }
            else{
                SignUp();
            }  
        }
    });

    $('#uname').focusout(function(){
        checkUserName();
    });

    var checkUserName = function(){
        var username = $('#uname').val();
        $.ajax({
            url:"http://localhost:55484/api/user/check/"+username,
            method:"GET",
            header:"Content-Type:application/json",
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    $('#erruname').html("User Name Already Exist!!!");
                }
            }
        });
    };

    var CustomerValidate = function(){
        var uname =$('#uname').val();
        var email = $('#email').val();
        var pass =  $('#pass').val();
        var cpass = $('#cpass').val();
        var name= $('#name').val();
        var contact= $('#contact').val();
        var address= $('#address').val();
        var sequrityQue= $('#sq').val();
        var flag = true;
        if(uname.length <4){
            flag = false;
            $('#erruname').html("User Name Must be at least 3 Character Long");
        }
        if(email == ""){
            flag = false;
            $('#erremail').html("Email is Required");
        }
        if(pass.length < 4){
            flag = false;
            $('#errpass').html("Password must be at least 4 character long!!!");
        }
        if(cpass.length < 4){
            flag = false;
            $('#errcpass').html("Password must be at least 4 character long!!!");
        }
        if(cpass != pass){
            flag = false;
            $('#errpass').html("Password do not match with confirm Password!!!");
            $('#errcpass').html("Confirm Password do not match with Password!!!");
        }
        if(name.length < 4){
            flag = false;
            $('#errname').html("Name Must be at least 3 Character Long");
        }
        if(contact.length <11 || contact.length > 15){
            flag = false;
            $("#errcontact").html("Phone Number is not Valid");
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


    $('#name').focus(function(){
        $('#errname').html("");
    });
    $('#contact').focus(function(){
        $('#errcontact').html("");
    });
    $('#address').focus(function(){
        $('#erraddress').html("");
    });
    $('#uname').focus(function(){
        $('#erruname').html("");
    });
    $('#pass').focus(function(){
        $('#errpass').html("");
    });
    $('#cpass').focus(function(){
        $('#errcpass').html("");
    });
    $('#email').focus(function(){
        $('#erremail').html("");
    });
    $('#sq').focus(function(){
        $('#errsq').html("");
    });

    var SignUp = function(){
        $.ajax({
            url:"http://localhost:55484/api/user/registration",
            method:"POST",
            header:"Content-Type:application/json",
            data:{
                user: {
                    userName: $('#uname').val(),
                    emailAddress: $('#email').val(),
                    password: $('#pass').val(),
                    userType: 2,
                    status:0,
                    image: ""
                },
                name: $('#name').val(),
                contact: $('#contact').val(),
                address: $('#address').val(),
                sequrityQue: $('#sq').val()
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==201)
                {
                    alert("Account Created Successfully now you can login");
                    window.location.href = "../Basic/login.html";
                }
                else
                {
                    var data=xmlhttp.responseJSON.modelState;
                    console.log(data);
                    $("#smsg").html("Something Went Wrong!!!");
                }
            }
        });
    };
    
});