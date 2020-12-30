<?php
    session_start();
    if(!isset($_SESSION['id'])){
        header("Location: login.php");
    }
    include ('header.php');
    include ('adminnavbar.php');
    include ('adminsidebar.php');
    require_once 'controllers/EmployeeController.php';
    $employees = getAllEmployee();
?>

<div class="donorlist">
    
    <h1 class="text-white bg-dark text-center">
    All Worker
    </h1><br>
    <div class="row">

    <div class="col-md-2">
            <div class="form-group">

                <select class="form-control" name="accountType" id="type">
                    <option value="" disabled selected>Show</option>
                    <option value="*">All</option>
                    <option value="0">Manager</option>
                    <option value="1">Driver</option>
                    <option value="2">Delivery boy</option>
                    <option value="3">Worker</option>
                </select>
            </div>
        </div>

        <div class="col-md-2">
            <div class="form-group">

                <select class="form-control" name="accountType" id="searchBy">
                <option value="" disabled selected>Search By</option>
                        <option value="Name" >Name</option>
                        <option value="ContactNo">Contact</option>
                        <option value="Address" >Address</option>
                </select>
            </div>
        </div>
        <div class="col-md-8 donor">
        <input type="text" name="" id="search_text" placeholder="Search Customers " onkeyup="search()">
        </div>
    </div><br>

            <div class="row ">


            <table class="table" id="myTable">
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Email Address</td>
                        <td>Contact No</td>
                        <td>Address</td>
                        <td>Designation</td>
                        <td>Qualification</td>
                        <td></td>
                    </tr>
                </thead> 
                <tbody id = "suggestion">
                    <div class="col-md-8">
                    <?php
                        foreach($employees as $employee){
                            echo "<tr>";
                            echo "<td>".$employee['name']."</td>";
                            echo "<td>".$employee['email']."</td>";
                            echo "<td>".$employee['phone']."</td>";
                            echo "<td>".$employee['address']."</td>";
                            if($employee['desig'] == 0){
                                echo "<td>Manager</td>";
                            }
                            else if($employee['desig'] == 1){
                                echo "<td>Worker</td>";
                            }
                            else if($employee['desig'] == 2){
                                echo "<td>Delivery Boy</td>";
                            }
                            else if($employee['desig'] == 3){
                                echo "<td>Driver</td>";
                            }
                            echo "<td>".$employee['qualification']."</td>";
                            echo '<td><a href="worker_list.php?id='.$employee["id"].'" class="btn btn-warning">View</a></td>';
                            echo "</tr>";
                        }
                    ?>
                </tbody>
            </table>
            </div>
</div>

<?php include ('footer.php');  ?>

<script>
	function get(id){
		return document.getElementById(id);
	}
	function search(){
		var text = get("search_text").value;
        var text2 = get("searchBy").value;
        var text3 = get("type").value;
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange=function(){
			if(this.readyState == 4 && this.status == 200 ){
				document.getElementById("suggestion").innerHTML = this.responseText;
			}
		};
		if(text){
			xhttp.open("GET","searchWorker.php?key="+text+"&key2="+text2+"&key3="+text3,true);
			xhttp.send();
		}
		else{
			document.getElementById("suggestion").innerHTML="";
		}
	}
</script>