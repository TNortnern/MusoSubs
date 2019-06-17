function disable(item) {
    $(item).text("In cart");
    item.disabled = true;
}
//add form
Vue.component('adminform', {
    props: ['action', 'type', 'value'],

    template: `
<div class="container admin-container">
    <h1 class="center-things headerBorder title-font">{{action}}</h1>
    <form id="admin-form" enctype="multipart/form-data" method="POST" style="width:40%" class="needs-validation mx-auto" novalidate>
        <slot/>
        <textarea style="margin:10px 0" placeholder="Enter a description" name="description" class="form-control" rows="5" id="comment" v-bind:value=value required></textarea>
        
        <div class="custom-file" style="margin:10px 0">
        <input type="file" class="custom-file-input" id="customFile" name="image" required>
        <label class="custom-file-label" for="customFile">Upload an image</label>
        <div class="invalid-feedback">A product must have an image.</div>
        </div>

    <div class="custom-control custom-switch">
    <label class="custom-control-label" for="promoswitch">Is there a promotion for this product?</label><br>
        <input type="checkbox" class="custom-control-input" name="promo" id="promoswitch">
    </div>

       <div class="center-things">
        <button id=type type="submit" v-bind:name=type value="" class="btn btn-primary">{{type}}</button>
        </div>
    </form>
</div>

`

});

// single item order form
Vue.component('orderform', {
    props: ['productname', 'productid', 'productprice', 'stock'],
    template: `
    <div class="container">
    <div class="py-5 text-center">
        <img class="d-block mx-auto mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72"
            height="72">
        <h2 class="title-font">Checkout form</h2>
    </div>

    <div class="row">
        <div class="col-md-4 order-md-2 mb-4">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-muted">Your order</span>
            </h4>
            <ul class="list-group mb-3">
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                        <h6 class="my-0">{{productname}}</h6>
                        <small class="text-muted">{{this.quantity}}</small>
                        <i v-on:click="increasequantity(1)" class="fas fa-arrow-circle-up"></i>
                        <i v-on:click="decreasequantity" class="fas fa-arrow-circle-down"></i>
                        <span id="stock-message" style="color:red"></span>
                    </div>
                    <span class="text-muted">{{productprice}}</span>
                </li>

               
                <li class="list-group-item d-flex justify-content-between">
                    <span>Total (USD)</span>
                    <strong>\${{(this.quantity*productprice).toFixed(2)}}</strong>
                </li>
            </ul>

           
        </div>
        <div class="col-md-8 order-md-1">
            <form method="POST" class="needs-validation" novalidate>
             <input type="text" v-bind:value=productname name="productname">
                <input id="price" type="text" v-bind:value=(this.quantity*productprice).toFixed(2) name="price">
                <input type="text" v-bind:value=productid name="id">
                <input type="text" v-bind:value=this.quantity name="quantity">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="firstName">First name</label>
                        <input type="text" class="form-control" id="firstName" placeholder="" value="" required>
                        <div class="invalid-feedback">
                            Valid first name is required.
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="lastName">Last name</label>
                        <input type="text" class="form-control" id="lastName" placeholder="" value="" required>
                        <div class="invalid-feedback">
                            Valid last name is required.
                        </div>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="username">Username</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">@</span>
                        </div>
                        <input type="text" class="form-control" id="username" placeholder="Username" required>
                        <div class="invalid-feedback" style="width: 100%;">
                            Your username is required.
                        </div>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="email">Email <span class="text-muted">(Optional)</span></label>
                    <input type="email" class="form-control" id="email" placeholder="you@example.com">
                    <div class="invalid-feedback">
                        Please enter a valid email address for shipping updates.
                    </div>
                </div>


                <hr class="mb-4">
                <button name="orderItems" class="btn btn-danger btn-lg btn-block" type="submit">Checkout</button>
            </form>
        </div>
    </div>
</div>

    
    `,

    data() {
        return {
            quantity: 1
        }
    },
    methods: {
        acheck: function () {
            console.log(this.productprice)
        },
        increasequantity: function (amount) {
            if (this.quantity == this.stock) {
                $("#stock-message").html(`There's only ${this.stock} in stock.`)
            } else {
                this.quantity++;
            }
        },

        decreasequantity: function () {
            if (this.quantity > 1) {
                this.quantity--;
                $("#stock-message").html(``)
            }
        }
    },
    mounted() {
        this.acheck();
    }
});


Vue.component('cartitems', {
    props: ['productname', 'productprice', 'productid', 'stock', 'total', 'cartindex', 'quantity'],
    template: `
   
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                        <form method="GET">
                        <button style="position: absolute; right:-12%; top:33%" class="unbutton" type="submit" name="deleteCartId" v-bind:value=productid><h3 class="my-0 main-color">X</h3></button>
                        <button style="margin-left:-10px" class="unbutton" type="submit" name="productid" v-bind:value=productid><h6 class="my-0 main-color">{{productname}}</h6></button>
                        </form>
                        <small class="text-muted">{{this.quantity}} in cart</small>
                        <i v-on:click="increasequantity(1)" class="fas fa-arrow-circle-up up-arrow"></i>
                        <i v-on:click="decreasequantity" class="fas fa-arrow-circle-down down-arrow"></i>
                        <form action="index.php">
                        <input hidden v-bind:value=this.quantity name="changer">
                        <input hidden name="cart">
                        <input hidden name="index" v-bind:value=cartindex>
                        <button type='submit' name="modifyquantity" class="btn btn-secondary">Save</button>
                        </form>
                        <span style="color:red">{{stockmessage}}</span>
                    </div>
                    <span class="text-muted">\${{productprice}}</span>
                </li>

               
               
             
              
    `,


    data() {
        return {
            stockmessage: ""
        }
    },
    methods: {

        increasequantity: function (amount) {
            if (this.quantity == this.stock) {
                this.stockmessage = (`There's only ${this.stock} in stock.`)
            } else {
                this.quantity++;
            }
        },

        decreasequantity: function () {
            if (this.quantity > 1) {
                this.quantity--;
                this.stockmessage = "";
            }
        }
    },


});


Vue.component('cartform', {
    props: ['total'],
    template: `
    <div class="container">
    <div class="py-5 text-center">
        <img class="d-block mx-auto mb-4" src="/docs/4.3/assets/brand/bootstrap-solid.svg" alt="" width="72"
            height="72">
        <h2 class="title-font">Checkout form</h2>
    </div>
     <div class="row">
        <div class="col-md-4 order-md-2 mb-4">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
            </h4>
            <ul class="list-group mb-3">
<slot/>
     <li class="list-group-item d-flex justify-content-between">
                    <span>Total (USD)</span>
                    <strong>\${{total}}</strong>
                </li>
            </ul>

           
        </div>
        <div class="col-md-8 order-md-1">
            <form class="needs-validation" novalidate>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="firstName">First name</label>
                        <input type="text" class="form-control" id="firstName" placeholder="" value="" required>
                        <div class="invalid-feedback">
                            Valid first name is required.
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="lastName">Last name</label>
                        <input type="text" class="form-control" id="lastName" placeholder="" value="" required>
                        <div class="invalid-feedback">
                            Valid last name is required.
                        </div>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="username">Username</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">@</span>
                        </div>
                        <input type="text" class="form-control" id="username" placeholder="Username" required>
                        <div class="invalid-feedback" style="width: 100%;">
                            Your username is required.
                        </div>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="email">Email <span class="text-muted">(Optional)</span></label>
                    <input type="email" class="form-control" id="email" placeholder="you@example.com">
                    <div class="invalid-feedback">
                        Please enter a valid email address for shipping updates.
                    </div>
                </div>


                <hr class="mb-4">
                <button class="btn btn-danger btn-lg btn-block" type="submit">Continue to checkout</button>
            </form>
        </div>
    </div>
</div>

    
    `



});


Vue.component('categoryselect', {
    props: ['name', 'type'],
    template: `
    <div>
     <label v-bind:for=name>{{type}}</label>
     <select id="categoryId" v-bind:name=name class="custom-select" @change=this.func>
        <slot/>
    </select>
    </div>
    
    `,

    methods: {
        func: function (event) {
            this.$root.getNutrients($("#categoryId option:selected").text())


        },
    },

});

Vue.component('category', {
    props: ['name', 'value'],
    template: `
        <option v-bind:value=value>{{name}}</option>
        `

});





Vue.component('textinput', {
    props: [
        'label',
        'error',
        'name',
        'placeholder',
        'value',
        'type',
        'pattern',
        'id'
    ],
    template: `
    <div class="form-group">
        <label v-bind:for=name>{{label}}</label>
        <input v-bind:type=type v-bind:pattern=pattern v-bind:value=value type="text" class="form-control" v-bind:id=name v-bind:placeholder=placeholder v-bind:name=name required>
        <div class="valid-feedback"></div>
        <div class="invalid-feedback">{{error}}</div>
    </div>
    `
});




Vue.component('carouselitem', {
    props: ['name', 'image', 'buttoncaption', 'price'],
    template: `
      <li>
        <div class='uk-position-cover uk-animation-kenburns uk-transform-origin-bottom-left'>
            <img v-bind:src=image v-bind:alt=image uk-cover>
        </div>

        <div class='uk-position-center uk-overlay uk-transition-fade' style=''>

            <div>

                <div class='uk-transition-slide-top' style='transition:.4s ease-in; background-color:#f8f9fa; padding:4px; border:2px dashed #ad172b; border-radius:15px'>
                    <h2 style='font-weight:bold; color:#ad172b;' class='uk-margin-remove title-font title-header'>
                        {{name}} \${{price}}
                    </h2>
                </div>
                <div class='uk-transition-slide-bottom center-things' style='transition:.6s ease-out'>
                <button class='btn btn-danger title-font'>{{buttoncaption}}</button>
                </div>
            </div>
        </div>
    </li>
    `
})


Vue.component('productcard', {
    props: ['name', 'description', 'price', 'image', 'id', 'categoryid', 'disabled'],
    template: `
 <div class="card" v-bind:data-tags=categoryid>
 <div class="overlay d-flex justify-content-center align-items-center">
    <form class="option-form" method="POST" action="index.php">
    <input name="productId" type="text" v-bind:value=id hidden>
    <button name="action" value="view" type="submit" class="btn card-buttons">View</button>
    <button name="action" value="addtocart" type="submit" class="btn card-buttons" v-bind:onmouseover=disabled>Add to Cart</button>
    <button name="action" value="order" type="submit" class="btn card-buttons" v-bind:onmouseover=disabled>Order</button>
    </form>
  </div>
    <img class="card-img-top" v-bind:src=image v-bind:alt=description>
    <div class="card-body">
        <div class="card-title center-things w-100" style="border-bottom:1px black solid"><h5 class="title-font">{{name}}</h5><i>\${{price}}</i></div>
        <p class="card-text title-font">
            {{description}}
        </p>
    </div>

</div>
`
})





var app = new Vue({

    el: "#app",



    data: {
        hey: "hey",

        anum: ""

    },

    mounted() {
        this.getNutrients("cookie")
    },
    methods: {
        getNutrients: function (term) {
            let calories = $('#calories');
            // The actual fetch request
            fetch(`https://nutritionix-api.p.rapidapi.com/v1_1/search/${term}?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat`, {
                    headers: {
                        "X-RapidAPI-Host": "nutritionix-api.p.rapidapi.com",
                        "X-RapidAPI-Key": "596c3ec8famsh8a61e9f5a4aeff4p10ba7ajsn546fc49cd52c"
                    },
                }).then(response => response.json())
                .then(data => {
                    calories.val(Number((Math.random() * data.hits[6].fields.nf_calories) + 1).toFixed(2))
                })
        },
        thefun: function (term) {
            console.log(term)
        },




    }
})