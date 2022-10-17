const express = require("express");
const app = express();

const authRouter = require('./routes/authRouter')

const PORT = process.env.PORT || 5000;

const logger = require ('./middlewares/logger')

const connectDB = require('./config/connectDB')
connectDB()

//middlewares
app.use(express.json())
//when u call 'api/auth' , use the logger middleware
app.use('api/auth' , logger)

app.use("/api/auth" , authRouter)

app.listen(PORT, (err) => 
  err
    ? console.error(err)
    : console.log(`The server is Running on port ${PORT}`)
)
