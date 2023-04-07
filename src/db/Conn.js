const mongoose = require("mongoose");



// const DB = process.env.DATABASE1;
const DB = "mongodb+srv://myzaib:myzaib1@cluster0.gjmng3t.mongodb.net/mynewapp?retryWrites=true&w=majority"

 
mongoose.set('strictQuery', false);
mongoose.connect(DB).then(()=>{
    console.log("connectin sucess")
}).catch((err)=>{
    console.log("no connect");
})