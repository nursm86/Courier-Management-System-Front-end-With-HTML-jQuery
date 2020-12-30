<?php
    include ('header.php');
    include ('adminnavbar.php');
    require_once 'controllers/EmployeeController.php';
    $id = $_GET['id'];
    $employee = getEmployee($id);
    $allBranch = getAllBranch();
    $name ="";
    $salary = "";
    $bonus = "";
    $designation = "";
    $bid = "";
    
    $err_name = "";
    $err_salary = "";
    $err_bonus = "";
    $err_designation = "";
    $err_bid = "";
    $has_error=false;

    if(isset($_POST['cancel'])){
        header("Location: workerlist.php");
    }
    if(isset($_POST['updated'])){
        
        $name = $_POST['name'];
        $designation=$_POST["desig"]; 
        
        $bid=$_POST["bid"];

		if(empty($_POST["salary"]))
		{
			$err_salary= "Salary is Required <br>";
			$has_error=true;
		}else{
            $salary=$_POST["salary"];
        }
        if(empty($_POST["bonus"]))
		{
			$err_bonus= "Bonus is Required <br>";
			$has_error=true;
		}else{
            $bonus=$_POST["bonus"];
		}

			$sql = "UPDATE `employee` SET `Name`='$name',`Salary`='$salary',`Bonus`='$bonus',`Designation`=$designation,`Branch_id`=$bid WHERE userId = $id";
            execute($sql);
            header("Location: workerlist.php");
    }
    include ('adminsidebar.php');
?>

<div class="d-flex justify-content-center align-items-center container ">
<div class="col-md-8 box">
            <h1 class="text-white bg-dark text-center">
                Branch's Information
            </h1>
        <form action="" method="post">
        <div class="form-group">
					<label>Name:</label>
					<input type="text" class="form-control" name="name" value="<?php echo $employee[0]['name'];?>" required>
                    <span style="color:red;"><?php echo $err_name;?></span>
				</div>
                <div class="form-group" >
                    <label>Designation:</label>
                        <select style="border-radius: 5px;" class="form-control" name ="desig">
                            <option selected hidden>Select a Designation</option>
                            <option value="0">Manager</option>
                            <option value="1">Worker</option>
                            <option value="2">Delivery Boy</option>
                            <option value="3">Driver</option>
                        </select>
                        <span style="color:red;"><?php echo $err_designation;?></span>

                </div>
                <div class="form-group">
                    <label>Branch:</label>
                    
                    <select class="form-control" name = "bid">
                            <option selected hidden>Select Branch</option>
                            <?php
                                foreach($allBranch as $branch){
                                    echo "<option value = '".$branch['Id']."'>".$branch["Branch_Name"]."</option>";
                                }
                            ?>
                        </select><br>
                        <span style="color:red;"><?php echo $err_bid;?></span>
                </div>
                <div class="form-group">
					<label>Salary:</label>
					<input type="text" class="form-control" name="salary"value="<?php echo $employee[0]['salary'];?>" required>
                    <span style="color:red;"><?php echo $err_salary;?></span>
				</div>
				<div class="form-group">
					<label>Bonus:</label>
					<input type="text" class="form-control" name="bonus" value="<?php echo $employee[0]['bonus'];?>" required>
                    <span style="color:red;"><?php echo $err_email;?></span>
				</div>
				<div class="form-group">
					<label class="text-white bg-dark text-center">Update Branch?</label>
				</div>
				<div class="form-group">
                    <input type="submit" class="btn btn-warning" value="Cancel" name="cancel" id="">
                    <input type="submit" class="btn btn-success" value="Update" name="updated" id="">
				</div>
		    </form>
</div>
</div>

<?php include ('footer.php');?>