<?php
// if (isset($_POST['productId'])) {
//     $items = $_POST['productId'];
//     $_SESSION['cart'] = $items;
//     header('location: index.php?status=success');
// } else {
//     header('location: index.php?status=failed');
// }

if (isset($_SESSION['shopcart']) & !empty($_SESSION['shopcart'])) {
    $count = count($_SESSION['shopcart']);

    if (in_array($_POST['productId'], $cartitems)) {
        header('location: index.php?status=incart');
    } else {
        $_SESSION['shopcart'][$count] = array(
            'product_id' => $_POST['productId'],
            'product_quantity' => 1
        );
        header('location: index.php?menu&success');
    }
} else {
    $_SESSION['shopcart'][0] = array(
        'product_id' => $_POST['productId'],
        'product_quantity' => 1
    );
    header('location: index.php?menu&started');
}
