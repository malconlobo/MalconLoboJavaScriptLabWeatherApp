let inputCity = document.getElementById("enterCity");

inputCity.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        getResults(event.target.value);
        event.target.value = ""
    }
});

const api = {
    url: "https://api.openweathermap.org/data/2.5/weather?q=",
    key: "3866b39bc8930d653ddde4002b622823"
}

function getResults(cityName) {

    fetch(`${api.url}${cityName}&appid=${api.key}&units=metric`)
        .then((result) => result.json())
        .then((res) => displayResults(res));

}

function displayResults(result) {
    console.log(result);

    let cityName = document.getElementById("cityName");
    let date = document.getElementById("date");
    let temperature = document.getElementById("temperature");
    let weatherDOM = document.getElementById("weather");
    let tempHighLow = document.getElementById("highlow");

    cityName.innerText = result.name + " , " + result.sys.country;
    date.innerText = formatDate();
    temperature.innerText = result.main.temp + " °C";
    weatherDOM.innerText = result.weather[0].main;
    let high = Math.floor(result.main.temp_max);
    let low = Math.floor(result.main.temp_min);
    tempHighLow.innerText = `${low} °C / ${high} °C`;

}

function formatDate() {

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let currentDate = new Date();
    let day = days[currentDate.getDay()];
    let month = months[currentDate.getMonth()];
    let year = currentDate.getFullYear();
    let date = currentDate.getDate();

    return `${day}, ${date} ${month} ${year}`;
}

window.onload = function () {
    getResults("Hyderabad");
};