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

    var loadProductInfo = function(){
        $.ajax({
            url:"http://localhost:55484/api/employee/"+id+"/releaseAbleProducts",
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
                        str += '<td>'+value.branch.branchName+'</td>';
                        str += "<td>"+value.branch1.branchName+"</td>";
                        str += "<td>"+value.updatedDate+"</td>";
                        str += "<td>"+value.recieverName+"</td>";
                        str += "<td>"+value.recieverAddress+"</td>";
                        str += "<td>"+value.recieverContact+"</td>";
                        str += '<td><a href = "../Employee/releaseProductView.html?id='+value.id+'" class="btn btn-warning">View</a></td>';
                        str += "</tr>";
                        
                    });
                    $('#release').html(str);
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };
    loadProductInfo();
    
});