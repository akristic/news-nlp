const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mockAPIResponse = require('./mockAPI.js');
const cors = require('cors');
const AYLIENTextAPI = require('aylien_textapi');


let textapi = new AYLIENTextAPI({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
  });
const app = express()
app.use(express.static('dist'))
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());

console.log(__dirname)
// Setup Server
const port = 8081;
const server = app.listen(port, listening);

function listening(){
    console.log('server running');
    console.log(`running on localhost: ${port}`);
}

app.get('/', function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile('dist/index.html')
})
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/nlp', async (req, res) => {
  try {
    console.log(req.body);
    textapi.sentiment(req.body, function(error, response) {
      if (error === null) {
          res.send(response);
      }
    });
  } catch (error){
    res.send(error);
  }
})

