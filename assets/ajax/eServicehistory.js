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
    // var productId= unescape(params.id);

    var loadProductInfo = function(){
        $.ajax({
            url:"http://localhost:55484/api/employee/"+id+"/servicehistory",
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
                    var str1 ="";
                    str +='<div class="col-md-8">';
                    str1 +=str;
                    $.each(data,function(index,value){
                        if(value.sending_Manager_id == id){
                            str += '<tr>';
                            str += '<td>'+value.branch.branchName+'</td>';
                            str += "<td>"+value.branch1.branchName+"</td>";
                            str += "<td>"+value.updatedDate+"</td>";
                            str += "<td>"+value.recieverName+"</td>";
                            str += "<td>"+value.recieverAddress+"</td>";
                            str += "<td>"+value.release_Date+"</td>";
                            str += "</tr>";
                        }
                        else{
                            str1 += '<tr>';
                            str1 += '<td>'+value.branch.branchName+'</td>';
                            str1 += "<td>"+value.branch1.branchName+"</td>";
                            str1 += "<td>"+value.updatedDate+"</td>";
                            str1 += "<td>"+value.recieverName+"</td>";
                            str1 += "<td>"+value.recieverAddress+"</td>";
                            str1 += "<td>"+value.release_Date+"</td>";
                            str1 += "</tr>";
                        }
                        
                    });
                    $('#service').html(str);
                    $('#service1').html(str1);
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