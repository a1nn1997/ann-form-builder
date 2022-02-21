const express = require('express')
const app = express()
//const path = require('path');
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

// server static assets if in production
if(process.env.NODE_ENV === 'production'){    
  app.use(express.static('client/build'))  // set static folder 
  //returning frontend for any route other than api 
  app.get('*',(req,res)=>{     
      res.sendFile (path.resolve(__dirname,'client','build',         
                    'index.html' ));    
  });
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
 console.log(`Running server on http://localhost:${PORT}`)
})
