const express = require("express")
const colors = require("colors")
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require("./config/db")

//dotenv config
dotenv.config()

//mongodb connection
connectDB();

//rest object
const app = express()

//middlewares
app.use(express.json()) //to avoid errors related to parsing or should use body parser package
app.use(morgan('dev'))

//routes
app.use('/api/v1/user',require('./routes/userRoutes'));
app.use('/api/v1/admin',require('./routes/adminRoutes'));
app.use('/api/v1/consultant',require('./routes/consultantRoutes'));

const port  = process.env.PORT || 8080
//listen port
app.listen(port,()=>{
    console.log(`server running in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`.bgCyan.white)
})