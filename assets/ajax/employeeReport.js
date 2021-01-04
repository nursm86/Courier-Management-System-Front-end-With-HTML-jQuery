$(document).ready(function(){
    var uname = Cookies.get('uname');
    var pass = Cookies.get('pass');
    var id = Cookies.get('id');

    var loadReportInfo = function(){
        $.ajax({
            url:"http://localhost:55484/api/employee/report/"+id,
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
                    $('#tsp').html(data.totalSentProduct);
                    $('#trp').html(data.totalReceivedProduct);
                    $('#tvu').html(data.totalVerifiedUser);
                    $('#tivu').html(data.totalInvalidUser);
                    $('#tbu').html(data.totalBlockedUser);
                    $('#tes').html(data.totalElectronisSent);
                    $('#tms').html(data.totalMobilesSent);
                    $('#tas').html(data.totalAccessoriesSent);
                    $('#tps').html(data.totalPapersSent);
                    $('#tpks').html(data.totalPackagesSent);
                    
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };
    loadReportInfo();

    $("body").on("click", "#download", function () {
        html2canvas($('#content')[0], {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500
                    }]
                };
                pdfMake.createPdf(docDefinition).download("Employee-report.pdf");
            }
        });
    });
});