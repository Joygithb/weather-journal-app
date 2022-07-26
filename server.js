// Setup empty JS object to act as endpoint for all routes
projectData={};
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app= express();
/* Middleware*/
const bodyParser= require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors= require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 5500;
const server= app.listen(port, ()=> {
    console.log(`server running on localhost: ${port}`);
})

//setting up get route
app.get('/all', passData)
function passData(req,res){
    res.send(projectData)

};
//setting up post route
app.post('/add', addData);
function addData(req,res){
    let newDataEntry= {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    }
    projectData= newDataEntry;
    res.send(projectData)
}

// (July, 2022) classroom.udacity.com