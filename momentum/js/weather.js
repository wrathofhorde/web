function geoSuccess(pos) {
  const [lat, lon] = [pos.coords.latitude, pos.coords.longitude];
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then(response => response.json()
    .then(data => {
      const div = document.querySelector('#weather');
      const weather = div.querySelector('span:first-child');
      const city = div.querySelector('span:last-child');
      console.log(weather, city);
      console.log(data);
      city.innerText = data.name;
      weather.innerHTML = `${data.main.temp}&deg;C / ${data.weather[0].main}`;
    }));
}

function geoError() {
  alert("We can't find you!");
}

navigator.geolocation.getCurrentPosition(geoSuccess, geoError);