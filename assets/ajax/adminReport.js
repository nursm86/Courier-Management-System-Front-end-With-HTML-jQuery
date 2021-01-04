$(document).ready(function(){
    var uname = Cookies.get('uname');
    var pass = Cookies.get('pass');
    var id = Cookies.get('id');
    var type = Cookies.get('utype');

    if(uname == ""){
        Cookies.set("errmsg","Please Login First!!!");
        window.location.href = "../Basic/login.html";
    }
    else if(type != 0){
        Cookies.set("errmsg","You are not a Admin so you are not allowed there");
        window.location.href = "../Basic/login.html";
    }

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
                pdfMake.createPdf(docDefinition).download("admins-report.pdf");
            }
        });
    });
});