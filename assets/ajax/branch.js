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
    var loadBranchInfo = function(){
        $.ajax({
            url:"http://localhost:55484/api/admin/BranchList",
            method:"GET",
            header:"Content-Type:application/json",
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    var data=xmlhttp.responseJSON;
                    var str ="";
                    str +='<div class="col-md-8">';
                    $.each(data,function(index,value){
                        str += '<tr>';
                        str += '<td>'+value.branchName+'</td>';
                        str += "<td>"+value.address+"</td>";
                        str += "<td>"+value.updatedDate+"</td>";
                        str += '<td><a href = "../admin/view_branch.html?id='+value.id+'" class="btn btn-warning">View</a></td>';
                        str += "</tr>";
                        
                    });
                    $('#branch').html(str);
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };
    loadBranchInfo();

    var AddBranch = function(){
        $.ajax({
            url:"http://localhost:55484/api/admin/addBranch",
            method:"POST",
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

    $('#addnewbranch').click(function(){
        if(validateBranch()){
            AddBranch();
        }
    });
});