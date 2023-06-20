async function getWeather(place) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=fd2c1bf3e1b142a792e190311232006&q=${place}&aqi=no`);
    console.log(response);
    if(response.status === 200) {
        const json = await response.json();
        return json;
    }
    
    throw new Error(response.status);
}

async function getGiph(weather) {
    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=oa6CuH85hHRJXDvxb25l0xIXHUDjRji4&s=${weather}`);
    
    if(response.status === 200) {
        const json = await response.json();
        return json;
    }
    
    throw new Error(response.status);
}

// getting DOM elements for render updating
const input = document.getElementById('loc');
const local = document.querySelector('h2.location');
const temp = document.querySelector('h3.temp');
const desc = document.querySelector('h4.desc');
const feel = document.querySelector('h3#feel');
const condition = document.querySelector('h3#condition');
const humidity = document.querySelector('h3#humidity');
const giph = document.getElementById('giph');


// setting initial weather
renderWeather('Dallas');

function renderWeather(loc) {
    getWeather(loc).then(weather => {
    local.textContent = fixName(loc);
    temp.textContent = getTemp(weather, 'temp');
    desc.textContent = fixName(weather.location.name);
    feel.textContent = getTemp(weather, 'feelslike');
    hum.textContent = weather.current.humidity + "%";
    condition.textContent = weather.current.condition.text;

    getGiph(desc.textContent).then(obj => {
        giph.src = obj.data.images.original.url});
    });
    input.value = '';
}



document.getElementById('loc').onkeydown = function(e){
    console.log('keydown detected')
    if(e.key == "Enter"){
        renderWeather(input.value);
    }
};

function fixName(name){
    var text = name;
    text = text.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');

    return text;
}

function getTemp(json, param) {
    const atoe = document.querySelector('button.atoe').textContent;
    if(atoe === "American Mode (°F)") {
        return json['current'][`${param}_f`] + " °F";
    } else {
        return json['current'][`${param}_c`] + "°C";
    }
}

function switchTemperatures() {
    // get the current location
    const local = document.querySelector('h2.location');
    console.log('switch initiated');
    let atoe = document.querySelector('button.atoe');
    /*btn function which switches all temperatures rendering*/
    const temps = document.querySelectorAll('.temp');
    if(atoe.textContent === "American Mode (°F)") {
        atoe.textContent = "European Mode (°C)"
    } else {
        atoe.textContent = "American Mode (°F)"
    }
    // call renderWeather to update temperatures
    renderWeather(local.textContent);
}