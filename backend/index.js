const express = require("express")
const app = express()
const helmet = require('helmet')
const morgan = require('morgan')
const dotenv = require('dotenv')
const mongooes = require('mongoose')
const { json } = require("express")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const uploadRoute = require("./routes/FileUpload")
const messageRoute = require("./routes/messages")
const conversationRoute = require("./routes/conversations")
const cors = require('cors')
const path = require('path')

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
app.use("/images", express.static(path.join(__dirname, "public/images")))
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/message", messageRoute)
app.use("/api/conversation", conversationRoute)
app.use("/api/upload", uploadRoute)



app.listen(8800, () => {
    console.log('Backend is running...');
});