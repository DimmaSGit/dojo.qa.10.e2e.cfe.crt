const age = 'NaN'
const forbidMessage = "You can't coming"
const acceptMessage = "You may coming"

if (age < 14) {
    console.log(`${forbidMessage} come with your Parents`);
}
else if (age < 18) {
    console.log(`${forbidMessage}`);
}
else if (age >= 21) {
    console.log(`${acceptMessage}`);
} else {
    console.log('please provide Valid ID');
}

