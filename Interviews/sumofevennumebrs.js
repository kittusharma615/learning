// Extra: Sum of even numbers in an array

const even=[1,2,3,4,5,6,7,8,9,10]

const sumOfEvenNumber=(arr)=>{
    let sum=0;
    
    for (i=0;i<=arr.length;i++){
        if(arr[i]%2 === 0){
            sum+=arr[i];
        }
    }
return sum
}

console.log(sumOfEvenNumber(even))


// ✅ Sum of digits of a number (e.g., 123 → 1+2+3 = 6).

const digits = 123456789;
const strNum = digits.toString();  // Convert number to string

const sumOfDigitsNumber = (strNum) => {
    let sum = 0;
    for (let i = 0; i < strNum.length; i++) {  // Loop until less than strNum.length
        sum += parseInt(strNum[i]);  // Add each digit
    }
    return sum;
}

console.log(sumOfDigitsNumber(strNum));
