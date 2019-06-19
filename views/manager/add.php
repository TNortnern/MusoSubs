<?php
$categories = getCategories();
if (isset($_POST['Add'])) {
    addProducts();
}
?>

<adminform action="Add a Product" type="Add" imagelabel="Upload an Image" required="required">
    <textinput label="Name of Product" name="name" error="Enter a valid product name"
        placeholder="Enter a product name">

    </textinput>

    <textinput label="Price" name="price" error="Incorrect price value" placeholder="Enter the price">

    </textinput>


    <textinput label="Stock" name="quantity" error="Incorrect value" placeholder="Enter the products in stock">
    </textInput>

    <textinput label="Calories" name="calories" error="Incorrect calories value" placeholder="Enter the Calories">

    </textinput>
    <categoryselect name="categoryId" type="Category">
        <?php foreach ($categories as $category) : ?>
        <category name="<?= $category['categoryName'] ?>" value="<?= $category['categoryId'] ?> "></category>
        <?php endforeach; ?>
    </categoryselect>

</adminform>
