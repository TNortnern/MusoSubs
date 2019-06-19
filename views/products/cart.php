<div class="container page-container">
    <?php
    $firstname = "";
    $lastname = "";
    $email = "";
    if (isset($_SESSION['loggedin'])) {
        $firstname = $_SESSION['fname'];
        $lastname = $_SESSION['lname'];
        $email = $_SESSION['email'];
        $readonly = "readonly";
    }
    if (isset($_SESSION['shopcart'])) {
        $count = count($_SESSION['shopcart']);
    }
    if (isset($_SESSION['shopcart']) && $count != 0) {
        if (isset($_REQUEST['modifyquantity'])) {
            $_SESSION['shopcart'][$_REQUEST['index']]['product_quantity'] = $_REQUEST['changer'];
            header("Location:?cart");
        }
        $total = 0;
        $productTotal = 0;
        $arr = $_SESSION['shopcart'];
        foreach ($arr as $t) {
            $product = getProduct($t['product_id']);
            $total += $product['price'] * $t['product_quantity'];
            $total = number_format((float)$total, 2, '.', '');
            $productTotal = $product['price'] * $t['product_quantity'];
            $productTotal = number_format((float)$productTotal, 2, '.', '');
        }


        ?>
    <cartform <?php if (isset($_SESSION['loggedin'])) { ?> readonly=<?= $readonly ?> <?php } ?>
        firstname="<?= $firstname ?>" lastname="<?= $lastname ?>" email="<?= $email ?>" total=<?= $total ?>>
        <?php
            foreach ($_SESSION['shopcart'] as $index => $prod) {
                $product = getProduct($prod['product_id']);
                // if (isset($_POST['orderItems'])) {
                //     orderItems($product['productId'], $product['name'], $product['price'], $product['quantity'], $productTotal, $total);
                // }
                ?>
        <cartitems quantity=<?= $prod['product_quantity'] ?> cartindex=<?= $index ?>
            productname="<?= $product['name'] ?> " productid="<?= $product['productId'] ?>"
            productprice="<?= $product['price'] ?>" stock="<?= $product['quantity'] ?>"></cartitems>
        <?php


        }
        ?>
    </cartform>



    <?php

} else {
    ?>
    <div class="center-things">
        <h2>Your cart is empty</h2>
    </div>

    <?php
}
?>

</div>
