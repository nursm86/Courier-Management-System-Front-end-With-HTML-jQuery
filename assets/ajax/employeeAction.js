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
        Cookies.set("errmsg","You are not an Admin so you are not allowed there");
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
    var EId= unescape(params.id);

    var removeEmployee = function(){
        $.ajax({
            url:"http://localhost:55484/api/admin/removeEmploye/"+EId,
            method:"DELETE",
            header:"Content-Type:application/json",
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==204)
                {
                    window.location.href = "../Admin/workerlist.html";
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };

    $('#delete').click(function(){
        removeEmployee();
    });

    var updateEmployeeInfo = function(){
        $.ajax({
            url:"http://localhost:55484/api/admin/employee/"+EId,
            method:"PUT",
            header:"Content-Type:application/json",
            data:{
                name: $('#name').val(),
                designation: $('#desig').val(),
                branch_id: $('#bid').val(),
                salary :$("#salary").val(),
                bonus : $("#bonus").val()
            },
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    window.location.href = "../Admin/workerlist.html";
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
        var designation = $('#desig').val();
        var salary = $("#salary").val();
        var bonus = $("#bonus").val();
        var flag = true;
        if(name.length <4){
            flag = false;
            $('#errname').html("Name Must be at least 3 Character Long");
        }
        if(designation == ""){
            flag = false;
            $("#errdesig").html("Designation is required");
        }
        if(salary == ""){
            flag = false;
            $('#errsalary').html("Salary is required");
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
    $('#salary').focus(function(){
        $('#errsalary').html("");
    });
    $('#bonus').focus(function(){
        $('#errbonus').html("");
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
                    $.each(data,function(index,value){
                        str += "<option value = '"+value.id+"'>"+value.branchName+"</option>";
                    });
                    $('#bid').html(str);
                }
                else
                {
                    alert("some thing went wrong");
                }
            }
        });
    };

    loadBranch();

    var loadCustomerInfo = function(){
        $.ajax({
            url:"http://localhost:55484/api/admin/employee/"+EId,
            method:"GET",
            header:"Content-Type:application/json",
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    var data=xmlhttp.responseJSON;
                    $('#name').val(data.name);
                    $('#desig option[value="'+data.designation+'"]').attr("selected", "selected");
                    $('#bid option[value="'+data.branch_id+'"]').attr("selected", "selected");
                    $('#salary').val(data.salary);
                    $('#bonus').val(data.bonus);
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };
    loadCustomerInfo();
});