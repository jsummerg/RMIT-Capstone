// Require
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
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
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/add', function (req, res) {
    projectData["agreement"] = req.body.data.agreement,
    projectData["confidence"] = req.body.data.confidence,
    projectData["score_tag"] = req.body.data.score_tag
    console.log(projectData)
    res.send(projectData)
  })