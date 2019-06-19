<?php

function login($email, $password)
{
    global $db;
    // $email = $_POST['email'];
    // $password = $_POST['password'];
    $sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
    $qry = $db->query($sql);
    $check = $qry->fetchAll();
    $adminsql = "SELECT * FROM users WHERE email = '$email' AND password = '$password' AND admin = 'Yes'";
    $adminqry = $db->query($adminsql);
    $admincheck = $adminqry->fetchAll();
    if (!empty($check)) {
        $_SESSION['email'] = $email;
        $_SESSION['fname'] = $check['firstname'];
        $_SESSION['lname'] = $check['lastname'];
        $_SESSION['loggedin'] = "y";
        if (!empty($admincheck)) {
            $_SESSION['admin'] = "y";
        }
    } else {
        echo "0";
    }
}
