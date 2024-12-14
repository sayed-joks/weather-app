let userLocation = document.querySelector("#userLocation");
const weatherIcon = document.querySelector(".weatherIcon");
const temp = document.querySelector(".temp");
const feelsike = document.querySelector(".feelsike");
const description = document.querySelector(".description");
const dateEle = document.querySelector(".date");
const cityName = document.querySelector(".city");
const humidity = document.querySelector("#Hvalue");
const wind = document.querySelector("#Wvalue");
const clouds = document.querySelector("#Cvalue");
const uv = document.querySelector("#UVvalue");
const pressure = document.querySelector("#Pvalue");
const forecast = document.querySelector(".forecast");
const buttonSearch = document.querySelector(".fa-search");
const SRvalue = document.querySelector(".SRvalue");
const SSvalue = document.querySelector(".SSvalue");
buttonSearch.addEventListener("click", function () {
  getWeather(userLocation.value);
});
let keyApi = `f60b6ac957b546a8a3a71045241012`;
let allData;
async function getWeather(city="cairo") {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${keyApi}&q=${city}&days=7`
  );
  if (response.ok) {
    let data = await response.json();
    allData = data;
    console.log(allData);
  }
  let dateStr = allData.location.localtime;
  let date = new Date(dateStr);
  let options = { weekday: "long" };
  let dayName = date.toLocaleDateString("en-US", options);
  weatherIcon.innerHTML = `<img src="https:${allData.current.condition.icon}" class="w-50">`;
  temp.innerHTML = allData.current.temp_c + "°C";
  feelsike.innerHTML = allData.current.feelslike_f;
  description.innerHTML = allData.current.condition.text;
  cityName.innerHTML = allData.location.name;
  dateEle.innerHTML = dayName;
  humidity.innerHTML = `${allData.current.humidity}%`;
  wind.innerHTML = `${allData.current.wind_kph}km/h`;
  clouds.innerHTML = `${allData.current.cloud}%`;
  uv.innerHTML = allData.current.uv;
  pressure.innerHTML = `${allData.current.pressure_mb}mb`;
  SRvalue.innerHTML = `<span>Sunrise</span>${allData.forecast.forecastday[0].astro.sunrise}`;
  SSvalue.innerHTML = `<span>Sunset</span>${allData.forecast.forecastday[0].astro.sunset}`;
  let cartona = "";
  for (let i = 1; i < 7; i++) {
    let dateStr = allData.forecast.forecastday[i].date;
    let date = new Date(dateStr);
    let options = { weekday: "long" };
    let dayName = date.toLocaleDateString("en-US", options);
    cartona += `<div class="col-md-4">
                            <div class="inner">
                                <h2 class="date">${dayName}</h2>
                                <img src="https:${allData.forecast.forecastday[i].day.condition.icon}" alt="">
                                <h2 class="forecastTemp">${allData.forecast.forecastday[i].day.avgtemp_c}°C</h2>
                                <h2 class="forecastDescription">${allData.forecast.forecastday[i].day.condition.text}</h2>
                            </div>
                        </div>`;
  }
  document.querySelector("#rowData").innerHTML = cartona;
}
getWeather();

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((showPosition) => {
    console.log(showPosition);
    let lat = showPosition.coords.latitude;
    let long = showPosition.coords.longitude;
    var api_key = "21d042f0dc3b4ad7ae255f8a0826df70";
    var query = lat + "," + long;
    var api_url = "https://api.opencagedata.com/geocode/v1/json";
    var request_url = `${api_url}?key=${api_key}&q=${query}&pretty=1&no_annotations=1`;
    fetch(request_url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results[0].components.city);
        getWeather(data.results[0].components.city);
      });
  });
} else {
  alert(
    "Geolocation is not supported by this browser, Please Enter City Name."
  );
}
