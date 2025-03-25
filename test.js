// let, var , const

// let and const are local scope varibale
// var global scope variable


// if(0==0){
//     console.log(1)
// }
// else if(0==0){
//     console.log(2)
// }
// else if(0==1){
//     console.log(3)
// }
// else if(0==0){
//     console.log(4)
// }

// else{
//     console.log(false)
// }


// switch(0){
//     case(0):{
//         console.log(0)
//         break
//     }
//     case(1):{
//         console.log(1)
//         break
//     }
//     case(2):{
//         console.log(2)
//         break
//     }
//     default:{
//         console.log('first')
//         break
//     }
// }



// let sum =0;
// let i=0;
// sum =sum+i
// i=1;
// sum =sum+i
// i=2;
// sum =sum+i

// console.log(sum)

// let bag =''
// for(let i=0; i<5; i=i+1){
    
//     bag=bag+i+' '
// }
// console.log(bag)


// console.log(1+2+'abc'*2*2)


// for (let j=0; j<5;j++){
    
//     let bag =''
// for (i=0;i<=5;i++){
//     bag=bag+i+' '
// }
// console.log(bag)

// }

// let row =3;
// let col =4;
// let count =0;

// for(let i=0;i<row;i++){
//     let bag=''
//     for(let j=0;j<col; j++){
//         bag=bag+count + ' ';
//         count++
//     }
//     console.log(bag)
    
// }



let n =5;
let count =0;

for(let i=0;i<n;i++){
    let bag=''
    for(let j=1;j<=i+1; j++){
        bag=bag + j;
        count++
    }
    console.log(bag)
    
}