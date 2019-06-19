<div class="page-container container">
<?php
if(isset($_POST['yes'])){
    deleteProduct($_POST['productId']);
}
if(isset($_POST['no'])){
    header("Location:?manager");
}
$product = getProduct($_POST['productId']);
?>
<div class="mx-auto" style="border:2px solid gray; border-radius:10px; padding:30px 30px 5px 30px; width:52%"> 
    <form method="POST" class="center-things" action="index.php?manager">
        <h2>Delete <?= $product['name'] ?>?</h2>
        <img style="border-radius:10px; margin-bottom:5px" src="images/<?= $product['image']?>">
    <button name="yes" class="btn btn-success">Yes</button>
    <button name="no" class="btn btn-danger">No</button>
    </form>

</div>



</div>