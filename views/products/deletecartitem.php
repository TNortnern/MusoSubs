<?php
if (isset($_REQUEST['deleteCartId'])) {
    foreach ($_SESSION['shopcart'] as $index => $deletion) {
        if ($_REQUEST['deleteCartId'] == $deletion['product_id']) {
            unset($_SESSION['shopcart'][$index]);
        }
        // resort shop cart array

    }
    $_SESSION['shopcart'] = array_values($_SESSION['shopcart']);
    if (isset($_REQUEST['deleteCartId'])) {
        ob_start();
        header("Location:?cart&rm");
        ob_end_flush();
    } else {
        ob_start();
        header("Location:index.php");
        ob_end_flush();
    }
}
