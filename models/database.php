<?php
// $dsn = "mysql:host=localhost;dbname=u342622146_nf";
$dsn = "mysql:host=localhost;dbname=mesosubs";
try {
    // $db = new PDO($dsn, 'u342622146_tn96', 'swizzlex23');
    $db = new PDO($dsn, 'root', '');
} catch (PDOException $e) {
    echo " not working: $e->getMessage()";
    die();
}
