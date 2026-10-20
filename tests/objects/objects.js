
const CAT = {
  meaw: () => {
    console.log("Meaw");
  },
  walk: () => {
    console.log("It walks");
  },
  eat: () => {
    console.log("It eats");
  },
};
CAT.meaw();
CAT.walk();
CAT.eat();

const object = {
  name: "Borys",
};

console.log(object.name);

function test() {}

const student = {
  fullname: "Pasha Dog",
  age: 21,
  education: ["Bachelor of CS", "Economics", "Architecture and Design"],
  study: () => console.log("I'm studying"),
  getMyDiplomas: () => student.education,
};

console.log(student.getMyDiplomas());

for (const key in student) {
  console.log(student[key]);
}

// forEach, find, filter, include
const _ = require("lodash");

const drink = [
  "Espresso",
  "Espresso_Macchiato",
  "Cappuccino",
  "Mocha",
  "Flat_White",
  "Americano",
  "Cafe_Latte",
];

const newDrink1 = drink;

console.log(drink);
console.log(newDrink1);

drink.push("some drink");

console.log(drink);
console.log(newDrink1);

const dog = {
  color: "red",
  name: "Georgy",
  owner: {
    name: "Dmyt",
    isActive: true,
  },
};

const catDog = dog;

console.log(dog);
console.log(catDog);
// adding the key
dog["age"] = 2;

console.log(catDog);
// deleting the key
delete dog["name"];

console.log(catDog);
// !!! in JS arrays and obj are using links NOT copies of the variables

// to make a real copy of an Array we can:
// use map()
const newDrink = drink.map((value, index, arr) => {
  return value;
});
console.log(drink);
console.log(newDrink);

drink.push("water");
console.log(drink);
console.log(newDrink);

// how to copy an Object?
// shallow copy - with rest operator

const shallowDog = { ...dog };
dog["bark"] = "woof!";
console.log(dog);
console.log(shallowDog);

// assigning new value
dog.owner.isActive = false;
console.log(dog);
console.log(shallowDog);
// this is the evidence of copy is shallow, deep copy inside the object not active

// deep copy - import from 'lodash' - const ... = _.cloneDeep()
const deepDog = _.cloneDeep(dog);

console.log(dog);
console.log(deepDog);

// const copyDog = JSON.parse(JSON,stringify(dog))
