<?php
    
    include ('header.php');
    include ('adminnavbar.php');
    require_once 'controllers/BranchController.php';

    if(!isset($_SESSION['id'])){
        header("Location: login.php");
    }

    $id = $_GET['id'];
    $branch = getBranchbyId($id);

    if(isset($_POST['cancel'])){
        header("Location: all_branch.php");
    }
    if(isset($_POST['update'])){
        $id = $_GET['id'];
        $bname = "";
        $address = "";
        $err_bname = "";
        $err_address = "";
        $has_error = false;

            if(empty($_POST["B_name"]))
            {
                $err_bname = "BranchName Required <br>";
                $has_error=true;
            }else{
                $bname=$_POST["B_name"];
            }
            if(empty($_POST["B_address"]))
            {
                $err_address= "Address Required <br>";
                $has_error=true;
            }else{
                $address=$_POST["B_address"];
            }
            if(!$has_error){
                $sql = "UPDATE `branch` SET `Branch_Name`='$bname',`Address`='$address',`UpdatedDate`='$date' WHERE Id = $id";
                execute($sql);
                header("Location: all_branch.php");
            }
        
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
					<label>Branch Name:</label>
					<input type="text" class="form-control" name="B_name"value="<?php echo $branch[0]['Branch_Name'];?>">
				</div>
				<div class="form-group">
					<label>Address:</label>
					<input type="text" class="form-control" name="B_address"value="<?php echo $branch[0]['Address'];?>">
				</div>
				<div class="form-group">
					<label class="text-white bg-dark text-center">Update Branch?</label>
				</div>
				<div class="form-group">
                    <input type="submit" class="btn btn-warning" value="Cancel" name="cancel" id="">
                    <input type="submit" class="btn btn-success" value="Update" name="update" id="">
				</div>
		    </form>
</div>
</div>

<?php include ('footer.php');?>