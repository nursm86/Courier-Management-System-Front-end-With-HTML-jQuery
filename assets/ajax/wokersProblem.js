$(document).ready(function(){
    var uname = Cookies.get('uname');
    var pass = Cookies.get('pass');
    var id = Cookies.get('id');

    var loadProblemsInfo = function(){
        $.ajax({
            url:"http://localhost:55484/api/admin/employeeProblems",
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
                        str += '<td>'+value.user.userName+'</td>';
                        str += "<td>"+value.branch.branchName+"</td>";
                        str += "<td>"+value.problem+"</td>";
                        str += "<td>"+value.updatedDate+"</td>";
                        str += '<td><a href = "../admin/view_problem.html?id='+value.id+'" class="btn btn-warning">View Problem</a> | <a href = "../admin/view_worker.html?id='+value.user.id+'" class="btn btn-success" target="new">View User</a></td>';
                        str += "</tr>";
                        
                    });
                    $('#problems').html(str);
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };
    loadProblemsInfo();
});