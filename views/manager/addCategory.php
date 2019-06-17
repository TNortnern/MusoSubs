<?php
if (isset($_POST['addcategory'])) {
    addCategory();
}
?>
<div class="container page-container title-font">
    <h1 class="center-things">Add a Category</h1>
    <form method="POST" enctype="multipart/form-data" class="mx-auto w-60">
        <textinput label="Category Name" name="categoryname" error="Enter a name" placeholder="Enter a Category Name">
        </textinput>
        <div class="custom-file" style="margin:10px 0">
            <input type="file" class="custom-file-input" id="customFile" name="categoryimage" required>
            <label class="custom-file-label" for="customFile">Upload an image</label>
            <div class="invalid-feedback">A product must have an image.</div>
        </div>
        <div class="center-things">
            <button name="addcategory" type="submit" class="btn btn-danger">
                Add
            </button>
        </div>
    </form>
</div>
