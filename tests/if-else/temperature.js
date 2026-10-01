function temperatureValidator(temperature, mood) {

if (mood == 'fun'){
  if (temperature == 10)
    {console.log("wear Orange Penties")
  }
  if (temperature < 10) {
    console.log("wear a Jacket");
  }
  if (temperature >= 10) {
    console.log("wear a Sweater");
  }
}

if (mood == 'serius'){
    if (temperature == 10) {
    console.log("wear a Vest");
  }
  if (temperature < 10) {
    console.log("wear a Jacket");
  }
  if (temperature >= 10) {
    console.log("wear a Sweater");
  }
}}

temperatureValidator(10, 'fun')

const obj1 = {};
const obj2 = {}; 

const arr1 = [];
const arr2 = [];

console.log(obj1 == obj2)
console.log(arr1 == arr2);

console.log(18 == '18');
console.log(18 === '18');
console.log(18 !== 18);
console.log(18 !== '18');
console.log(18 != '18');

console.log(0 == false);
console.log(0 === false);
console.log(1 == true);
console.log(1 === true);
console.log(1 !== false);
console.log(1 == false);
console.log(1 != true);
console.log(1 != false);