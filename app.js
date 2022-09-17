const express = require('express');
const cors = require('cors');
const app = express();
// const corsOptions ={
//     origin:'http://localhost:3000/', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
app.use(cors());
const errorMiddleware = require('./Middleware/Error')

const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
// const cloudinary=require('cloudinary')
// const fileUpload =require('express-fileupload')

app.use(express.json({
    limit: '50mb'
  }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true
}))
app.use(cookieParser());


// app.use(fileUpload());


dotenv.config({path:'E\\Educational resources\\4th Semester\\Database Management\\Project\\blood-bank-manager-server\\config\\config.env'}); 


//importes all routes
const donorRoute = require('./Routes/donorRoute');



app.use('/api/v1', donorRoute);



// app.use(express.static(path.join(__dirname,'../front-end',)))
// app.get('*',(req,res)=>{
// res.sendFile(path.resolve(__dirname, '../front-end/build/index.html'))

// })

//Middleware to handle erros
app.use(errorMiddleware)

module.exports = app;