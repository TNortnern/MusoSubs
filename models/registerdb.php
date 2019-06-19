<?php

function registerUser($email, $password, $firstname, $lastname)
{
    global $db;
    // $email = $_POST['email'];
    // $password = $_POST['password'];
    $checksql = "SELECT * FROM users WHERE email = '$email'";
    $checkqry = $db->query($checksql);
    $checkemail = $checkqry->fetchAll();
    if (!empty($checkemail)) {
        echo "0";
    } else {
        echo "$email";
        $_SESSION['tempemail'] = $email;
        $sql = "INSERT INTO users(userId, email, firstname, lastname, `password`, `admin`) VALUES (NULL, '$email', '$firstname', '$lastname', '$password', 'no')";
        $qry = $db->query($sql);
        if (!$qry) {
            die("not working");
        }
    }
}
