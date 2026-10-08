myVariable;
// myLet;
// myConst;

function isExamPassed(studentScore) {
  if (typeof studentScore !== "number") {
    throw new Error("Invalid score: not a valid number");
  } else if (studentScore < 0 || studentScore > 100) {
    console.log("Invalid score: should be between 0 and 100");
  } else if (studentScore >= 75) {
    console.log("Passed");
  } else {
    console.log("Failed");
  }
}
isExamPassed(66);

var myVariable = "hi";
let myLet = "let";
const myConst = "const";

function sayHi() {
  console.log("Hello");
}
sayHi();

function isExamPassedRef(studentScore) {
  if (typeof studentScore !== "number") {
    throw new Error("Invalid score: not a valid number");
  } else if (studentScore < 0 || studentScore > 100) {
    return "Invalid score: should be between 0 and 100";
  } else if (studentScore >= 75) {
    return "Passed";
  } else {
    return "Failed";
  }
}

console.log(isExamPassedRef(77)); 

// Function declaration - uses hoisting, you can call it up top
function camelCase(x,y,z = 'default'){
    console.log("Say Hi!");
    console.log(x, y, z);
}
camelCase()

// function has it's own this.
function testThis(){
    this.arrow = 'testy'
    return this.arrow;
}
console.log(typeof testThis);
console.log(testThis());


// Function expression
const returnSomething = function(){

}

// arrow function - no hosting, TDZ error: 'can't access "arrow" before initialization'
// no it's own this.
(() => console.log('self calling')())

//  variable 
const arrow = () => console.log('self calling');
arrow()

const testReturn = () => 'this is qa senpai';
console.log(testReturn());

