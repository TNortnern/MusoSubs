<div class="page-container">
<?php
    $product = getProduct($_POST['productId']);
    $categories = getCategories();
    $cat = getCategory($product['categoryId']);
    
?>
<div style="margin-bottom:-60px;" class="center-things">
<img style="border-radius:10px; border:3px solid #ad172b" width="250" height="250" src="images/<?=$product['image']?>"><br>
<h5>Current Image</h5>
</div>
<adminform theid="setimage" type="Modify" action="Modify" value="<?= $product['description'] ?>" imagelabel="Change Image? Current: <?= $product['image'] ?>">
   <textinput val="<?= $product['name'] ?>" label="Name of Product" name="name" error="Enter a valid product name"
        placeholder="Enter a product name">

    </textinput>

    <textinput val="<?= "$" . $product['price'] ?>" label="Price" name="price" error="Incorrect price value" placeholder="Enter the price">

    </textinput>


    <textinput val="<?= $product['quantity'] ?>" label="Stock" name="quantity" error="Incorrect value" placeholder="Enter the products in stock">
    </textInput>

    <textinput val="<?= $product['calories'] ?>" label="Calories" name="calories" error="Incorrect calories value" placeholder="Enter the Calories">

    </textinput>
    <categoryselect name="categoryId" type="Category">
         <category name="<?= $cat['categoryName'] ?>" value="<?= $cat['categoryId'] ?> "></category>
        <?php foreach ($categories as $index=>$category) : 
            if($category['categoryId'] == $cat['categoryId']){
                continue;
            }
            ?>
        <category name="<?= $category['categoryName'] ?>" value="<?= $category['categoryId'] ?> "></category>
        <?php endforeach; ?>
    </categoryselect>  
</adminform>

        </div>