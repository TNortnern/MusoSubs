<?php
$product = getProduct($_POST['productId']);
$quantity = $_POST['quantity'];
$firstname = "";
$lastname = "";
$email = "";
if (isset($_SESSION['loggedin'])) {
    $firstname = $_SESSION['fname'];
    $lastname = $_SESSION['lname'];
    $email = $_SESSION['email'];
    $readonly = "readonly";
}


?>


<orderform <?php if (isset($_SESSION['loggedin'])) { ?> readonly=<?= $readonly ?> <?php } ?>
    firstname="<?= $firstname ?>" lastname="<?= $lastname ?>" email="<?= $email ?>" quantity="<?= $quantity ?>"
    productname="<?= $product['name'] ?>" productprice=<?= $product['price'] ?> productid="<?= $product['productId'] ?>"
    stock=<?= $product['quantity'] ?>></orderform>
