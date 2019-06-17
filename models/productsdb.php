<?php


function getProducts()
{
    global $db;
    $sql = "SELECT * FROM products ORDER BY RAND()";
    $qry = $db->query($sql);
    $products = $qry->fetchAll();
    return $products;
}

function getRandomProduct()
{
    global $db;
    $sql = "SELECT * FROM products ORDER BY RAND() limit 1";
    $qry = $db->query($sql);
    $product = $qry->fetch();
    return $product;
}


function getProductByCategory($id)
{
    global $db;
    $sql = "SELECT * FROM products WHERE categoryId = $id";
    $qry = $sql->query($sql);
    $products = $qry->fetchAll();
    return $products;
}

function getProduct($id)
{
    global $db;
    $sql = "SELECT * FROM products WHERE productId = $id";
    $qry = $db->query($sql);
    $product = $qry->fetch();
    return $product;
}

function addProducts()
{
    global $db;
    $name = $_POST['name'];
    $description = $_POST['description'];
    $calories = $_POST['calories'];
    $price = $_POST['price'];
    $quantity = $_POST['quantity'];
    $categoryId = $_POST['categoryId'];
    $img = $_FILES['image']['name'];
    $target_file = "images/" . basename($_FILES['image']['name']);
    move_uploaded_file($_FILES['image']['tmp_name'], $target_file);
    $sql = "INSERT INTO `products` (`name`, `description`, `price`, `calories`, `quantity`, `categoryId`, `image`, `productId`) VALUES ('$name', '$description', '$price', '$calories', '$quantity', '$categoryId', '$img', NULL)";
    if (!$sql) {
        die("Didn't work");
    } else {
        $db->query($sql);
        header("Location:index.php");
    }
}


function sortBy($id)
{
    global $db;
    $sql = "SELECT * FROM products WHERE categoryId = $id";
    $qry = $db->query($sql);

    if (!$qry) {
        die("didn' work");
    }
}
