// const yargs = require('yargs');
// const {hideBin} = require('yargs/helpers');

// const argv = yargs(hideBin(process.argv)).argv;

// console.log(argv);



const yargs = require('yargs');
const {hideBin} = require('yargs/helpers');


const contact = {name,mobile,email};
const file = fs.readFileSync('YARGS/contact.json','utf-8');
const contacts = JSON.parse(file);
contacts.push(contact);
fs.writeFileSync('YARGS/contact.json',JSON.stringify(contacts));

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