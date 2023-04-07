
const dotenv = require("dotenv")
const cookieParser = require('cookie-parser');
const express = require('express')

const cors = require('cors')
const app = express();



const port = process.env.PORT || 4000

app.use(cors({
  origin: ['http://localhost:4000/', 'http://localhost:3000/']
}));
const router = require('../src/router/router');
const wrouter = require('../src/router/weatherRoute')
require('./db/Conn')
dotenv.config({path:"./config.env"})
app.use(express.json());
app.use(cookieParser());




app.use("/users", router);
app.use("/api/v1", wrouter);


  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  })