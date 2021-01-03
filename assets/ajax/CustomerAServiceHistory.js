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

    var loadHistoryInfo = function(){
        $.ajax({
            url:"http://localhost:55484/api/customer/"+id+"/ServiceHistory",
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
                        str += "<td>Received by the Receiver</td>";
                        str += "</tr>";
                        
                    });
                    $('#service').html(str);
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };
    loadHistoryInfo();
});