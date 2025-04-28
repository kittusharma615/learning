
// const str='DADA'

// function isPalindrome(str) {
//     const reversed = str.split('').reverse().join('');
//     return str === reversed;
//   }

  
// console.log(isPalindrome(str))




const str1 = "love";
let isPalindrome = true;

for (let i = 0; i < str1.length / 2; i++) {
    if (str1[i] !== str1[str1.length - 1 - i]) {
        console.log(str1[str1.length - 1 - i])
        isPalindrome = false;
        break;
    }
}

if (isPalindrome) {
    console.log(`"${str1}" is a palindrome ✅`);
} else {
    console.log(`"${str1}" is NOT a palindrome ❌`);
}