<?php
    session_start();
    if(!isset($_SESSION['id'])){
        header("Location: login.php");
    }
    include ('header.php');
    include ('adminnavbar.php');
    include ('adminsidebar.php');
    require_once 'controllers/BranchController.php';
    $branches = getAllBranch();

?>

<div class="donorlist">
    
    <h1 class="text-white bg-dark text-center">
    All Branches
    </h1><br>
    <div class="row">
        <div class="col-md-2">
            <div class="form-group">

                <select class="form-control" name="accountType" id="searchBy">
                <option value="" disabled selected>Search By</option>
                        <option value="Branch_Name" >Name</option>
                        <option value="Address" >Address</option>
                </select>
            </div>
        </div>
        <div class="col-md-8 donor">
        <input type="text" name="" id="search_text" placeholder="Search Branchhes" onkeyup="search()">
        </div>
    </div><br>

            <div class="row ">

            <table class="table" id="myTable">
                <thead>
                    <tr>
                        <td>Branch Name</td>
                        <td>Address</td>
                        <td>Updated Date</td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead> 
                <tbody id = "suggestion">
                    <div class="col-md-8" id="content">
                    <?php
                        foreach($branches as $branch){
                            echo "<tr>";
                            echo "<td>".$branch['Branch_Name']."</td>";
                            echo "<td>".$branch['Address']."</td>";
                            echo "<td>".$branch['UpdatedDate']."</td>";
                            echo '<td><a href="allBranch.php?id='.$branch["Id"].'" class="btn btn-warning">View</a></td>';
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
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange=function(){
			if(this.readyState == 4 && this.status == 200 ){
				document.getElementById("suggestion").innerHTML = this.responseText;
			}
		};
		if(text){
			xhttp.open("GET","searchBranch.php?key="+text+"&key2="+text2,true);
			xhttp.send();
		}
		else{
			document.getElementById("suggestion").innerHTML="";
		}
	}
</script>