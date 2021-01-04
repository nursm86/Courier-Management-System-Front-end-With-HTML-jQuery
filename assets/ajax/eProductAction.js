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

    var loadproductInfo = function(){
        $.ajax({
            url:"http://localhost:55484/api/employee/product/"+productId,
            method:"GET",
            header:"Content-Type:application/json",
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    var data=xmlhttp.responseJSON;
                    $('#sbranch').html(data.branch.branchName);
                    $('#rbranch').html(data.branch1.branchName);
                    $('#rname').html(data.recieverName);
                    $('#remail').html(data.recieverEmail);
                    $('#rphone').html(data.recieverContact);
                    $('#raddress').html(data.recieverAddress);
                    $('#rdate').html(data.updatedDate);
                    // if(data.user.status == 0){
                    //     $('#status').html("InValid");
                    //     $('#unblock').hide();
                    //     $("#block").show();
                    //     $('#verify').show();
                    // }
                    // else if(data.user.status == 1){
                    //     $('#status').html("Valid");
                    //     $('#verify').hide();
                    //     $("#block").show();
                    //     $('#unblock').hide();
                    // }
                    // else if(data.user.status == 2){
                    //     $('#status').html("Blocked");
                    //     $('#block').hide();
                    //     $('#verify').hide();
                    //     $('#unblock').show();
                    // }
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };
    loadproductInfo();

    var receiveProductFromCustomer = function(){
        $.ajax({
            url:"http://localhost:55484/api/employee/"+id+"/receiveProductFromCustomer/"+productId,
            method:"PUT",
            header:"Content-Type:application/json",
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    window.location.href = "../Employee/receive_products.html";
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };

    var receiveProductFromBranch = function(){
        $.ajax({
            url:"http://localhost:55484/api/employee/"+id+"/receiveProductFromBranch/"+productId,
            method:"PUT",
            header:"Content-Type:application/json",
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    window.location.href = "../Employee/receive_products.html";
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };

    var shipProduct = function(){
        $.ajax({
            url:"http://localhost:55484/api/employee/"+id+"/shipProduct/"+productId,
            method:"PUT",
            header:"Content-Type:application/json",
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    window.location.href = "../Employee/ship_productsList.html";
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };

    var releaseProduct = function(){
        $.ajax({
            url:"http://localhost:55484/api/employee/"+id+"/releaseProduct/"+productId,
            method:"PUT",
            header:"Content-Type:application/json",
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    window.location.href = "../Employee/release_productsList.html";
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };

    $('#rfc').click(function(){
        receiveProductFromCustomer();
    });
    $('#rfb').click(function(){
        receiveProductFromBranch();
    });
    $('#ship').click(function(){
        shipProduct();
    });
    $('#release').click(function(){
        releaseProduct();
    });
});