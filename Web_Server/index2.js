const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const port = 3000
const fs=require('fs')
const {check, validationResult, body}=require('express-validator')
const pool = require("./db")

//menampilkan data di PosgreSQL
app.get('/contact/detail', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users Urip Subur')
    res.render('detail', {
      title: 'List Detail',
      users: result.rows
    })
  } catch (err) {
    console.error(err)
    res.status(500).send('Database error')
  }
})

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})

//information using EJS
app.set('view engine','ejs')
app.use(expressLayouts)

app.use(morgan('dev'))

app.use(express.static('public'))
app.use(express.urlencoded())

app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

const checkDuplicate = (name) => {
  const contacts = loadContact();
  return contacts.find((contact)=> contact.name ===name);
}

const loadContact=()=>{
  const file=fs.readFileSync('./data/contacts.json','utf-8');
  const contacts=JSON.parse(file);
  return contacts;
};

const saveContacts = (contacts) => {
  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
}

const addContact = (contact) => {
  const contacts = loadContact()
  contacts.push(contact)
  saveContacts(contacts)
}

// const addContact = async (contact) => {
//   const (name, mobile, email) = contact()
//   await pool.query(
//     `INSERT INTO contacts(name, mmobile, email) VALUES ($1$2$3)`,
//     [name, mobile, email]
// )}

 const updateContacts = (newContact) =>{
      const contacts = loadContact();
      const filtered = contacts.filter(
            (contact) => contact.name.toLowerCase() !== newContact.prevName.toLowerCase()
      );     
      delete newContact.prevName
      filtered.push(newContact)
      saveContacts(filtered)
 }

//Untuk mengambil file html
app.get('/', (req, res) => {
  
  // res.sendFile('./index.html',{root: __dirname})
  res.render('index',
    {
      name:'Urip Subur',
      title:'Web Server EJS',
      layout:'layout/main-layouts',
})
})

console.log(2);


app.get('/about', (req, res) => {
  res.render('about',{
    layout:'layout/main-layouts',
    title:'About Page',
  })
})

app.get('/contact', (req, res) => {
  const contacts= loadContact();
  res.render('contact',{
    layout:'layout/main-layouts',
    title:'Contact',
    contacts,
  })
})


//untuk menambah data
app.get('/contact/add', (req, res) => {
  res.render('form',{
    layout:'layout/main-layouts',
    title:'Add Contact',
  })
})

//data contact process
app.post('/contact',[
  body('name').custom((value) => {
    const dupData = checkDuplicate(value)
    if(dupData){
      throw new Error('Contact Name Exist')
    }
    return true
  }),
  check('email', 'E-Mail is not Valid').isEmail(),
  check('mobile','Mobile is not Valid').isMobilePhone('id-ID')
] ,(req, res) =>{
  const errors = validationResult(req);
    if(!errors.isEmpty()) {
      res.render('form',
      {
        layout: 'layout/main-layouts',
        title: 'Add New Data Form',
        errors: errors.array(),
      })
    }else{
      addContact(req.body)
      res.redirect('/contact')
    }
})


app.get('/detail', (req, res) => {
  const contacts= loadContact();
  res.render('detail',{
    layout:'layout/main-layouts',
    title:'Detail Contact',
    contacts,
  })
})

const findContact=(name)=>{
  const contacts=loadContact();
  return contacts.find(c=>c.name.toLowerCase()===name.toLowerCase());
};

//Untuk menghapus data kontak
const deleteContact = (name)=>{
  const contacts = loadContact();
  const newContact = contacts.filter(
    (contact) => contact.name.toLowerCase() !== name.toLowerCase
    ()
  );
  saveContacts(newContact)
};

//Untuk mengubah data kontak
app.get('/contact/update/:name', (req, res) => {
  const contact=findContact(req.params.name)
  res.render('edit-contact',{
    title:'Ubah Data Contact',
    layout:'layout/main-layouts',
    contact
  })
})

app.post('/contact/edit',[
  body('name').custom((value, {req}) => {
   const dupData = checkDuplicate(value)
   if(value!==req.body.prevName && dupData){
   throw new Error ('Contact Name Exist')
  }
    return true
  }),
  check('email', 'E-Mail is not Valid').isEmail(),
  check('mobile','Mobile is not Valid').isMobilePhone('id-ID')
] ,(req, res) =>{
  console.log (req.body)
  const errors = validationResult(req);
    if(!errors.isEmpty()) {
      res.render('edit-contact',
      {
        layout: 'layout/main-layouts',
        title: 'Edit Data',
        errors: errors.array(),
        contact: req.body
      })
    }else{
      updateContacts(req.body)
      res.redirect('/contact')
    }
})
  
app.get('/contact/:name', (req, res) => {
  const contacts=findContact(req.params.name);
  res.render('detail',{
    layout:'layout/main-layouts',
    title:'Detail Contact',
    contacts,
  })
})

app.get('/contact/delete/:name', (req, res) => {
  const contacts=findContact(req.params.name);
  if(!contacts){
    res.status('404')
    res.send('404')
  }else{
  deleteContact(req.params.name)
  res.redirect('/contact')
  }
})

// app.get('/about', (req, res) => {
//   //res.send('Hello!')
//   // res.sendFile('./about.html',{root: __dirname})
//   res.render('about')
// })

// app.get('/contact', (req, res) => {
// //   res.sendFile('./contact.html',{root: __dirname})
//   res.render('contact',{title:'Contact Page'})
// })


// app.get('/product/:id', (req, res) => {
//   res.send('product id : '+ req.params.id)
// })

// app.get('/product/:id/category/:idCat', (req, res) => {
  // res.send('product id : '+ req.params.id +'<br></br>'
  // + 'category id : ' + req.params.idCat)})
  // res.send(`product id : ${req.params.id} <br>category id :
  // ${req.params.idCat}`)})
app.get('/product/:id', (req, res) => {
  res.send(`product id : ${req.params.id} <br>category id :
  ${req.query.category}`)
})

app.use('/', (req, res) => {
  res.status(404)
  res.send('Page Not Found : 404')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

