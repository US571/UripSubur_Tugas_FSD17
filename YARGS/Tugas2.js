const fs = require('fs');

const path=require('path');
const yargs = require('yargs');
const {hideBin} = require('yargs/helpers');

const dirPath ='./data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

const DataPath ='./data/contact.json';
if(!fs.existsSync(DataPath)){
    fs.writeFileSync(DataPath,'[]','utf-8');
}

const contact = {name,mobile,email};
const file = fs.readFileSync('data/contact.json','utf-8');
const contacts = JSON.parse(file);
contacts.push(contact);
fs.writeFileSync('data/contact.json',JSON.stringify(contacts));

yargs (hideBin(process.argv))
.command({
    command:"add",
    describe:'add new contact',
    builder:{
        name:{
            describe:'contact Name',
            demandOption:true,
            type:'string'

        },
        email:{
            describe:'contact email',
            demandOption:false,
            type:'string'
        },
        mobile:{
            describe:'contact mobile phone number',
            demandOption:true,
            type:'string'
        },
    },
    handler(argv){
        const contact={
        name:argv.name,
        email:argv.email,
        mobile:argv.mobile,
        };
    console.log(contact);
    },
})
.demandCommand()
.parse();