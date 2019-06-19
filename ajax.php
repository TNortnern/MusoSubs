<?php
session_start();
include "./models/database.php";
include "./models/registerdb.php";
include "./models/logindb.php";
$email = $_POST['email'];
$password = $_POST['password'];

if (isset($_POST['register'])) {
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    registerUser($email, $password, $firstname, $lastname);
}
if (isset($_POST['login'])) {
    login($email, $password);
}
