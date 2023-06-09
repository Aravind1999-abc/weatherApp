const container=document.querySelector('.container');
const weatherContainer=document.querySelector('.weather-container');
const searchContainer=document.querySelector('.search-container')
const searchInput = document.getElementById('location-input');
const searchButton = document.getElementById('search-button');
const iconElement = document.getElementById('weather-icon');
const tempElement = document.getElementById('temperature-value');
const descElement = document.getElementById('temperature-description');
const locationElement = document.getElementById('location');


let weather={};
 const key="82005d27a116c2880c8f0fcb866998a0";

searchButton.addEventListener('click', function () {
    const city = searchInput.value.trim();
    if (city !== '') {
        getWeather(city);
    }
    searchContainer.style.display='none';
    //container.style.backgroundColor='F4F9FF';
    weatherContainer.style.display='block';
    weatherContainer.style.backgroundColor='  #F4F9FF';
});

function getWeather(city) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not available');
            }
            return response.json();
        })
        .then(data => {
             weather = {
                temperature: {
                    value: Math.floor(data.main.temp - 273),
                    unit: '°C'
                },
                description: data.weather[0].description,
                iconId: data.weather[0].icon,
                city: data.name,
                country: data.sys.country
            };

            displayWeather(weather);
        })
        .catch(error => {
            console.log('Error fetching the weather data', error);
        });
}

function displayWeather(weather) {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png" alt="">`;
    tempElement.innerHTML = `${weather.temperature.value} ${weather.temperature.unit}`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

//C to F conversion
function celsiusToFahrenheit(temperature){
    return(temperature * 9/5)+32;
}

//WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENT
tempElement.addEventListener('click',function(){
    if(weather.temperature.value===undefined) return;

    if(weather.temperature.unit=='°C'){
        let fahrenheit=celsiusToFahrenheit(weather.temperature.value);
        fahrenheit=Math.floor(fahrenheit);

        tempElement.innerHTML=`${fahrenheit}°<span>F</span>`;
        weather.temperature.unit="fahrenheit";
    }else{
       tempElement.innerHTML=`${weather.temperature.value}°<span>C</span>`;
       weather.temperature.unit="celsius";
    }
});























