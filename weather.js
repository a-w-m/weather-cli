const dotenv = require("dotenv");
const fetch = require("node-fetch");
dotenv.config();

const getUserLocationRequest = () => process.argv.slice(2).join(" ");

const getLattitudeLongitude = async location => {
  const key = process.env.mapBox_API_Token;
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
  const key = process.env.darkSky_API_Token;
  const { lattitude, longitude, placeName } = coordinates;
  const request = `https://api.darksky.net/forecast/${key}/${lattitude},${longitude}`;

  const response = await fetch(request).then(result => result.json());

  return {
    temperature: response.currently.apparentTemperature,
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

  const currentTempSummary = `Current temperature in ${placeName} is ${temperature}`;
  const currentConditionsSummary = `Conditions are currently: ${currentConditions}`;
  const futureConditionsSummary = `What you should expect: ${futureConditions}`;

  return `${currentTempSummary}
${currentConditionsSummary}
${futureConditionsSummary}
     `;
};

(async () => {
  let coordinates = await getLattitudeLongitude(getUserLocationRequest());
  let weather = await getWeather(coordinates);
  let summary = getWeatherSummary(weather);
  console.log(summary);
})();
