const express = require('express')
const app = express()
require("dotenv").config()
// ---connect to database---
const dbConnect = require('./database/database')
dbConnect()

// ---set up body parser middleware---
app.use(express.json({ extended: false }))

// ---define routes---
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/pages', require('./routes/pages'))
app.use('/api/forms', require('./routes/forms'))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


//const APP_PORT = process.env.APP_PORT || 4000
app.listen(process.env.APP_PORT || 4000, () => {
 //console.log(`Running server on http://localhost:${process.env.APP_PORT}`)
})
