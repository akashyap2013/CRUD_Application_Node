const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const route = require('./server/routes/router')
const connectDB = require('./server/database/connection');
const assetsPath=path.join(__dirname,'./assets')
// console.log(assetsPath)
const app = express();

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8080

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use(express.static(assetsPath))


// load routers
// app.use('/', require('./server/routes/router'))
app.use(route)

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});