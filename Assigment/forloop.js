
function a(a,b,c){

    console.log(a,b)

    return c

}

let a =10;
let b = a;

a =20
console.log(a,b)


// let arr1 = [1,2,[1,2,3,4]]
// let arr2 = [...arr1]// Shallow Copy
// let arr2 = JSON.parse(JSON.stringify(arr1));// Deep Copy


// arr1[2][0] =100

// console.log(arr1,arr2)

// let arr1 = {
//     name:'a',
//     age:1,
//     b:{
//         name:'abc',
//         age:{
//             age:27}
//         }
//     }
// // let arr2 = {...arr1}// Solo Copy
// let arr2 = JSON.parse(JSON.stringify(arr1));// Deep Copy Copy


// arr2.b.name= 'ravi'

// console.log(arr1)
// console.log(arr2)



// const abc = (a,b,c,d,...e)=>{

//     console.log(a,b,c,d,e)
// }

// abc(1,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4)

// const obj ={ id: 1, name: "John Doe", age: 30, city: "New York" }
// const arr = [1,2,3,4]


// const [a,...b] = arr

// console.log(b)

// const {city,age} = obj

// console.log(city)


const arr = [1,2,3,4,5]

// for(let i=0;i<arr.length;i++){
//     console.log(i,arr[i])
// }

// Print value and Index
// for(let i in arr){
//     console.log(i,arr[i])
// }

//Print Only Values
// for(let char of arr){
//     console.log(char)
// }


// let str ='Hello World ';

// const fre = (str)=>{

//     const obj = {};

//     for(let char of str){
//         if(obj[char]) obj[char]++
//         else obj[char] =1
//     }

//     const arr = Object.entries(obj)
//     // 'H: 1, e: 1, l: 3, o: 2, W: 1, r: 1, d: 1'
// let bag=''
// for(let i in arr){
//     if(arr[i][0]!==' ') bag+=arr[i][0]+':'+arr[i][1]+' '
// }
//     return bag
// }

// // H:1 e:1 l:3 o:2 W:1 r:1 d:1 


// console.log(fre(str))