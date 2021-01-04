$(document).ready(function(){
    var uname = Cookies.get('uname');
    var pass = Cookies.get('pass');
    var id = Cookies.get('id');
    var type = Cookies.get('utype');

    if(uname == ""){
        Cookies.set("errmsg","Please Login First!!!");
        window.location.href = "../Basic/login.html";
    }
    else if(type != 2){
        Cookies.set("errmsg","You are not a Customeer so you are not allowed there");
        window.location.href = "../Basic/login.html";
    }

    var loadBranch = function(){
        $.ajax({
            url:"http://localhost:55484/api/customer/branches",
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
                    var str1 = "";
                    str += '<option id="helpline" selected hidden>Select Branch</option>';
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

    var fillPhone = function(){
        var bid = $('#bid').val();
        $.ajax({
            url:"http://localhost:55484/api/employee/"+bid+"/phone",
            method:"GET",
            header:"Content-Type:application/json",
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    $('#phone').val(xmlhttp.responseJSON);
                    $('#msg').html("");
                }
                else
                {
                    $('#phone').val("");
                    $('#msg').html("Sorry We do not have any Manager on that Branch yet!!Please select another branch for your query");
                }
            }
        });
    };

    $('#bid').change(function(){
        fillPhone();
    });
});