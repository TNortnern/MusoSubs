<?php
$products = getProducts();
$categories = getCategories();

?>
<div class="manager">
    <div class="h-100 w-100 d-flex justify-content-center align-items-center">
        <h1 class="title-font menu-header">
           Manager
        </h1>
    </div>
</div>
<div class="container">
   
    
</div>
<div class="container" id="menu">
     <h1 class="center-things title-font main-color">Categories</h1>
     <ul class="d-flex flex-wrap">
            <?php
            foreach ($categories as $category) {
                $categoryName = $category['categoryName'];
                $categoryImage = $category['categoryImage'];
                $categoryId = $category['categoryId'];
                ?>
            <li class="four-per-row category-items">
                <img class="category-img" src="images/<?= $categoryImage ?>" alt="<?= $categoryName ?>">
                <h3 class="center-things title-font main-color"><?= $categoryName ?></h3>
                <form class="center-things">
                    <button name="mo" class="btn btn-primary" type="submit">Modify</button>
                    <button class="btn btn-warning" type="submit">Delete</button>
            </form>
            </li>
            <?php
        }
        ?>
        </ul>
        <hr >
    <h1 class="center-things title-font main-color">Products</h1>
    <div uk-filter="target: .js-filter">
        <ul id="categories" class="d-flex flex-wrap">
            <li class="four-per-row category-items" uk-filter-control>
                <img class="category-img" src="images/all.jpg" alt="reset">
                <h3 class="center-things title-font main-color">All</h3>
            </li>
            <?php
            foreach ($categories as $category) {
                $categoryName = $category['categoryName'];
                $categoryImage = $category['categoryImage'];
                $categoryId = $category['categoryId'];
                ?>
            <li class="four-per-row category-items" uk-filter-control="[data-tags*='<?= $categoryId ?>']">
                <img class="category-img" src="images/<?= $categoryImage ?>" alt="<?= $categoryName ?>">
                <h3 class="center-things title-font main-color"><?= $categoryName ?></h3>
            </li>
            <?php
        }
        ?>
        </ul>





        <div id="products" class="d-flex flex-wrap js-filter menu-items">
            <?php
            foreach ($products as $product) {
                $name = $product['name'];
                $description = $product['description'];
                $image = $product['image'];
                $price = $product['price'];
                $price = number_format((float)$price, 2, '.', '');
                $id = $product['productId'];
                $stock = $product['quantity'];
                $categoryId = $product['categoryId'];
                ?>
            <managercard categoryid="<?= $categoryId ?>" id="<?= $id ?>" name="<?= $name ?>"
                description="<?= $description ?>" image="<?php echo "images/$image" ?>" price=<?= $price ?>
                stock="<?= $stock ?>">
            </managercard>
            <?php
        }


        ?>

        </div>

    </div>
    <!--end of flex-->
</div><!-- container -->
