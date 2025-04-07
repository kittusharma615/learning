const obj = {
    "I": 1,
    "V": 5,
    "X": 10,
    "L": 50,
    "C": 100,
    "D": 500,
    "M": 1000,
}
const numeralNumber = (str) => {

    let count = 0;

    for (let i = 0; i < str.length; i++) {

        const currentValue = obj[str[i]];
        const nextValue = obj[str[i + 1]];

        if (currentValue < nextValue) {
            count -= currentValue;
        }
        else (currentValue > nextValue)
        count +=currentValue;


    }
    return count

}

// console.log(numeralNumber('MC'))


const findNumbers = (num) => {
    const numerals = {
        "I": 1,
        "V": 5,
        "X": 10,
        "L": 50,
        "C": 100,
        "D": 500,
        "M": 1000,
    }
    const a = Object.entries(numerals)
    console.log(a)
    const arr1=Object.values(numerals);
    const arr2=Object.keys(numerals);
    let count = 0;
    for (let i = 0; i < arr1.length; i++) {

        if (num>= arr1[i]) {
            count +=arr2[i];
        }
        else num -=arr1[i]
    }
    return count

}
console.log(findNumbers(3))
