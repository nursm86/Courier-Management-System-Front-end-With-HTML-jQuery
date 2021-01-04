$(document).ready(function(){
    var uname = Cookies.get('uname');
    var pass = Cookies.get('pass');
    var id = Cookies.get('id');

    var loadReportInfo = function(){
        $.ajax({
            url:"http://localhost:55484/api/customer/report/"+id,
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
                    $('#tfd').html(data.totalFinishedDelivery);
                    $('#tpd').html(data.totalPendingDelivery);
                    $('#tes').html(data.totalElectronisSent);
                    $('#tms').html(data.totalMobilesSent);
                    $('#tas').html(data.totalAccessoriesSent);
                    $('#tps').html(data.totalPapersSent);
                    $('#tpks').html(data.totalPackagesSent);
                    $('#tsm').html(data.totalSpentMoney);
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