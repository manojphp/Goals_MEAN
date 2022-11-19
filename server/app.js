const express = require('express')

const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const { DB_URL } = require('./config.json')
const usersRouter = require('./routers/usersRouter')
const goalsRouter = require('./routers/goalsRouter')

const app = express();

mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('DB connected')
        app.listen(3000, () => console.log('Listening on 3000...'))
    })
    .catch((e) => {
        console.error(e)
    })

//middleware
// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.use(cors({
    origin: '*'
}));
//app.use(express.json())

//routes
app.get("/api/status", function(req, res) {
    res.status(200).json({ status: "UP" });
});
app.use('/users', usersRouter)
app.use('/goals', goalsRouter)

app.use(function(err, req, res, next) {
    res.status(400).json({ success: false, data: err.message })
})