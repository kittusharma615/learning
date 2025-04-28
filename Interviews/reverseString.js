
const str = "hello world";

function reverseString(str) {
    return str.split('').reverse().join('');
}

console.log(reverseString(str));



const str1 = "hello world";

function reverseStringManually(input) {
    let reversed = "";
    for (let i = input.length - 1; i >= 0; i--) {
        reversed += input[i];
    }
    return reversed;
}

console.log(reverseStringManually(str1));


// ✅ Reverse only even numbers in an array (keep odd numbers in place).



const arr = [2, 5, 7, 3, 4, 6, 9, 10, 13, 15, 17];

function reverseEvenNumbersKeepOdd(input) {
    // Step 1: Collect even numbers in reverse order
    let evens = [];

    for (let i = input.length - 1; i >= 0; i--) {
        if (input[i] % 2 === 0) {
            evens.push(input[i]);
        }
    }

    // Step 2: Build the new array
    let result = [];

    for (let i = 0; i < input.length; i++) {
        if (input[i] % 2 === 0) {
            // Take from reversed evens
            result.push(evens.shift());
        } else {
            // Keep odd number as it is
            result.push(input[i]);
        }
    }

    return result;
}

console.log(reverseEvenNumbersKeepOdd(arr));


