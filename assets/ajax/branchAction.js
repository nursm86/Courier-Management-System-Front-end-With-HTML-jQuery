$(document).ready(function(){
    var uname = Cookies.get('uname');
    var pass = Cookies.get('pass');
    var id = Cookies.get('id');

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
    var bid = unescape(params.id);
    
    var loadBranchInfo = function(){
        $.ajax({
            url:"http://localhost:55484/api/admin/Branch/"+bid,
            method:"GET",
            header:"Content-Type:application/json",
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    var data=xmlhttp.responseJSON;
                    $('#bName').val(data.branchName);
                    $("#bAddress").val(data.address);
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };
    loadBranchInfo();

    var updateBranch = function(){
        $.ajax({
            url:"http://localhost:55484/api/admin/Branch/"+bid,
            method:"PUT",
            header:"Content-Type:application/json",
            data:{
                branchName : $('#bName').val(),
                address : $('#bAddress').val()
            },
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    window.location.href = "../Admin/all_branch.html";
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
    
    $('#bName').focus(function(){
        $('#errname').html("");
    });
    
    $('#bAddress').focus(function(){
        $('#erraddress').html("");
    });
    
    var validateBranch = function(){
        var bName = $('#bName').val();
        var address = $('#bAddress').val();
        var flag = true;
        if(address.length < 6){
            flag = false;
            $('#erraddress').html("Address Must be at least 5 character long!!!");
        }
        if(bName.length < 4){
            flag = false;
            $('#errname').html("Branch Name must be at least 3 character long!!!");
        }
        if(address == ""){
            flag = false;
            $('#erraddress').html("Address is Required");
        }
        if(bName == ""){
            flag = false;
            $('#errname').html("Branch Name Required");
        }
        return flag;
    };
    
    $('#update').click(function(){
        if(validateBranch()){
            updateBranch();
        }
    });
});