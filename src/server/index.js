// Require
var path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
// const fetch = require('node-fetch') TO-DO

// Express
const app = express()
app.use(express.static('dist'))
console.log(__dirname)

// .env
const dotenv = require('dotenv')
dotenv.config()

// API Key
const textapi = process.env.MC_API_KEY

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors
const cors = require('cors')
app.use(cors());

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Routes
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// Retrieve projectData
app.get('/data', function (req, res) { // TO-DO Verify
    console.log(projectData)
    res.send(projectData)
    console.log("data retreieved")
})

// Designates what port the app will listen to for incoming requests
app.listen(3001, function () {
    console.log('Example app listening on port 3001!')
})

app.post('/add', function (req, res) {
    const inc = req.body
    for (const info in inc) {
        projectData[`${info}`] = inc[`${info}`]
    }
    res.send(projectData)
  })