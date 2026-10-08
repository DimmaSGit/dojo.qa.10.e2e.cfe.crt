// arrays

console.log(typeof []);

const arr = [];

const arr1 = Array()

const arr2 = Array.from('test')

// index based ,every array starts with index 0

const array = ['book1', 'book2', 'book3', 'book4']
console.log(array);
console.log(array.length);

// structure of data
const coffees = ['Espresso', 'Cappuccino', 'Espresso Macchiato', 'Mocha']

function orderCoffee(){
    for(const coffee of coffees){
        console.log(coffee);
    }
}
orderCoffee()