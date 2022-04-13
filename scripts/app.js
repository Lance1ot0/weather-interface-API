
const API_KEY = '3a2cf9360ba23b45597fc4400aa50119';
let resultAPI;

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const hour = document.querySelectorAll('.hour-prevision');


if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        // console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        CallAPI(long,lat);

    }, () => {
        alert(`Vous avez refusé la géolocalisation, l'application ne peur pas fonctionner, veuillez l'activer.!`)
    })
}

function CallAPI(long, lat) {

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${API_KEY}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {

        resultatsAPI = data;

        weather.innerText = resultatsAPI.current.weather[0].description;
        temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`
        localisation.innerText = resultatsAPI.timezone;

        let currentHour = new Date().getHours();

        for(let i = 0; i < hour.length; i++) {

            let incrHour = currentHour + i * 3;

            if(incrHour > 24) 
            {
                hour[i].innerText = `${incrHour - 24} h`;
            } 
            else if(incrHour === 24) 
            {
                hour[i].innerText = "00 h"
            } 
            else 
            {
                hour[i].innerText = `${incrHour} h`;
            }

        }

    })

}