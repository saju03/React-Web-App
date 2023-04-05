const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('./database/connection')
const authRoutes = require('./Routes/authRoutes')
const adminRoutes = require('./Routes/adminRoutes')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const app = express();
const path = require('path')
app.use(express.static(path.join(__dirname, 'images')));



app.use(bodyParser())
app.use(
    cors({
    origin:['http://localhost:3000'],
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    credentials:true,
}))

app.use(cookieParser())
app.use('/',authRoutes)
app.use('/admin',adminRoutes)
app.use(express.json())


app.listen(4000,()=>{
    console.log('server running on port 4000');
})
