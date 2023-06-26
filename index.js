const express=require("express");
const app=express();
const {sequelize}=require("./config/db")
require('dotenv').config;
const {router}=require("./routes/employee.route")
app.use(express.json());
app.use(router)


const server=process.env.port||5700
app.listen(server,async()=>{
    try {
        await sequelize.authenticate();
        console.log("sql db is connected");
    } catch (error) {
        console.log(error);
        console.log("sql db is not connected");
    }
    console.log(`http://localhost:${server}`);
})