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
    // var customerId= unescape(params.id);

    var loadCustomersInfo = function(){
        $.ajax({
            url:"http://localhost:55484/api/employee/CustomersList",
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
                        str += '<td>'+value.name+'</td>';
                        str += "<td>"+value.user.emailAddress+"</td>";
                        str += "<td>"+value.contact+"</td>";
                        str += "<td>"+value.address+"</td>";
                        if(value.user.status == 0){
                            str +="<td>InValid</td>";
                        }
                        else if(value.user.status == 1){
                            str +="<td>Verified</td>";
                        }
                        else{
                            str +="<td>Blocked</td>";
                        }
                        str += '<td><a href = "../Employee/viewCustomer.html?id='+value.userId+'" class="btn btn-warning">View</a></td>';
                        str += "</tr>";
                    });
                    $('#customers').html(str);
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };
    loadCustomersInfo();
    
});