

let num = 266219;
num = new String("266219");
console.log(num);

console.log(typeof num);
console.log(num.split(''));

let result = 1;
for (let i = 0; i < num.length; i++){
    result = result * num[i];
}
console.log(result);

let newResult = result ** 3;
String(newResult).slice(0,2);
console.log(Math.floor(newResult / 100000000));