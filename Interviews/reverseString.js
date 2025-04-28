
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



const arr=[2,5,7,3,4,6,9,10,13,15,17]



function reverseEvenNumber(input) {
    let reversed = arr[0];
    for (let i = arr.length - 1; i >= 0; i--) {
        if(arr[i])
        
        reversed += input[i];
    }
    return reversed;
}

console.log(reverseEvenNumber(str1));


