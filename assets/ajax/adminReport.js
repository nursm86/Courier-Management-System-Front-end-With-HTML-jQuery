$(document).ready(function(){
    var uname = Cookies.get('uname');
    var pass = Cookies.get('pass');
    var id = Cookies.get('id');

    var loadReportInfo = function(){
        $.ajax({
            url:"http://localhost:55484/api/admin/report/"+id,
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
                    $('#tm').html(data.totalManager);
                    $('#td').html(data.totalDriver);
                    $('#tdb').html(data.totalDeliveryBoy);

                    $('#hpm').html(data.highestPaidManager);
                    $('#salary').html(data.highestPay);
                    $('#tb').html(data.totalBranch);
                    
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };
    loadReportInfo();
});