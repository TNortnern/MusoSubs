<?php
$products = getProducts();
$categories = getCategories();
?>
<div class="menu">
    <div class="h-100 w-100 d-flex justify-content-center align-items-center">
        <h1 class="title-font menu-header">
            Our Menu
        </h1>
    </div>
</div>
<div class="container" id="menu">
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
                $id = $product['productId'];
                $categoryId = $product['categoryId'];
                ?>
            <productcard <?php
                                if (isset($_SESSION['shopcart'])) {
                                    if (in_array($id, array_column($_SESSION['shopcart'], 'product_id'))) { // check if item is in cart
                                        ?> disabled=javascript:disable(this) <?php
                                                                                    }
                                                                                }
                                                                                ?> categoryid="<?= $categoryId ?>"
                id="<?= $id ?>" name="<?= $name ?>" description="<?= $description ?>"
                image="<?php echo "images/$image" ?>" price=<?= $price ?>>
            </productcard>
            <?php
        }


        ?>

        </div>

    </div>
    <!--end of flex-->
</div><!-- container -->
