<?php

function getCategories()
{
    global $db;
    $sql = "SELECT * FROM categories";
    $qry = $db->query($sql);
    $categories = $qry->fetchAll();
    return $categories;
}


function getCategory($id)
{
    global $db;
    $sql = "SELECT * FROM categories WHERE categoryId = '$id'";
    $qry = $db->query($sql);
    $category = $qry->fetch();
    return $category;
}

function addCategory()
{
    global $db;
    $categoryname = $_POST['categoryname'];
    $categoryimage = $_FILES['categoryimage']['name'];
    $target_file = "images/" . basename($_FILES['categoryimage']['name']);
    move_uploaded_file($_FILES['categoryimage']['tmp_name'], $target_file);
    $sql = "INSERT INTO categories(categoryId, categoryName, categoryImage) VALUES (NULL, '$categoryname', '$categoryimage')";
    $qry = $db->query($sql);
    if (!$qry) {
        die("not working");
    }
}
