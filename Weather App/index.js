const apikey = "613cd5f7a9ca19ca5b15c2eaeece1722";

const weatherDataEl = document.getElementById("Weather-content");

const cityInputEl = document.getElementById("city");

const formEl = document.querySelector("form");

formEl.addEventListener("submit",()=>{
    event.preventDefault();  //stop the form load the in each time
    const city = cityInputEl.value;
    // console.log(city);
    getWeatherData(city);
});

async function getWeatherData(cityvalue) //because of await we have to use async function
{
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityvalue}&appid=${apikey}&units=metric`);
        if(!response.ok){
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        const tempreture = Math.round(data.main.temp);

        const description = data.weather[0].description;

        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed}m/s`
        ];

        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">`

        weatherDataEl.querySelector("temperature").textContent = `${tempreture}°C`;

        weatherDataEl.querySelector("description").textContent = description;

        weatherDataEl.querySelector(".details").innerHTML = details.map((detail)=>
            `<div>${details}</div>`).join("");
    } catch (error) {
        
    }
}
