// Challenge 2: Remove duplicates from an array

const dup = [10, 12, 13, 10, 13, 13, 45];

let duplicates = [];  // Array to store duplicates

for (let i = 0; i < dup.length; i++) {
    for (let j = i + 1; j < dup.length; j++) {
        if (dup[i] === dup[j] && !duplicates.includes(dup[i])) {
            duplicates.push(dup[i]);
        }
    }
}

console.log(duplicates); 