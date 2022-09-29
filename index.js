async function getWeather(place) {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=d7afc9d7d30ef48de59698fbaef3a3cb`);
    
    if(response.status === 200) {
        const json = await response.json();
        return json;
    }
    
    throw new Error(response.status);
}
getWeather('France').then(weather => alert(weather.weather[0].main));