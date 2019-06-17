<?php
session_start();
include "./models/database.php";
include "./models/registerdb.php";
include "./models/logindb.php";
$email = $_POST['email'];
$password = $_POST['password'];
if (isset($_POST['register'])) {
    registerUser($email, $password);
}
if (isset($_POST['login'])) {
    login($email, $password);
}
