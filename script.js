const ApiKey = 'df0164a5727d8b30712b0ad58ee49915';
const ApiURL = 'https://api.openweathermap.org/data/2.5/weather';
let searchBtn = document.querySelector('.search-box button');
let container = document.querySelector('.container');
let errorFound = document.querySelector('.not-found');
let weatherBox = document.querySelector('.weather-box');
let weatherDetails = document.querySelector('.weather-details');

function checkWeather() {
    const city = document.querySelector('.search-box input').value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ApiKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                errorFound.style.display = 'block';
                errorFound.classList.add('fadeIn');
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                return;
            }

            errorFound.style.display = 'none';
            errorFound.classList.remove('fadeIn');

            let image = document.querySelector('.weather-box img');
            let temperature = document.querySelector('.weather-box .temperature');
            let description = document.querySelector('.weather-box .description');
            let humidity = document.querySelector('.weather-details .humidity span');
            let wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case "Clear":
                    image.src = "images/clear.png";
                    break;
                case "Clouds":
                    image.src = "images/cloud.png";
                    break;
                case "Mist":
                    image.src = "images/mist.png";
                    break;
                case "Rain":
                    image.src = "images/rain.png";
                    break;
                case "Snow":
                    image.src = "images/snow.png";
                    break;
                default:
                    image.src = "images/404.png";
                    alert("Weather not found!");
                    break;
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherDetails.classList.add('fadeIn');
            weatherBox.classList.add('fadeIn');
            container.style.height = '580px';
        });
}

searchBtn.addEventListener('click', checkWeather);
