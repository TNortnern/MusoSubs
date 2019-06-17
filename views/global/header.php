<?php

ob_start();


?>

<!doctype html>
<html lang="en">

<head>
    <title>Title</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.1.5/css/uikit.min.css" />
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="./css/styles.css">
    <link href="https://fonts.googleapis.com/css?family=Kalam|Nothing+You+Could+Do&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css">
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

</head>

<body>
    <div id="loading">
        <div class="d-flex justify-content-center align-items-center h-100">
            <img id="loading-image" src="images/loader.gif" alt="Loading..." />
        </div>
    </div>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light" id="nav-bar">
        <a class="navbar-brand" href="#">
            <img src="images/logo.png" alt="logo" width="40px">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <a class="nav-item nav-link active" href="./">Home <span class="sr-only">(current)</span></a>
                <a class="nav-item nav-link" href="?menu">Menu</a>

                <a class="nav-item nav-link" href="#Sandwich">About Us</a>
                <?php if (isset($_SESSION['admin'])) { ?>
                <a class="nav-item nav-link" href="?newproduct">Add Product</a>
                <a class="nav-item nav-link" href="?newcategory">Add Category</a>
                <?php } ?>
                <a class="nav-item nav-link" href="?cart">Cart</a>
                <div class="form-inline my-2 my-lg-0">
                    <?php if (!isset($_SESSION['loggedin'])) { ?>
                    <a id="loginprompt" style="position:absolute;right:0" class="nav-item nav-link" data-toggle="modal"
                        data-target="#login">Login</a>
                    <?php } else {
                    ?>
                    <a id="logout" href="?logout" style="position:absolute;right:0" class="nav-item nav-link"
                        data-target="#login">Logout</a>
                    <?php } ?>
                </div>
            </div>
        </div>
    </nav>

    <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="login" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">Login</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="center-things">
                        <span style="display:none" id="loginmessage" class="alert center-things"></span>
                    </div>
                    <form class="needs-validation" id="login-form" method="post" novalidate>
                        <div class="form-group">
                            <label for="email">Email address </label>
                            <input name="email" type="email" class="form-control" id="login-email"
                                aria-describedby="emailHelp" placeholder="Enter email" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input name="password" type="password" class="form-control" id="login-password"
                                placeholder="Password" required>
                        </div>
                        <div class="form-group form-check">
                            <input name="remember" type="checkbox" class="form-check-input" id="remember">
                            <label class="form-check-label" for="remember">Remember me</label>
                        </div>
                        <div class="center-things">
                            <button name="login" type="submit" class="btn btn-primary">Login</button><br>
                            <span>Not registered yet? Click <a href="#" data-dismiss="modal" data-toggle="modal"
                                    data-target="#register">here</a> to
                                register.</span>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>


    <div class="modal fade" id="register" tabindex="-1" role="dialog" aria-labelledby="register" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Register</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="center-things">
                        <span style="display:none" id="registermessage" class="alert center-things"></span>
                    </div>
                    <form class="needs-validation" id="register-form" method="post" novalidate>

                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input name="email" type="email" class="form-control" id="registeremail"
                                aria-describedby="emailHelp" placeholder="Enter email" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input name="password" type="password" class="form-control" id="registerpassword"
                                placeholder="Password" required>
                        </div>

                        <div class="form-group">
                            <label for="confirm-password">Confirm Password</label>
                            <input name="confirmpassword" type="password" class="form-control" id="confirm-password"
                                placeholder="Confirm Password" required>
                        </div>
                        <div class="center-things">
                            <button id="register-button" name="register" type="submit"
                                class="btn btn-primary">Register</button><br>
                            <span>Already registered? Click <a href="#" data-dismiss="modal" data-toggle="modal"
                                    data-target="#login">here</a> to
                                login.</span>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>




    <div id="app">
