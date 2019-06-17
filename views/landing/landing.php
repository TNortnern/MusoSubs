<?php
$products = getProducts();
?>

<div class="w-100">
    <div style="background-color:#ad172b;margin-top:50px" class="center-things">
        <img style="height:120px" src="images/ logo.png">
    </div>
</div>
<div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1"
    uk-slideshow="animation: fade; autoplay: true; autoplay-interval: 5500; min-height: 300; max-height: 500;"
    style="margin-top:2.4px">

    <ul class="uk-slideshow-items">
        <carouselitem name="Double Beef Bean Burrito" price="7.99" image="images/background1.jpg"
            buttoncaption="Try Now">
        </carouselitem>
        <carouselitem name="Super Meat Burger" price="5.99" image="images/meatyburger.jpg" buttoncaption="Try Now">
        </carouselitem>
        <carouselitem name="Triple Taco Treasure" price="21.99" image="images/tacocombo.jpg" buttoncaption="Try Now">
        </carouselitem>
    </ul>

    <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous
        uk-slideshow-item="previous"></a>
    <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next
        uk-slideshow-item="next"></a>

</div>


<!-- START THE FEATURETTES -->
<?php
// $randomProduct = getRandomProduct();
// echo "$randomProduct[quantity]";
// print_r($randomProduct);
?>
<hr class="featurette-divider">

<div class="row featurette">
    <div class="col-md-7">
        <h2 class="featurette-heading">Our New Special <span class="text-muted">Give it a try!</span></h2>
        <p class="lead">Try our new meat dish special, teriyaki chicken, corn, carrots, and beans, all souped in one for
            a super protein meal. LIMITED TIME SPECIAL.</p>
        <div id="wrap-order-button">
            <button class="btn btn-danger">Order Online</button>
        </div>
    </div>
    <div class="col-md-5">
        <img src="images/meatdish.jpg" alt="pizza">
    </div>
</div>

<hr class="featurette-divider">


<div class="d-flex flex-wrap uk-inline">
    <div style="background-image:url('images/landcake.jpg'); background-size:cover" class="w-50 h-400px">

        <div style="position:relative" class="h-100">
            <div class="uk-position-center-right">
                <div class="landing-item-wrapper">
                    <h2 style="text-decoration:underline" class="title-font"><?php echo date('l'); ?> Menu</h2>
                    <?php
                    foreach ($products as $product) {
                        ?>
                    <p class="title-font"><?= $product['name'] ?></p>
                    <?php
                }
                ?>
                </div>
                <div class="center-things">
                    <form method="POST" action="?menu">
                        <button name="?menu" type="submit" class="btn btn-danger">Menu</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div style="background-image:url('images/landfruit.jpg'); background-size:cover" class="w-50 h-400px">

        <div style="position:relative" class="h-100">
            <div class="uk-position-center-right">
                <div class="landing-item-wrapper">
                    <h2 class="title-font"> Get rewarded
                        for
                        being you!</h2>

                    <p class="title-font">
                        From personalized rewards to sneak peeks and surprises,<br> MyMuso members get the best of
                        Muso's.
                    </p>
                </div>
                <div class="center-things">
                    <form method="POST" action="?menu">
                        <button name="?menu" type="submit" class="btn btn-danger">Subscribe</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

</div>

<hr class="featurette-divider">
