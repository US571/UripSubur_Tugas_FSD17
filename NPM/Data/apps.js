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
    
//save data contact
const contacts = require ('./contacts')

const main = async ()=>{
    const name =await contacts.questions('What is your name?');
    const email=await contacts.questions('your email?');