const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the Public project folder
app.use(express.static('website'));

// Setup empty JS object to act as endpoint for all routes
projectData = {};

/* Initialize all routes */

//GET
app.get('/all', (req, res) => {
    res.send(projectData);
})

// Post
app.post('/addWeatherData', (req, res) => {
    projectData = { ...req.body };
    res.json({ added: true });//for preventing error
});

//Run the server

const port = process.env.PORT || 5000;//for heruko support
app.listen(port, () => {
    console.log(`server running on port: ${port}`);
});