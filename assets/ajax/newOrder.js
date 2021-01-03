$(document).ready(function(){
    var uname = Cookies.get('uname');
    var pass = Cookies.get('pass');
    var id = Cookies.get('id');

    $("#addOrder").click(function(){
        addOrder();
    });

    var loadBranch = function(){
        $.ajax({
            url:"http://localhost:55484/api/customer/branches",
            method:"GET",
            header:"Content-Type:application/json",
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    var data=xmlhttp.responseJSON;
                    var str = "";
                    var str1 = "";
                    str += '<option id="devlivery"selected hidden>Select Sending Branch</option>';
                    str1 += '<option id="delivery1"selected hidden>Select Receiving Branch</option>';
                    $.each(data,function(index,value){
                        str += "<option value = '"+value.id+"'>"+value.branchName+"</option>";
                        str1 += "<option value = '"+value.id+"'>"+value.branchName+"</option>";  
                    });
                    $('#sbid').html(str);
                    $('#rbid').html(str1);
                }
                else
                {
                    alert("some thing went wrong");
                    $("#smsg").html("Something Went Wrong!!!");
                }
            }
        });
    };

    loadBranch();

    $('#sbid').change(function(){
        $('#rbid').find('[value="'+$('#sbid').val()+'"]').remove();
    });
    var addOrder = function(){
        $.ajax({
            url:"http://localhost:55484/api/customer/"+id+"/NewOrder",
            method:"POST",
            header:"Content-Type:application/json",
            data:{
                productType: $('#category').val(),
                customer_id: id,
                receiving_B_id: $("#rbid").val(),
                sending_B_id: $("#sbid").val(),
                delivery_charge: 100.0,
                productCategory: $('#category').val(),
                paymentMethod: $("#pmethod").val(),
                recieverName: $("#rname").val(),
                recieverEmail: $("#email").val(),
                recieverContact: $("#rcontact").val(),
                recieverAddress: $("#raddress").val(),
                description: $('#description').val(),
                product_State : 0,
                release_Date: ""
            },
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==201)
                {
                    window.location.href = "../Customer/track_products.html";
                }
                else
                {
                    console.log(xmlhttp.responseJSON.modelState);
                    alert("Something Went Wrong!!!");
                    $("#smsg").html("Something Went Wrong!!!");
                }
            }
        });
    };

    $('#rname').focus(function(){
        $('#errname').html("");
    });
    $('#rcontact').focus(function(){
        $('#errcontact').html("");
    });
    $('#raddress').focus(function(){
        $('#erraddress').html("");
    });
    $('#email').focus(function(){
        $('#erremail').html("");
    });
    $('#description').focus(function(){
        $('#errdescription').html("");
    });

    var validateOrder = function(){
        var recieverName= $("#rname").val();
        var recieverEmail= $("#email").val();
        var recieverContact= $("#rcontact").val();
        var recieverAddress= $("#raddress").val();
        var description= $('#description').val();
        var flag = true;

        if(recieverName == ""){
            flag = false;
            $('#errname').html("Name Required");
        }
        if(recieverEmail == ""){
            flag = false;
            $('#erremail').html("Email Required");
        }
        if(recieverContact.length < 11 || recieverContact.length > 15){
            flag = false;
            $('#errcontact').html("Contact No is not Valid");
        }
        if(recieverAddress.length < 3){
            flag = false;
            $('#erraddress').html("Address must be at least 3 character long!!!");
        }
        if(description.length < 5){
            flag = false;
            $('#errdescription').html("Description must be at least 5 character long!!!");
        }

        return flag;
    };

    $('#confirm').click(function(){
        if(validateOrder()){
            addOrder();
        }
    });
});