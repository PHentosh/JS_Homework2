/* DONT CHANGE THIS CODE - START */
function wait(ms = 1000) { return new Promise(resolve => setTimeout(resolve, ms)) }

class Dish {
    constructor(cookingTime) {
        this.cookingTime = cookingTime;
    }

    async cook() {
        const actualCookingTime = this.cookingTime * (1 + Math.random()) * 100;
        await wait(actualCookingTime);
        return this;
    }
}
/* DONT CHANGE THIS CODE - END */

/*
    YOUR CODE HERE
*/

class Ingridient {
    constructor(name, amount){
        this.name = name;
        this.amount = amount;
    }
}

class Kitchen {

    constructor(){
        this.fridge = {};
        this.order_list = [];
    }

    addToFridge(ingredients) {
        for (let i=0; i < ingredients.length; i++){
            this.fridge[ingredients[i].name] = ingredients[i].amount;
        }
    }

    order(dish){
        for (var key in dish.ingredients){
            if (key in this.fridge){
                if (dish.ingredients[key] <= this.fridge[key]){
                    this.fridge[key] = this.fridge[key] - dish.ingredients[key];
                } else {
                    throw "Not enough ingridients in fridge to order " + dish.name;
                }
            } else {
                throw "Not enough ingridients in fridge to order " + dish.name;
            }
        }
        this.order_list = this.order_list.concat([dish])
    }

    async cookFastestOrder(){
        let fastest_dish = this.order_list[0];
        for (let i = 1; i<this.order_list.length; i++){
            if (this.order_list[i].cookingTime < fastest_dish.cookingTime){
                fastest_dish = this.order_list[i];
            }
        }
        let i = this.order_list.indexOf(fastest_dish);
        await this.order_list.pop(i);
        fastest_dish.cook();
        return fastest_dish;
    }

    async cookAllOrders(){
        let ret_list = [];
        for (let i = 0; i<this.order_list.length; i++){
            await this.order_list[0].cook();
            ret_list.push(this.order_list[0]);
            this.order_list.pop(0);
        }
        return ret_list;
    }


}

class Bolognese extends Dish {
    constructor(){
        super(10);
        this.name = "Bolognese"
        this.ingredients = {"spaghetti" : 1, "tomato" : 1, "meat" : 1}
    }
}

class MashedPotatoes extends Dish {
    constructor(){
        super(8);
        this.name = "MashedPotatoes"
        this.ingredients = {"potato" : 1}
    }
}

class Steak extends Dish {
    constructor(){
        super(7);
        this.name = "Steak"
        this.ingredients = {"meat" : 1}
    }
}

class SteakAndFries extends Dish {
    constructor(){
        super(9);
        this.name = "SteakAndFries"
        this.ingredients = {"meat" : 1, "potato" : 1}
    }
}

async function test() {
    const kitchen = new Kitchen();
    kitchen.addToFridge([
        new Ingridient('potato', 1),
        new Ingridient('spaghetti', 1),
        new Ingridient('meat', 3),
        new Ingridient('tomato', 2)
    ])

    try{
        kitchen.order(new Bolognese()); // Bolognese extends Dish (cookingTime = 10)
        kitchen.order(new MashedPotatoes()); // MashedPotatoes extends Dish (cookingTime = 8)
        kitchen.order(new Steak()); // Steak extends Dish (cookingTime = 7)
    } catch(e){
        console.log('Error, catch: ', e);
    }
    // Feel free to experiment with various dishes and ingridients

    await kitchen.cookFastestOrder(); // Returns fastest dish to make
    await kitchen.cookAllOrders(); // Returns two dishes in array

    try{
        kitchen.order(new SteakAndFries()); // Throws Error: Not enough ingridients in fridge
    } catch(e){
        console.log('Error, catch: ', e);
    }
}

test();
