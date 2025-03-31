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
    let a = 0;
    let b = 1;
    let z = 36;
    for (i = a; i <= z; i++) {
    }
}