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
    var productId= unescape(params.id);

    var loadProductInfo = function(){
        $.ajax({
            url:"http://localhost:55484/api/customer/"+id+"/trackproducts",
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
                        if(value.product_State == 0 || value.product_State == 1){
                            str += '<tr>';
                            str += '<td>'+value.branch.branchName+'</td>';
                            str += "<td>"+value.branch1.branchName+"</td>";
                            str += "<td>"+value.updatedDate+"</td>";
                            str += "<td>"+value.recieverName+"</td>";
                            str += "<td>"+value.recieverAddress+"</td>";
                            if(value.product_State == 0){
                                str += "<td>Not yet Received at the Branch</td>";
                            }
                            else{
                                str += "<td>Ready for Shipping</td>";
                            }
                            str += '<td><a href="canceldelivery.html?id='+value.id+'" class="btn btn-danger">Cancel</a></td>';
                            str += "</tr>";
                        }
                        else{
                            str1 += '<tr>';
                            str1 += '<td>'+value.branch.branchName+'</td>';
                            str1 += "<td>"+value.branch1.branchName+"</td>";
                            str1 += "<td>"+value.updatedDate+"</td>";
                            str1 += "<td>"+value.recieverName+"</td>";
                            str1 += "<td>"+value.recieverAddress+"</td>";
                            if(value.product_State == 2){
                                str1 += "<td>Product is on the way now</td>";
                            }
                            else{
                                str1 += "<td>Product is ready to recived</td>";
                            }
                            str1 += "</tr>";
                        }
                        
                    });
                    $('#track').html(str);
                    $('#track1').html(str1);
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };
    loadProductInfo();

    var cancelProduct = function(){
        $.ajax({
            url:"http://localhost:55484/api/customer/cancelProduct/"+productId,
            method:"DELETE",
            header:"Content-Type:application/json",
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==204)
                {
                    alert("Product Delivery Cancelled!!!");
                    window.location.href = "../Customer/track_products.html";
                }
                else
                {
                   alert("Something Went Wrong!!!");
                }
            }
        });
    };

    $('#yes').click(function(){
        cancelProduct();
    });
});