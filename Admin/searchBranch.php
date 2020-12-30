<?php
    session_start();
    if(!isset($_SESSION['id'])){
        header("Location: login.php");
    }
	require_once 'controllers/ProductController.php';
    $key = $_GET["key"];
    $key2 = $_GET["key2"];
	$branches = searchBranches($key,$key2);
	
	foreach($branches as $branch){
        echo "<tr>";
        echo "<td>".$branch['Branch_Name']."</td>";
        echo "<td>".$branch['Address']."</td>";
        echo "<td>".$branch['UpdatedDate']."</td>";
        echo '<td><a href="allBranch.php?id='.$branch["Id"].'" class="btn btn-warning">View</a></td>';
        echo "</tr>";
    }
	
?>