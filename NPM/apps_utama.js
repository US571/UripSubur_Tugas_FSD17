const fs = require("fs");
const readline = require ('readline')

const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});

const dirPath ='./Data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

const DataPath ='./Data/contacts.json';
if(!fs.existsSync(DataPath)){
    fs.writeFileSync(DataPath,'[]','utf-8');
}
const questions=(ask) => {
    return new Promise((resolve,reject)=>{
        rl.question(ask, (inputVariable)=>{
            resolve(inputVariable);
        })
    })
};

const main = async()=>{
    const name = await questions('What is your name?');
    const mobile = await questions('your mobilenumber?');
    const email = await questions('your email?');
const contact = {name,mobile,email};
const file = fs.readFileSync('Data/contacts.json','utf-8');
const contacts = JSON.parse(file);
contacts.push(contact);
fs.writeFileSync('Data/contacts.json',JSON.stringify(contacts));
console.log('Thank you!');
rl.close();
}
;
main()
        


// rl.question("What is your name? ", (name) => {
//     rl.question("you mobile number?? ", (mobile) => {
//         const contact = {name,mobile};
//         const file = fs.readFileSync("Data/contacts.json","utf-8");
//         const contacts = JSON.parse(file);
//         contacts.push(contact);
//         fs.writeFileSync("Data/contacts.json",JSON.stringify(contacts));
//         console.log('Terimakasih sudah memasukkan data!');
//         rl.close();
//     })
// })