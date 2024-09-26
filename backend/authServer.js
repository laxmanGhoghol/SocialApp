const express = require("express")
const app = express()
const helmet = require('helmet')
const morgan = require('morgan')
const dotenv = require('dotenv')
const mongooes = require('mongoose')
const authRoute = require("./routes/auth")
const cors = require('cors')

dotenv.config();
mongooes.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to database...');
});

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use(cors({
    origin: "*"
}))

//route
app.use("/api/auth", authRoute)

app.listen(8100, () => {
    console.log('Authentication API is running...');
});