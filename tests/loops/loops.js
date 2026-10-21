// for of

// while
let i = 10;
while(i < 10) {
    console.log(i);
    i++;
}
// do while
do{
    console.log(i);
    i++;
} while (i < 10);


// for -- to work with arrays
for(let i = 0; i < 10; i++){}
// forEach
let arr = [11421, 2351, 2613, "test", 5, 6, 7]
arr.forEach((value, index, arr) => {
    console.log(value);
    console.log(index);
    console.log(arr);
}
)
// for in -- to work with objects


