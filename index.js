let express = require('express')
let cors = require('cors')
let mongoose = require('mongoose')
let session = require('express-session')
let app = express()
let routes = require('./routes/index')
let bodyParser = require('body-parser')
let path = require('path')
let multer = require('multer')

require('dotenv').config()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cors())
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false,
    cookie : {
        httpOnly : true,
        secure : false,  //for http, in case if https it should be true
        maxAge : null
    }
}))
app.use(express.static('assets'));
app.use(express.static('uploads'));

app.set('view engine', 'ejs');
// use multer here for file uploads


// mongo
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
// mongo

app.use('/api', routes)

app.get("/", async (req,res)=> {
    res.send("Hello world!")
})


let port = process.env.PORT || 5000
app.listen(port, ()=> {
    console.log("server is working and running on",port)
})