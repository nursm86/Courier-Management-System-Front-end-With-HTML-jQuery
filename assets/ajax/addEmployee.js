$(document).ready(function(){
    var uname = Cookies.get('uname');
    var pass = Cookies.get('pass');
    var id = Cookies.get('id');
    var type = Cookies.get('utype');

    if(uname == ""){
        Cookies.set("errmsg","Please Login First!!!");
        window.location.href = "../Basic/login.html";
    }
    else if(type != 0){
        Cookies.set("errmsg","You are not a Admin so you are not allowed there");
        window.location.href = "../Basic/login.html";
    }

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
    // var EId= unescape(params.id);

    var AddNewEmployee = function(){
        $.ajax({
            url:"http://localhost:55484/api/admin/addEmployee",
            method:"POST",
            header:"Content-Type:application/json",
            data:{
                user: {
                    userName: $('#uname').val(),
                    emailAddress: $('#email').val(),
                    password: $('#pass').val(),
                    userType: 1,
                    status: 0,
                    image: null
                },
                name: "dummy",
                dob: "",
                salary: $("#salary").val(),
                bonus: 0.0,
                contact: "",
                address: "",
                designation: $('#desig').val(),
                branch_id: $('#bid').val(),
                blood_Group: "",
                qualification: ""
            },
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    alert("new Worker added Successfully");
                    window.location.href = "../Admin/workerlist.html";
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
        var uname = $('#uname').val();
        var designation = $('#desig').val();
        var bid = $('#bid').val();
        var salary = $("#salary").val();
        var email = $('#email').val();
        var pass = $('#pass').val();
        var flag = true;
        if(uname.length <4){
            flag = false;
            $('#erruname').html("User Name Must be at least 3 Character Long");
        }
        if(designation == ""){
            flag = false;
            $("#errdesig").html("Designation is required");
        }
        if(salary == ""){
            flag = false;
            $('#errsalary').html("Salary is required");
        }
        if(bid == ""){
            flag = false;
            $('#errbid').html("Please Select a Branch!!!");
        }
        if(email == ""){
            flag = false;
            $('#erremail').html("Email Required");
        }
        if(pass.length < 4){
            flag = false;
            $('#errpass').html("password must be atleast 4 character long!!!");
        }
        if(salary == ""){
            flag = false;
            $('#errsalary').html("Salary Required");
        }
        return flag;
    };

    $("#AddNewEmployee").click(function(){
       if(EmployeeValidate()){
        if($("#erruname").html() !=""){
            alert("please choose another username");
            $('#uname').focus();
        }
        else{
            AddNewEmployee();
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

    $('#uname').focus(function(){
        $('#erruname').html("");
    });
    $('#salary').focus(function(){
        $('#errsalary').html("");
    });
    $('#pass').focus(function(){
        $('#errpass').html("");
    });
    $('#email').focus(function(){
        $('#erremail').html("");
    });
    $('#desig').focus(function(){
        $('#errdesig').html("");
    });
    $('#bid').focus(function(){
        $('#errbid').html("");
    });
    

    var loadBranch = function(){
        $.ajax({
            url:"http://localhost:55484/api/admin/branchlist",
            method:"GET",
            header:"Content-Type:application/json",
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    var data=xmlhttp.responseJSON;
                    var str = "";
                    str ="<option selected hidden value =''>Select a Branch</option>";
                    $.each(data,function(index,value){
                        str += "<option value = '"+value.id+"'>"+value.branchName+"</option>";
                    });
                    $('#bid').html(str);
                }
                else
                {
                    alert("some thing went wrong");
                    $("#smsg").html("Something Went Wrong!!!");
                }
            }
        });
    };

    loadBranch();
});