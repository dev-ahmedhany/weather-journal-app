/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// API Key for OpenWeatherMap API
const key = "c84500c5a2d1d94bf1c27c05ae5737f7";

//mini jqerey
let $ = (id) => { return document.getElementById(id); }

//html elements
const docZip = $('zip');
const docFeelings = $('feelings');
const docDate = $('date');
const docTemp = $('temp');
const docContent = $('content');
const docGenerate = $('generate');

/* functions */

/* GET Web API Data*/
const getTemperature = async (baseURL, code, key) => {
    const response = await fetch(baseURL + code + ',us' + '&APPID=' + key);
    try {
        return await response.json();
    }
    catch (error) {
        console.log(error);
    }
}

/* POST data */
const postData = async (url, data) => {
    const postRequest = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(data),
    });
    try {
        await postRequest.json();
    }
    catch (error) {
        console.log(error);
    }
}

/* GET Project Data */
const updateHTML = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        docDate.innerText = allData.date;
        docTemp.innerText = allData.temperature;
        docContent.innerText = allData.user_response;
    }
    catch (error) {
        console.log(error);
    }
}

const generate = () => {
    getTemperature(baseURL, docZip.value, key)
        .then((data) => {
            // Create a new date instance dynamically with JS
            let d = new Date();
            let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

            postData('/addWeatherData', { temperature: data.main.temp, date: newDate, user_response: docFeelings.value })
                .then(() => {
                    updateHTML();
                })
        });
}

// Event listener to HTML DOM element
docGenerate.addEventListener('click', generate);