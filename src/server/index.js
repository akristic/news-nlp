const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const AYLIENTextAPI = require('aylien_textapi');
const app = express()


let textapi = new AYLIENTextAPI({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
  });

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
app.get('/nlp', function (req, res) {
    textapi.sentiment({
        'text': 'John is a very good football player!'
      }, function(error, response) {
        if (error === null) {
          console.log(response);
        }
      });
})
