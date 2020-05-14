var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
dotenv.config();
const AYLIENTextAPI = require('aylien_textapi');

let textapi = new AYLIENTextAPI({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
  });
const app = express()

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile('dist/index.html')
})

// Setup Server
const port = 8081;
const server = app.listen(port, listening);

function listening(){
    console.log('server running');
    console.log(`running on localhost: ${port}`);
}

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/nlp', async (req, res) => {
  try {
    console.log("::: try :::");
    const result = await textapi.sentiment({
      'text': 'John is a very good football player!'
    }, function(error, response) {
      console.log("::: func :::");
      if (error === null) {
          console.log("::: if :::");
          res.send(response);
      }
    });
  } catch (error){
    res.send(error);
  }
})

