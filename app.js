const API_KEY = '3a2cf9360ba23b45597fc4400aa50119';

const temperature = document.querySelector('#temperature');
const localisation = document.querySelector('#localisation');
const weather = document.querySelector('#weather-status');
const weatherImg = document.querySelector('#weather-logo');
const hoursDiv = document.querySelector('#hours-container');

const date = new Date()
date.toLocaleDateString("fr") // 20/10/2021
document.querySelector('#date').textContent = date.toLocaleDateString("fr");

function getHoursWeather(weatherAPI){
    let nextHours = date.getHours();

    for (let i = 0; i < 8; i++) {
        let hour = document.createElement('div');
        let hourSpan = document.createElement('span');
        let degreeSpan = document.createElement('span');
        let weatherStatusLogo = document.createElement('img');

        hourSpan.textContent = `${nextHours}h`;
        degreeSpan.textContent = `${Math.trunc(weatherAPI.hourly[i*3].temp)}°`;
        weatherStatusLogo.setAttribute("src", `./res/${weatherAPI.hourly[i*3].weather[0].icon}.svg`);

        hour.classList.toggle('hours');
        hourSpan.classList.toggle('hours-elements');
        degreeSpan.classList.toggle('hours-elements');
        weatherStatusLogo.classList.toggle('weather-status-logo');
        

        hour.append(hourSpan);
        hour.append(degreeSpan);
        hour.append(weatherStatusLogo);
        hoursDiv.append(hour);

        
        nextHours+= 3;
        if(nextHours >= 24)
        {
            nextHours -= 24;
        }
    }
}



if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        // console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        callAPI(long,lat);

    }, () => {
        alert(`Vous avez refusé la géolocalisation, l'application ne peur pas fonctionner, veuillez l'activer.!`)
    })
}

function callAPI(long, lat) {

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${API_KEY}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {

        let resultsAPI = data;

        console.log(resultsAPI);

        temperature.textContent = `${Math.trunc(resultsAPI.current.temp)}°`;
        localisation.innerText = resultsAPI.timezone;
        weather.textContent = resultsAPI.current.weather[0].description;
        weatherImg.setAttribute("src", `./res/${resultsAPI.current.weather[0].icon}.svg`);

        getHoursWeather(resultsAPI);
    })

}