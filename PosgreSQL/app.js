//call express module
const express = require('express')
//call express library
const app = express()
//call database
const pool = require("./db")

const port = 3000


//call server
app.listen(port, () => {
    console.log(`Example App Listening on Port ${port}`)
})

//Insert Data to Database
app.get("/", async (req,res)=>{
    try {
        const name = "USA"
        const mobile = "08176454520"
        const email = "urip.sbr@gmail.com"
        const newContact = await pool.query(`INSERT INTO contact values
        ('${name}','${mobile}','${email}') RETURNING *`)
        res.json(newContact)
    }   catch (err) {
        console.error(err.message)
    }
})