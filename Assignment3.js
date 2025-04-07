const createPassword = (n) => {
    const str = 'qwertyuiopasdfghjklzxcvbnm,QWERTYUIOPASDFGHJKLZXCVBNM1234567890!@#$%^'
    let bag = '';
    for (i = 0; i < n; i++) {
        const randomIndex = Math.floor(Math.random() * str.length)
        bag += str[randomIndex];
    }
    return bag

}

// setInterval(() => {
//     console.log(createPassword(5))
// }, 1000)

const countAlphabets = () => {
    let alphabets='abcdefghijklmnopqrstuvwxyz'
  let result = {};

  let = a = 0;
  let b = 1;
  for (i = 0; i < alphabets.length; i++) {
    result[alphabets[i]] = a
    let next = a + b;
    a = b;
    b = next;
  }
  return result;
}

const obj = countAlphabets()

console.log(obj)

let str='man'

const addAlphabets = (letter,str) => {
  
  let count = 0;
  for (let char of str) {
    if (char != ' ')  {
      const lowerCase = char.toLowerCase()
      if (letter[char.toLowerCase()] || lowerCase == 'a') { 
        count += letter[lowerCase]
        console.log(lowerCase, letter[lowerCase],count)
      }
      
    }
  }

  return count
}
const letter = countAlphabets() 
console.log(addAlphabets(obj, 'Ravai Sinagh78'))



// const maxAmountofMoney = (arr) => {
//   let m = arr.length;
//   let n = arr[0].length;
//   console.log(m);
//   console.log(n);
//   if (!m || !n) return arr;

//   for (let i = 0; i < m; i++) {
//     for (let j = 0; j < n; j++) {
//       if (i === 0 && j === 0) continue;
//       if (i === 0) arr[i][j] += arr[i][j - 1];
//       else if (j === 0) arr[i][j] += arr[i - 1][j];
//       else arr[i][j] += Math.max(arr[i][j - 1], arr[i - 1][j]);

//     }
//   }
//   return arr[n - 1][m - 1];
// };
// const arr = [[1, 7, 5, 2], [5, 12, 3, 6], [100, 9, 23, 16], [16, 4, 5, 9]]

// console.log(maxAmountofMoney())


const arr = [[1, 7,[6,2,4], 2], [5, 12,[1,2,3], 3,[4,5,6], 6], [100, 9,[1], 23, 16], [16, 4,[2,3] ,[5,6,7],[1,2],5, 9]]

const newarray = arr[0][2];

console.log(newarray)
const maxFrequencyArray = (arr) => {
  let result = [];
  for (let i in arr) {
    if(arr[i]) arr[i]++
        else arr[i] =1
  }
  result=arr[i]
  }

