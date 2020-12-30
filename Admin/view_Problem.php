<?php
    include ('header.php');
    include ('adminnavbar.php');
    require_once 'models/db_connect.php';
    if(isset($_POST['yes'])){
        $id = $_GET['id'];
        $sql = "DELETE FROM `product` WHERE Id= $id";
        execute("$sql");
        header("Location: solve_problem.php");
    }
    include ('adminsidebar.php');
?>
<div class="patientprofile">
    <div class="d-flex justify-content-center align-items-center container ">
        <div class="col-md-8 donor">
            <h1 class="text-white bg-dark text-center">
                Cancelling products
            </h1>
		<form action="" method="post">
				<div class="form-group">
					<label>Are you sure you want to Cancel the Delivery??:</label>
				</div>
				<div class="form-group">
                    <input type="submit" class="btn btn-danger" value="Cancel" name="cancel" id="">
                    <td><input type="submit" class="btn btn-warning" value="yes" name="yes" id="">
				</div>
		</form>
		</div>
    </div>
</div>
</div>
