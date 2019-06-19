$(document).ready(function () {
    let checker = false;

    function ajaxValidator(passedid, messageID) {
        let id = "#" + passedid;
        let input = id + " input";
        let message = "#" + messageID;
        $(id).submit(function (e) {
            $(message).hide();
            $(input).each(function () {
                if ($(this).val() < 1) {
                    checker = true;
                }
            })
        });

        // $(id).keyup(function (e) {
        //     $(message).hide();
        // });
    }

    ajaxValidator("login-form", "loginmessage");
    ajaxValidator("register-form", "registermessage");






    // form validation
    (function () {
        'use strict';
        window.addEventListener('load', function () {
            // Get the forms we want to add validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function (form) {
                form.addEventListener('submit', function (event) {
                    if (form.checkValidity() === false) {
                        checker = true;
                        event.preventDefault();
                        event.stopPropagation();
                    } else {
                        checker = false;
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }, false);
    })();

    // show file on upload
    $(".custom-file-input").on("change", function () {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });

    //scroll to product div when clicking category

    $("#categories").click(function () {
        $('html, body').animate({
            scrollTop: ($("#products").offset().top)
        }, 500);
    });

    //loader
    window.onload = function () {
        setInterval(function () {
            document.getElementById("loading").style.display = "none";
        }, 0)

    }



    $('#register-form').on('submit', function (e) {
        //Stop the form from submitting itself to the server.
        $(this).attr("onsubmit", "return false");
        if (checker === false) {
            e.preventDefault();


            let firstname = $('#registerfname').val();
            let lastname = $('#registerlname').val();
            let email = $('#registeremail').val();
            let password = $('#registerpassword').val();
            let register = $('#register-button').val();
            let submit = $('#sendmessage').val();

            $("#sendmessage").addClass("disabled");
            $.ajax({
                type: "POST",
                url: 'ajax.php',
                data: {
                    email: email,
                    firstname: firstname,
                    lastname: lastname,
                    password: password,
                    register: register
                },
                headers: {
                    'Access-Control-Allow-Credentials': 'true'
                },
                success: function (data) {
                    $("#register-button").removeClass("disabled");
                    if (data == "0") {
                        check = true;
                        $("#registermessage").removeClass("alert-success");
                        $("#registermessage").addClass("alert-danger");
                        $("#registermessage").html("E-mail already registered.");
                        $("#registermessage").fadeIn("fast");

                    } else {
                        $("#registermessage").removeClass("alert-danger");
                        $("#registermessage").addClass("alert-success");
                        $("#registermessage").html("Account registered successfully.");
                        $("#registermessage").fadeIn("fast");
                        $('#login-email').val(data);
                        $("#register-form input").each(function () {
                            $(this).val("");
                        });
                    }
                }
            });
        }
    });




    $('#login-form').on('submit', function (e) {
        //Stop the form from submitting itself to the server.
        $(this).attr("onsubmit", "return false");
        console.log(checker);
        if (checker === false) {
            // $(this).attr("onsubmit", "return false");
            e.preventDefault();
            let name = $('#name').val();
            let email = $('#login-email').val();
            let password = $('#login-password').val();
            let login = $('#login').val();
            let submit = $('#sendmessage').val();

            $.ajax({
                type: "POST",
                url: 'ajax.php',
                data: {
                    email: email,
                    password: password,
                    login: login
                },

                headers: {
                    'Access-Control-Allow-Credentials': 'true'
                },
                success: function (data) {
                    $("#login").removeClass("disabled");
                    if (data == "0" || data.includes("0")) {


                        $("#loginmessage").removeClass("alert-success");
                        $("#loginmessage").addClass("alert-danger");
                        $("#loginmessage").html("Invalid login information.");
                        $("#loginmessage").fadeIn("fast");

                    } else {
                        location.href = "index.php";
                    }
                }
            });

        }

    });











});