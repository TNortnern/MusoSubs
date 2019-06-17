<?php
$product = getProduct($_POST['productId']);


?>


<orderform productname="<?= $product['name'] ?>" productprice=<?= $product['price'] ?>
    productid="<?= $product['productId'] ?>" stock=<?= $product['quantity'] ?>></orderform>


<h1>{{anum}}</h1>
