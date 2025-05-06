// Find the Largest Number in an Array: Write a function that takes an array of numbers and returns
// the largest number.

// let arr=[10,9,32,9,56,4,1]
// const largestNumber =(arr)=>{
// let max = -Infinity;
// for(let i in arr){
//     if(arr[i] > max) {
//         max=arr[i];
//     }
// }
// return max;
// }

// console.log(largestNumber(arr))

//  Write a function to calculate the sum of all elements in an array.

// let arr=[10,9,32,9,56,4,1]
// const sumofAll =(arr)=>{
// let max = arr[0];
// for(let i in arr){
//         max+=arr[i];
// }
// return max;
// }

// console.log(sumofAll(arr))

// Write a function to reverse the elements of an array without using built-in
// reverse() method.

// let arr=[10,9,32,9,56,4,1]
// const reverseArray =(arr)=>{
// let index =0
// for(let i=arr.length-1;i>=0;i--){
//     arr[index]=arr[i]
//     index++
// }
// return arr;
// }

// console.log(reverseArray(arr))

// Remove Duplicates from an Array:Write a function to remove duplicate elements from an array.


// let arr=[10,9,10,9,56,4,1,56]
// const RemoveDuplicateArray =(arr)=>{
// const obj={};
// for(let i of arr){
//     if(obj[i]){
//         obj[i]++
//     }
//     else obj[i]=1
// }

// const newArray=Object.keys(obj);
// return newArray

// }

// console.log(RemoveDuplicateArray(arr))

// Find the Intersection of Two Arrays: Write a function that takes two arrays and returns a new array
// containing elements common to both arrays.


// const arr1=[1,2,3,4,6,7]
// const arr2=[5,6,7,8,7,4]
// const arr3=[]

// function IntersectionArray(arr1,arr2,arr3){

    
// for(let i in arr1){
//     arr3.push(arr1[i])
//     arr3.push(arr2[i])
// }
//     // arr3=[...arr1,...arr2]     another method

//     return arr3
    
// }

// console.log(IntersectionArray(arr1,arr2,arr3))


// Array Chunking: Write a function that splits an array into chunks of a specified size.


const arr=[1,2,2,3,3,3,4,4,4,4,5,5,5,5,5]
const target =9

const arrayofChunks =(arr)=>{
    let empty=[];
    let count =1
    for(let i=0;i<=arr.length;i++){
        let chunk=[];
      for(let j=i;j<count+i;j++){
       chunk.push(arr[j])
      }
      count++
      empty.push(chunk)
    }
    
    return empty
    
    }
    
    console.log(arrayofChunks(arr))