//coremodule
//file.system
const fs = require("fs");

//Menuliskan string ke File (Synchronous)
fs.writeFileSync("tes.txt","Hello World secara Synchronous!")
// fs.readFile("tes.txt","utf-8",(err,data)=> {
// if (err) throw err;
// console.log(data);
// });

const readline = require("readline");

const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});

rl.question("What is your name? ", (name) => {
    console.log(`Thank you ${name}`);

    rl.close();
});