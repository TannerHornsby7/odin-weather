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
            local.textContent = input.value.toUpperCase();
             temp.textContent = 1.8*(weather.main.temp-273).toFixed(1) + 32;
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