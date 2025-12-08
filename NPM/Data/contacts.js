const fs = require ("fs");
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
