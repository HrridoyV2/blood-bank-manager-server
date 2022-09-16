const app= require('./app');
const conncectDatabase=require('./config/database');
const dotenv=require('dotenv');

//setting up config files
dotenv.config({path:'E\\Educational resources\\4th Semester\\Database Management\\Project\\blood-bank-manager-server\\config\\config.env'}); 

//connecting to Database
conncectDatabase();


const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is Running on port:${process.env.PORT}`);
})

