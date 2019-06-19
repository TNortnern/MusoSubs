<?php
session_start();
include "./models/database.php";
include "./models/categoriesdb.php";
include "./models/productsdb.php";
include "./models/registerdb.php";
include "./models/logindb.php";
include "./views/global/header.php";
if (isset($_GET['logout'])) {

    session_destroy();
    $_SESSION = array();
    header('Location: index.php');
    ob_end_flush();
}



if(isset($_POST['savequantity'])){
    updateQuantity($_POST['productId']);
     header("Location:?manager");
}

if (isset($_GET['manager'])) {
    include "./views/manager/manager.php";
}else if(isset($_POST['product'])){
    if($_POST['product'] == "modify"){
        include "./views/manager/modifyproduct.php";
    }else{
        include "./views/manager/deleteproduct.php";
    }
}
 else if (isset($_GET['newproduct'])) {
    include "./views/manager/add.php";
} else if (isset($_GET['newcategory'])) {
    include "./views/manager/addCategory.php";
}

else if (isset($_GET['menu'])) {
    include "./views/products/products.php";
} else if (isset($_POST['action'])) {
    $action = $_POST['action'];
    if ($action == "view") {
        include "./views/products/viewitem.php";
    } else if ($_POST['action'] == "order") {
        include "./views/products/orderitem.php";
    } else if ($action == "addtocart") {
        include "./views/products/addtocart.php";
    }
} else if (isset($_GET['cart']) || isset($_REQUEST['modifyquantity'])) {
    include "./views/products/cart.php";
} else if (isset($_REQUEST['deleteCartId'])) {
    include "./views/products/deletecartitem.php";
} else {
    include "./views/landing/landing.php";
}

include "./views/global/footer.php";
