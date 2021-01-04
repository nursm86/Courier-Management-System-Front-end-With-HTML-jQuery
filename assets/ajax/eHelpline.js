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

    var submitProblem = function(){
        $.ajax({
            url:"http://localhost:55484/api/employee/"+id+"/helpline",
            method:"POST",
            header:"Content-Type:application/json",
            data:{
                Problem : $('#problem').val()
            },
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    alert("Admin Has been notified.You will get solution soon.");
                    window.location.href = "../Employee/employee_home.html";
                }
                else
                {
                    console.log(xmlhttp.responseJSON.modelState);
                    alert("Something Went Wrong!!!");
                    $("#smsg").html("Something Went Wrong!!!");
                }
            }
        });
    };

    $('#problem').focus(function(){
        $('#errproblem').html("");
    });

    var validateProblem = function(){
        var problem = $('#problem').val();
        var flag = true;

        if(problem == ""){
            flag = false;
            $('#errproblem').html("Problem Required");
        }
        return flag;
    };

    $('#submitProblem').click(function(){
        if(validateProblem()){
            submitProblem();
        }
    });
});