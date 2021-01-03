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
                        window.location.href = "../Employee/employee_home.html";
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
        SignUp();
    });
    
    var SignUp = function(){
        var uname =$('#uname').val();
        var emailAddress = $('#email').val();
        var ud = Date($.now());
        var password =  $('#pass').val();
        var image = "";
        var name= $('#name').val();
        var contact= $('#contact').val();
        var address= $('#address').val();
        var sequrityQue= $('#sq').val();
        var updatedDate= Date($.now());
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