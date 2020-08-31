var searchBox = document.getElementById("searchBox");

var searchBtn = document.getElementById("searchBtn");

var city;
let units = 'metric';

var appId = '8d04313451f5780cdf161a02fea4ab32';
document.body.style.backgroundImage = "url('https://images.pexels.com/photos/5412/water-blue-ocean.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')";

searchWeather = () => {
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${appId}&units=${units}`)
  .then((response) => {
    console.log(response);
    setValues(response);
    setImage(response.data.weather[0].main)
  })
  .catch((error) => {
    console.log(error);
  })
}

setImage = (res) => {
  switch (res) {
    case 'Clear':
      document.body.style.backgroundImage = "url('clear.jpg')";
      break;

    case 'Clouds':
      document.body.style.backgroundImage = "url('cloudy.jpg')";
      break;

    case 'Rain':
    case 'Drizzle':
    case 'Mist':
      document.body.style.backgroundImage = "url('rain.jpg')";
      break;

    case 'Thunderstorm':
      document.body.style.backgroundImage = "url('storm.jpg')";
      break;

    case 'Snow':
      document.body.style.backgroundImage = "url('snow.jpg')";
      break;

    default:
      document.body.style.backgroundImage = "url('https://images.pexels.com/photos/5412/water-blue-ocean.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')";
      break;
  }
}

setValues = (res) => {
  let weatherContainer = document.getElementById('weatherContainer');
  weatherContainer.style.visibility = 'visible';
  document.getElementById("cityName").innerHTML = res.data.name + "    " + res.data.sys.country;
  document.getElementById("temperature").innerHTML = `Temperature = ${Math.floor(res.data.main.temp)}&#176;C`;
  document.getElementById("Description").innerHTML = res.data.weather[0].description.toUpperCase(); 
}


searchBtn.addEventListener('click' , () => {
  city = searchBox.value;
  searchWeather();
})

searchBox.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    city = searchBox.value;
    searchWeather();
  }
});

