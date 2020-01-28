const dotenv = require("dotenv");
const fetch = require("node-fetch");
dotenv.config();

const getUserArgs = () => process.argv.slice(2);

const getUserLocationRequest = () => {
  return getUserArgs()
    .filter(arg => arg[0] !== "-")
    .join(" ");
};
const getUserTemperatureUnitPreference = () => {
  return getUserArgs().filter(arg => arg[0] === "-")[0] || "";
};

const getLattitudeLongitude = async () => {
  const key = process.env.MAPBOX_API_KEY;
  const location = getUserLocationRequest();
  const request = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
    location
  )}.json?access_token=${key}`;

  const response = await fetch(request).then(result => result.json());

  return {
    lattitude: response.features[0].center[1],
    longitude: response.features[0].center[0],
    placeName: response.features[0].place_name
  };
};

const getWeather = async coordinates => {
  const key = process.env.DARKSKY_API_KEY;
  const { lattitude, longitude, placeName } = coordinates;
  const request = `https://api.darksky.net/forecast/${key}/${lattitude},${longitude}`;

  const response = await fetch(request).then(result => result.json());

  return {
    temperature: response.currently.temperature,
    currentConditions: response.currently.summary,
    futureConditions: response.daily.summary,
    placeName: placeName
  };
};

const getWeatherSummary = weatherSummary => {
  const {
    temperature,
    currentConditions,
    futureConditions,
    placeName
  } = weatherSummary;

  const unitTemperature = getUserTemperatureUnitPreference();

  let currentTemp;
  
  if (unitTemperature.toLowerCase() == "-f") {
    currentTemp = ` ${temperature}°F`;
  } else if (unitTemperature.toLowerCase() == "-c" ) {
    currentTemp = `${convertToCelsius(temperature)}°C`;
  } else {
    currentTemp = `${temperature}°F / ${convertToCelsius(temperature)}°C`;
  }

  return `Current temperature in ${placeName} is ${currentTemp}
Conditions are currently: ${currentConditions}
What you should expect: ${futureConditions}
     `;
};

const convertToCelsius = tempFarenheit => {
  return Math.round((tempFarenheit - 32) * (5 / 9) * 100) / 100;
};

(async () => {
  let coordinates = await getLattitudeLongitude();
  let weather = await getWeather(coordinates);
  let summary = getWeatherSummary(weather);
  console.log(summary);
})();
