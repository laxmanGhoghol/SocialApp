const express = require("express")
const app = express()
const helmet = require('helmet')
const morgan = require('morgan')
const dotenv = require('dotenv')
const mongooes = require('mongoose')
const { json } = require("express")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")


dotenv.config();
mongooes.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected');
});

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)



app.listen(8800, () => {
    console.log('running');
});