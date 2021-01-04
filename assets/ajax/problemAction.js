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
        Cookies.set("errmsg","You are not an Admin so you are not allowed there");
        window.location.href = "../Basic/login.html";
    }

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
    var ProblemsId= unescape(params.id);

    var loadProblemsInfo = function(){
        $.ajax({
            url:"http://localhost:55484/api/admin/Problem/"+ProblemsId,
            method:"GET",
            header:"Content-Type:application/json",
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    var data=xmlhttp.responseJSON;
                    $('#uname').html(data.user.userName);
                    $('#branch').html(data.branch.branchName);
                    $('#date').html(data.updatedDate);
                    $('#problem').html(data.problem);
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };
    loadProblemsInfo();

    var solve = function(){
        $.ajax({
            url:"http://localhost:55484/api/admin/solveProblem/"+ProblemsId,
            method:"DELETE",
            header:"Content-Type:application/json",
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==204)
                {
                    window.location.href = "../Admin/solve_problem.html";
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };

    $('#solve').click(function(){
        solve();
    });
    $('#delete').click(function(){
        solve();
    });
});