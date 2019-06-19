function disable(item) {
    $(item).text("In cart");
    item.disabled = true;
}



//add form
Vue.component('adminform', {
    props: ['action', 'type', 'value', 'theid', 'imagelabel', 'required'],

    template: `
<div class="container admin-container">
    <h1 class="center-things headerBorder title-font">{{action}}</h1>
    <form id="admin-form" enctype="multipart/form-data" method="POST" style="width:40%" class="needs-validation mx-auto" novalidate>
        <slot/>
        <textarea style="margin:10px 0" placeholder="Enter a description" name="description" class="form-control" rows="5" id="comment" v-bind:value=value required></textarea>
        
        <div class="custom-file" style="margin:10px 0">
        <input type="file" class="custom-file-input" v-bind:id=theid name="image" v-bind:required=required>
        <label class="custom-file-label" for="customFile">{{imagelabel}}</label>
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
    props: [
        'productname', 'productid', 'productprice', 'stock', 'quantity', 'firstname',
        'lastname', 'email', 'readonly'
    ],
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
                        <i v-on:click="increasequantity(1)" class="fas fa-arrow-circle-up up-arrow"></i>
                        <i v-on:click="decreasequantity" class="fas fa-arrow-circle-down down-arrow"></i>
                        <span id="stock-message" style="color:red"></span>
                    </div>
                    <span class="text-muted">\${{productprice}}</span>
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
                        <input v-bind:readonly=readonly v-bind:value=firstname type="text" class="form-control" id="firstName" placeholder="" value="" required>
                        <div class="invalid-feedback">
                            Valid first name is required.
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="lastName">Last name</label>
                        <input v-bind:readonly=readonly v-bind:value=lastname type="text" class="form-control" id="lastName" placeholder="" value="" required>
                        <div class="invalid-feedback">
                            Valid last name is required.
                        </div>
                    </div>
                </div>

                

                <div class="mb-3">
                    <label for="email">Email <span class="text-muted"></span></label>
                    <input v-bind:readonly=readonly v-bind:value=email type="email" class="form-control" id="email" placeholder="you@example.com" required>
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
    props: [
        'productname', 'productprice', 'productid', 'stock', 'total', 'cartindex', 'quantity'
    ],
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
    props: ['total', 'firstname', 'lastname', 'email', 'readonly'],
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
                        <input v-bind:readonly=readonly v-bind:value=firstname type="text" class="form-control" id="firstName" placeholder="" value="" required>
                        <div class="invalid-feedback">
                            Valid first name is required.
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="lastName">Last name</label>
                        <input v-bind:readonly=readonly v-bind:value=lastname type="text" class="form-control" id="lastName" placeholder="" value="" required>
                        <div class="invalid-feedback">
                            Valid last name is required.
                        </div>
                    </div>
                </div>

           

                <div class="mb-3">
                    <label for="email">Email <span class="text-muted"></span></label>
                    <input v-bind:readonly=readonly v-bind:value=email type="email" class="form-control" id="email" placeholder="you@example.com" required>
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
     <select id="categoryId" v-bind:name=name class="custom-select" >
        <slot/>
    </select>
    </div>
    
    `,

    methods: {
        func: function (event) {
            // this.$root.getNutrients($("#categoryId option:selected").text())


        },
    },

});

Vue.component('category', {
    props: ['name', 'value'],
    template: `
        <option v-bind:value=value>{{name}}</option>
        `

});

Vue.component('modifycategory', {
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
        'id',
        'val'
    ],
    template: `
    <div class="form-group">
        <label v-bind:for=name>{{label}}</label>
        <input v-bind:value=val v-bind:type=type v-bind:pattern=pattern type="text" class="form-control" v-bind:id=name v-bind:placeholder=placeholder v-bind:name=name required>
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
    props: ['name', 'description', 'price', 'image', 'id', 'categoryid', 'disabled', 'stock'],
    template: `
 <div class="card" v-bind:data-tags=categoryid>
 <div class="overlay d-flex justify-content-center align-items-center">
    <form class="option-form" method="POST" action="index.php">
    <input name="productId" type="text" v-bind:value=id hidden>
    <button name="action" value="view" type="submit" class="btn card-buttons">View</button>
    <button name="action" value="addtocart" type="submit" class="btn card-buttons" v-bind:onmouseover=disabled>Add to Cart</button>
    <button name="action" value="order" type="submit" class="btn card-buttons" v-bind:onmouseover=disabled>Order</button>
    <div class="form-group center-things">
  <label class="center-things" style="color:white" for="quantity">Quantity</label>
  <input name="quantity" style="background-color:#ad172b; color:white; font-size:1.3em" min=1 v-bind:max=stock value="1" type="number" class="form-control center-things" required>
</div>
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


Vue.component('managercard', {
    props: ['name', 'description', 'price', 'image', 'id', 'categoryid', 'stock'],
    template: `
 <div class="card" v-bind:data-tags=categoryid>
 <div class="overlay d-flex justify-content-center align-items-center">
    <form style="align-items:center" class="option-form" method="POST" action="index.php">
    <input name="productId" type="text" v-bind:value=id hidden>
    <button name="product" value="modify" type="submit" class="btn card-buttons">Modify</button>
    <button name="product" value="delete" type="submit" class="btn card-buttons">Delete</button>
    <div class="form-group center-things">
  <label class="center-things" style="color:white" for="quantity">Stock</label>
  <input @change=checking($event.target.value,stock) name="quantity" style="background-color:#ad172b; color:white; font-size:1.3em; width:160px" v-bind:value=stock type="number" min=0 class="form-control center-things">
  <button v-if="this.changed == true" value="save" type="submit" class="btn btn-secondary sav" name="savequantity" autocomplete="off">Save</button>
</div>
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
`,

methods:{
    checking:function(e, stock){
        console.log(this.changed)
        if (e > stock || e < stock){
            this.changed = true;
        }else{
            this.changed = false;
        }
    }
},

data(){
    return{
        changed: false
    }
}
})




var app = new Vue({

    el: "#app",



    data: {
        hey: "hey",

        anum: ""

    },

    mounted() {
        // this.getNutrients("cookie")
    },
    methods: {
        // getNutrients: function (term) {
        //     let calories = $('#calories');
        //     // The actual fetch request
        //     fetch(`https://nutritionix-api.p.rapidapi.com/v1_1/search/${term}?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat`, {
        //             headers: {
        //                 "X-RapidAPI-Host": "nutritionix-api.p.rapidapi.com",
        //                 "X-RapidAPI-Key": "596c3ec8famsh8a61e9f5a4aeff4p10ba7ajsn546fc49cd52c"
        //             },
        //         }).then(response => response.json())
        //         .then(data => {
        //             calories.val(Number((Math.random() * data.hits[6].fields.nf_calories) + 1).toFixed(2))
        //         })
        // },
        thefun: function (term) {
            console.log(term)
        },




    }
})