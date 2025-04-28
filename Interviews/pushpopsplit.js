let array=[1,2,3,4,5]


let newArray=[];
let digitToAdd=6;

for(let i =0; i<=array.length;i++){
    newArray[array.length]=array[i]
}

newArray[array.length]=digitToAdd
console.log(newArray)

//Remove the element by index//

let newArrayAfterDelete = [];
let indexToDelete = 3;

for (let i = 0, j = 0; i < array.length; i++) 
    {
        newArrayAfterDelete[j] = array[i];
        j++;
    }

console.log("Array after deleting the 3rd element:", newArrayAfterDelete); // Output: [1, 2, 4, 5]

