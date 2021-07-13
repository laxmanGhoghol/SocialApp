const express = require("express")
const app = express()
const helmet = require('helmet')
const morgan = require('morgan')
const dotenv = require('dotenv')
const mongooes = require('mongoose')
const { json } = require("express")
const authRoute = require("./routes/auth")

dotenv.config();
mongooes.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected');
});

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

app.use("/api/auth", authRoute)

app.listen(8100, () => {
    console.log('running');
});