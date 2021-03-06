/* 

Cart class with method chaining 

*/


class Cart{

   constructor(){

   
    this.obj = []; 
    this.item_id = []; 
    this.price = []; 
    this.quantity = []; 
    this.discount; 

   }




}

Cart.prototype.addItem = function(obj){
    this.obj.push(obj); 
   
    this.discount; 

    return this;  


}; 

Cart.prototype.getItemId = function(){

    return this.item_id; 

}; 

Cart.prototype.removeItem = function(arg){
    let listToDelete = []; 
    listToDelete.push(arg.item_id); 
    let self = this.obj; 
    this.obj.reduceRight(function(acc, arr, idx) {
        if (listToDelete.indexOf(arr) > -1)
            self.splice(idx,1);
    }, 0);  

    return this; 


}; 


Cart.prototype.addDiscount = function(disc){
    
    this.discount = parseInt(disc.substr(0, disc.length-1));
    

    for(let i = 0; i<this.obj.length; i++){

        this.obj[i].price = this.obj[i].price * (this.discount/100); 
        

    }
    return this; 

}; 

Cart.prototype.totalItems = function(){

    return this.obj.length; 

}; 

Cart.prototype.totalQuantity = function(){

    let qty = 0; 
    for(let i = 0; i<this.obj.length; i++){

        qty += parseInt(this.obj[i].quantity); 
        

    }

    return qty; 

}; 

Cart.prototype.totalPrice = function(){
    let price = 0; 
    for(let i = 0; i<this.obj.length; i++){

        price += (parseInt(this.obj[i].price) * this.obj[i].quantity); 
        

    }

    return price; 
};

Cart.prototype.showAll = function(){
    let item_id = "";
    let price = 0; 
    let qty = 0; 
    for(let i = 0; i<this.obj.length; i++){

        console.log(`Item Id : ${this.obj[i].item_id}`);
        console.log(`Price : ${this.obj[i].price}`);
        console.log(`Quantity : ${this.obj[i].quantity}`); 
        

    }

    

   

};

Cart.prototype.checkout = function(){

    var fs = require('fs');
    var stream = fs.createWriteStream("cart.txt");
    let self = this; 
    stream.once('open', function(fd) {
        let item_id = "";
        let price = 0; 
        let qty = 0; 
        for(let i = 0; i<self.obj.length; i++){

            stream.write(`Item Id : ${self.obj[i].item_id}`);
            stream.write(`Price : ${self.obj[i].price}`);
            stream.write(`Quantity : ${self.obj[i].quantity}`); 
            

        }
    stream.end();
})

};

let cart = new Cart();
console.log(cart.addItem({item_id:4, price:400, quantity:2}).addItem({item_id:5, price:500, quantity:3}).removeItem({item_id:4}).addItem({item_id:10, price:600, quantity:4}).addDiscount("50%"));
console.log(cart.totalItems());
console.log(cart.totalQuantity());
console.log(cart.totalPrice());
console.log(cart.showAll()); 
console.log(cart.checkout());




