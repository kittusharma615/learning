
// const arr = [['Rohit', 27, 'Kit'], ['Mohit', 28, 'Sqilco'], ['M', 28, 'ABC'], ['Ram', 21, 'IIT']]
// const data = [
//     { name: 'Rohit', age: 28, college: 'kit' },
//     { name: 'Rohan', age: 28, college: 'XYZ' },
// ]


// const studentDetails = (arr) => {

//     for (let i in arr) {

//         console.log("<------------", 'Student Details', "---------------->")
//         console.log("Name -", data[i].name)
//         console.log("Age - ", data[i].age)
//         console.log("College -", data[i].college)
//         console.log()

//     }

// }

// console.log(studentDetails(data))


// const studentDetails =(arr)=>{

//     for(let i in arr){

//     console.log("<------------",arr[i][0],'---------------->')
//     console.log("Name -", arr[i][0])
//     console.log("Age - ", arr[i][1])
//     console.log("College -", arr[i][2])
//     console.log()

//     }

//     }

//     console.log(studentDetails(arr))

///Convert string to array
// let str = "Every developer need to do practice"

// const StringToArray = (str) => {
//     let arr = [];
//     let word = '';
//     for (let i of str) {
//         if (i != ' ') {
//             word += i;
//         }
//         else {
//             arr.push(word)
//             word = '';
//         }
//     }
//     arr.push(word)

// return arr

// }

// const Numeronyms = (arr)=>{
//     let bag = '';

//     for(let i in arr){
//         const start=arr[i][0]
//         const len=arr[i].length;
//         const end=arr[i][len-1]

//         if(len<=3){
//             bag+=arr[i]+' '            
//         }
//         else{
//             let lenvalue = len-2
//             bag+=start+lenvalue+end+ ' '
//         }
//     }
// return bag

// }

// const array = StringToArray(str) 

// console.log(Numeronyms(array))

// let str = "Every developer need to do to to practice"

// const StringToArray = (str) => {
//     let arr = [];
//     let word = '';
//     for (let i of str) {
//         if (i != ' ') {
//             word += i;
//         }
//         else {
//             arr.push(word)
//             word = '';
//         }
//     }
//     arr.push(word)

//     return arr

// }

// const firtLetterofString = (arr,target) => {
//     let bag = '';
//     for (let i in arr) {
// if(target==arr[i])        {
//     console.log('Present value index',i,'and Value',arr[i])
// }
//     }

//     return bag


// }
// const array = StringToArray(str) 
// console.log(firtLetterofString(array,'to'))




// let a =5;
// setInterval(()=>{
//  console.log(Math.random()*a)
// },1000)

// let a =5;
// setInterval(()=>{
//  console.log(Math.floor(Math.random()*a))
// },1000)

// const createPassword=(n)=>{
//     const str='qwertyuiopasdfghjklzxcvbnm,QWERTYUIOPASDFGHJKLZXCVBNM1234567890!@#$%^'
// let bag='';
//     for(i=0;i<n;i++ ){
// const randomIndex=Math.floor(Math.random()*str.length)
// bag+=str[randomIndex];
//     }
//     return bag

// }

// setInterval(()=>{
//     console.log(createPassword(5))
// },1000)

