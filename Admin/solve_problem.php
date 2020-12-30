<?php
    session_start();
    if(!isset($_SESSION['id'])){
        header("Location: login.php");
    }
    include ('header.php');
    include ('adminnavbar.php');
    include ('adminsidebar.php');
    require_once 'controllers/EmployeeController.php';
    $problems = getAllProblems();
?>

<div class="donorlist">
    
    <h1 class="text-white bg-dark text-center">
    Worker's Problem
    </h1><br>
            <div class="row ">

            <table class="table" id="myTable">
                <thead>
                    <tr>
                        <td>Employee Name</td>
                        <td>Branch</td>
                        <td>Subject</td>
                        <td>Problem</td>
                        <td>Updated Date</td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead> 
                <tbody>
                    <div class="col-md-8">
                    <?php
                        foreach($problems as $problem){
                            echo "<tr>";
                            echo "<td>".$problem['name']."</td>";
                            echo "<td>".$problem['bname']."</td>";
                            echo "<td>".$problem['subject']."</td>";
                            echo "<td>".$problem['problem']."</td>";
                            echo "<td>".$problem['date']."</td>";
                            echo '<td><a href="solveProblem.php?id='.$problem["id"].'" class="btn btn-warning">View</a></td>';
                            echo "</tr>";
                        }
                    ?>
                </tbody>
            </table>
            </div>
</div>

<?php include ('footer.php');  ?>