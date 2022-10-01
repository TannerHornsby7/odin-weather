async function getWeather(place) {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=d7afc9d7d30ef48de59698fbaef3a3cb`);
    
    if(response.status === 200) {
        const json = await response.json();
        return json;
    }
    
    throw new Error(response.status);
}

async function getBackground(weather) {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=d7afc9d7d30ef48de59698fbaef3a3cb`);
    
    if(response.status === 200) {
        const json = await response.json();
        return json;
    }
    
    throw new Error(response.status);
}

const input = document.getElementById('loc');
const local = document.querySelector('h2.location');
const temp = document.querySelector('h3.temp');
const desc = document.querySelector('h4.desc');

document.getElementById('loc').onkeydown = function(e){
    console.log('keydown detected')
    if(e.key == "Enter"){
        console.log("weather location entered")
        getWeather(input.value).then(weather => {
            local.textContent = fixName(input.value);
             temp.textContent = getTemperature(weather.main.temp);
             desc.textContent = weather.weather[0].description.toUpperCase();
            console.log(temp);
        });
    }
};

/*
Circuitry Work Required:

get current temperature => h3.temp
get current main and description => h4.desc => background image

*/

function fixName(name){
    var text = name;
    text = text.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');

    return text;
}

function getTemperature(temp) {
    const atoe = document.querySelector('button.atoe').textContent;
    if(atoe === "American Mode (°F)") {
        return (1.8*(temp-273) + 32).toFixed(1) + "°F";
    } else {
        return (temp - 273.15).toFixed(1) + "°C";
    }
}

function switchTemperatures() {
    /*btn function which switches all temperatures rendering*/
}