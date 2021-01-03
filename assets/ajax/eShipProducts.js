$(document).ready(function(){
    var uname = Cookies.get('uname');
    var pass = Cookies.get('pass');
    var id = Cookies.get('id');

    var loadProductInfo = function(){
        $.ajax({
            url:"http://localhost:55484/api/employee/"+id+"/shipableProducts",
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
                        str += '<td><a href = "../Employee/shipProductView.html?id='+value.id+'" class="btn btn-warning">View</a></td>';
                        str += "</tr>";
                        
                    });
                    $('#ship').html(str);
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