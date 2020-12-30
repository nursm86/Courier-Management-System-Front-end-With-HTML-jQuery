<?php
    session_start();
    if(!isset($_SESSION['id'])){
        header("Location: login.php");
    }
	require_once 'controllers/EmployeeController.php';
    $key = $_GET["key"];
    $key2 = $_GET["key2"];
    $key3 = $_GET["key3"];
	$employees = SearchWorker($key,$key2,$key3);
	
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