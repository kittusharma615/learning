
const arr = [12, 23, 34, 1, 2, 45,77]

const largestNumber = () => {
    let largest = arr[0];
    for (i = 1; i <= arr.length; i++) {
        if (arr[i] > largest) {
            largest = arr[i]
        }
    }
    return largest
}

// ✅ Find the largest odd number in an array.

const largestOddNumber = () => {
    let largest = -1;
    for (i = 1; i <= arr.length; i++) {
        if (arr[i]%2 !== 0 && arr[i] > largest) {
            largest = arr[i]
        }
    }
    return largest
}
console.log(largestOddNumber(arr))


// const arr = [12, 23, 34, 1, 2, 45];

// const largestNumber = () => {
//     let largest = arr[0];  // Start by assuming the first number is the largest
//     for (let i = 1; i < arr.length; i++) {  // Start from the second element
//         if (arr[i] > largest) {
//             largest = arr[i];  // Update largest if the current element is greater
//         }
//     }
//     return largest;  // After loop finishes, return the largest number found
// };

// console.log(largestNumber());  // Output: 45
