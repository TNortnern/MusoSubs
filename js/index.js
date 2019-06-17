$(document).ready(function () {



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
                        event.preventDefault();
                        event.stopPropagation();
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
        e.preventDefault();
        $('#register-form').attr("onsubmit", "return false");
        let name = $('#name').val();
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
                password: password,
                register: register
            },
            headers: {
                'Access-Control-Allow-Credentials': 'true'
            },
            success: function (data) {
                $("#register-button").removeClass("disabled");
                if (data == "0") {
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
    });


    $('#login-form').on('submit', function (e) {
        //Stop the form from submitting itself to the server.
        e.preventDefault();
        $('#login-form').attr("onsubmit", "return false");
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
                if (data == "0") {
                    $("#loginmessage").removeClass("alert-success");
                    $("#loginmessage").addClass("alert-danger");
                    $("#loginmessage").html("Invalid login information.");
                    $("#loginmessage").fadeIn("fast");

                } else {
                    location.href = "index.php";
                }
            }
        });
    });











});