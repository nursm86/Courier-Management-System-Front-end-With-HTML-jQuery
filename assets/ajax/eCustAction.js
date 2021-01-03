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
    var customerId= unescape(params.id);

    var loadCustomerInfo = function(){
        $.ajax({
            url:"http://localhost:55484/api/employee/Customer/"+customerId,
            method:"GET",
            header:"Content-Type:application/json",
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    var data=xmlhttp.responseJSON;
                    $('#name').html(data.name);
                    $('#email').html(data.user.emailAddress);
                    $('#phone').html(data.contact);
                    $('#address').html(data.address);
                    if(data.user.status == 0){
                        $('#status').html("InValid");
                        $('#unblock').hide();
                        $("#block").show();
                        $('#verify').show();
                    }
                    else if(data.user.status == 1){
                        $('#status').html("Valid");
                        $('#verify').hide();
                        $("#block").show();
                        $('#unblock').hide();
                    }
                    else if(data.user.status == 2){
                        $('#status').html("Blocked");
                        $('#block').hide();
                        $('#verify').hide();
                        $('#unblock').show();
                    }
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };
    loadCustomerInfo();

    var block = function(){
        $.ajax({
            url:"http://localhost:55484/api/employee/Customer/"+customerId+"/block",
            method:"PUT",
            header:"Content-Type:application/json",
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    loadCustomerInfo();
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };

    var unblock = function(){
        $.ajax({
            url:"http://localhost:55484/api/employee/Customer/"+customerId+"/unblock",
            method:"PUT",
            header:"Content-Type:application/json",
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    loadCustomerInfo();
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };

    var verify = function(){
        $.ajax({
            url:"http://localhost:55484/api/employee/Customer/"+customerId+"/verify",
            method:"PUT",
            header:"Content-Type:application/json",
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    loadCustomerInfo();
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };

    $('#block').click(function(){
        block();
    });
    $('#unblock').click(function(){
        unblock();
    });
    $('#verify').click(function(){
        verify();
    });
});