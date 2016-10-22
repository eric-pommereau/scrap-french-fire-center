<?php
    $dbname = 'osm';
    $dbname = 'localhost';
    $dbuser = 'ericpommereau';
    $dbpass = '2969mael';
    
    $dbh = new PDO("pgsql:dbname=$dbname;host=$host", $dbuser, $dbpass); 
    
    foreach($dbh->query('select * from centres_secours_bd_topo') as $row) {
        var_dump($row);
    }
    