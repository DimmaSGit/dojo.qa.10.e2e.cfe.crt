export function getVotingMessage(age){

if (!Number.isInteger(age) || age < 0) {
  return ("Age must be a non-negative integer");
}

if (age >= 18) {
  return "Ви можете голосувати.";
} else {
    return "Ви ще не можете голосувати."
}
}