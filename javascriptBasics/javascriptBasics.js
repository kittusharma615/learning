// let a = 10;
// let b = 20;

// if(a>b){
//     console.log(a)//false
// }
// if(a<b){
//     console.log(b)//true
// }
// if(a!=b){
//     console.log(a,b)//true
// }
// if(a>b){
//     console.log(a)///false
// }
// else{
//     console.log('first')
// }




// let a = 10;
// let b = 20;

// if(a!=b){
//     console.log(a)//true
// }
// else if(a<b){
//     console.log(b)//true
// }
// else if(a!=b){
//     console.log(a,b)//true
// }
// else if(a>b){
//     console.log(a)///false
// }
// else{
//     console.log('first')
// }

// let a =10;
// let b=20;
// let c = 30;

// if(a>b){
//     if(a>c){
//         console.log(a)
//     }
// }
// else if(b>a){
//     if(b>c){
//         console.log(b)
//     }
// }
// else{
//     console.log(c)
// }

// let a;
// if(a==false){
//     console.log(true)
// }
// else{
//     console.log(false)
// }

// console.log(typeof null ,typeof undefined)

// And Operator mean All condition are true mean true
// console.log(true && true && true && false)

// Or Operator mean Any one  condition is true mean true
// console.log(false || false || true || false)


// console.log((true && true)&& false)
// console.log((true && !true)&& false)

// let a;

// if(!a){
//     console.log(true)
// }
// else{
//     console.log(false)
// }


// let emailRegex = /^[A-Za-z]+$/
// let email = 'ravisngh12321'

// const Test = emailRegex.test(email)

// console.log(Test)


let arr = [1,2,3,4,5];

let arr1=[
    {name:'a',age:12},
    {name:'b',age:12},
    {name:'c',age:13},
]

// let MapFunction = arr.map((i,index)=>{
//     return index
// })


// let MapFunction = arr1.map(({name,age},index)=>{
//     return `${name}, ${age}`
// })

// console.log(MapFunction)


// function doubleNumbers(arr){
//     return  arr.map((item)=> item*2)
     
//   }
//   console.log(doubleNumbers([2, 5, 100]));

// const filter = arr1.filter(({age})=>{
//     return age>12
// })

// console.log(filter)

// let sumofAge = arr1.reduce((sum,{age})=>{
//     // console.log(sum,age)
//     return sum+age
// },0)

// console.log(sumofAge)

// const sum = arr.reduce((s,a)=>{
//     return s+a
// })

// console.log(sum)


// const input = [1, -4, 12, 0, -3, 29, -150];

// const addPositiveNumbers= input.filter((num)=>num>0).reduce((sum,add)=>sum+add)

// console.log(addPositiveNumbers)


// const input = [1,1,1,1];
// let a=input.length;
// console.log(a)

// const median=input.reduce((sum,add)=>((sum+add)))

// console.log(median/a)


// const input = "George Raymond Richard Martin";

// const nameInitials=input.split('').filter((i)=>i==i.toUpperCase()).join('')

// console.log(input.split('').filter((i)=>i==i.toUpperCase()).join(''))


const input = [
    { name: "John", age: 13, },
    { name: "Mark", age: 56, },
    { name: "Rachel", age: 45, },
    { name: "Nate", age: 67, },
    { name: "Jennifer", age: 65, },
];


    const ageDiff=input.map((i)=>i.age)

    const min=Math.min(...ageDiff)
    const max=Math.max(...ageDiff)
    const med=max-min
    const ageDifference=[min,med,max]

    // console.log(ageDifference)

    const input2 = "Every developer likes to mix kubernetes and javascript";
   
   const numeronyms=(word)=>{
if(word.length<=3){

}
   }
   
   
    Result
    "E3y d7r l3s to mix k8s and j8t";

