/* Global Variables */
let baseURL= 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey= '&appid=526f48b329259dd9916e5eecc59a967d&units=imperial';

//Create a new date instance dynamically with JS
let d = new Date();
let newDate = 'Date: '+ d.getMonth() +'/'+ d.getDate()+'/'+ d.getFullYear();

//add event listener for when the generate button is clicked
document.getElementById('generate').addEventListener('click',perform)

//This function collects data from user and server
function perform(event){
    const zipCode= document.getElementById('zip').value
    const userResponse= document.getElementById('feelings').value
    getWeatherData(baseURL, zipCode, apiKey)

//chain promise, to be executed after collecting all data
    .then(function(data){
        console.log (data)
        postData('/add', {date:newDate, temp:data.main.temp, content:userResponse})
    })
//chain another promise, to update the data on the app's UI
    .then (
        updateUI
    )
};

//setting up get request on client side to collect data from endpoint
const getWeatherData= async(baseURL, zip, key)=>{
    const response = await fetch (baseURL+zip+key)

//wait for response from weather map getting data from then return the data    
    try{
        const data= await response.json();
        console.log(data);
        return data;
    }
//if there's an error, display in console
    catch (error){
        console.log('error', error);
    }
}

//setting up post route on client side
const postData= async(url='', data={})=>{
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    try {
        const newData= await response.json();
        console.log(newData);
        return newData
    }catch(error){
        console.log('error', error);
    }
}
//show all data recieved from the server on the web page
const updateUI = async ()=>{
    const request= await fetch ('/all');

    try{
        const allData= await request.json()
        document.getElementById('date').innerHTML= allData.date;
        document.getElementById('temp').innerHTML=Math.round(allData.temp) +' degrees';
        document.getElementById('content').innerHTML= allData.content;
    } catch(error){
        console.log('error', error);
    }
}
//(July, 2022) classroom.udacity.com