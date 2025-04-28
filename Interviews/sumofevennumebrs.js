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