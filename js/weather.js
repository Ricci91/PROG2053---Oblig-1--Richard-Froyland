document.addEventListener("DOMContentLoaded", function() {
    var locations = [
        { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
        { name: "New York", lat: 40.7128, lon: -74.0060 },
        { name: "London", lat: 51.5074, lon: -0.1278 },
        { name: "Paris", lat: 48.8566, lon: 2.3522 },
        { name: "Sydney", lat: -33.8688, lon: 151.2093 }
    ];

    var weatherContainer = document.getElementById('weather-locations');

    function fetchWeatherData() {
        weatherContainer.innerHTML = ""; // Clear the old data

        locations.forEach(function(location) {
            var apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=" + location.lat + "&longitude=" + location.lon + "&current_weather=true";

            fetch(apiUrl)
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error("Error fetching weather for " + location.name);
                    }
                    return response.json();
                })
                .then(function(data) {
                    var weather = data.current_weather;

                    var locationElement = document.createElement("div");
                    locationElement.classList.add("location-weather");

                    var locationTitle = document.createElement("h3");
                    locationTitle.textContent = location.name;
                    locationElement.appendChild(locationTitle);

                    var temperature = document.createElement("p");
                    temperature.textContent = "Temperature: " + weather.temperature + "°C";
                    locationElement.appendChild(temperature);

                    var windspeed = document.createElement("p");
                    windspeed.textContent = "Wind Speed: " + weather.windspeed + " km/h";
                    locationElement.appendChild(windspeed);

                    var weatherCode = document.createElement("p");
                    weatherCode.textContent = "Weather: " + weather.weathercode;
                    locationElement.appendChild(weatherCode);

                    weatherContainer.appendChild(locationElement);
                })
                .catch(function(error) {
                    console.log(error);
                    var errorElement = document.createElement("p");
                    errorElement.textContent = "Failed to load weather data for " + location.name;
                    weatherContainer.appendChild(errorElement);
                });
        });
    }

    // Call fetchWeatherData when the page loads
    fetchWeatherData();

    // Refresh the data every 5 minutes
    setInterval(function() {
        fetchWeatherData();
    }, 300000);
});
