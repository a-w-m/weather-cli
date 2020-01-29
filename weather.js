/*imports dependencies*/
const dotenv = require("dotenv");
const fetch = require("node-fetch");
dotenv.config();

/*returns an array of the arguments the user enters on the command line*/

const getUserArgs = () => process.argv.slice(2);

/*returns a string of the location entered on the command line or an empty string if none entered*/

const getUserLocationRequest = () => {
  return (
    getUserArgs()
      .filter(arg => arg[0] !== "-")
      .join(" ") || ""
  );
};

/*returns a string of the optional temperature argument entered on the command line or an empty string if none entered*/

const getUserTemperatureUnitPreference = () => {
  return getUserArgs().filter(arg => arg[0] === "-")[0] || "";
};

const convertToCelsius = tempFarenheit => {
  return Math.round((tempFarenheit - 32) * (5 / 9) * 100) / 100;
};

/*function takes in a temperature and returns a string literal tof the temperature that matches the 
optional temperature argument entered on the command line*/

const setTemperatureToPreference = temperature => {
  const unitTemperature = getUserTemperatureUnitPreference();

  if (
    unitTemperature.toLowerCase() == "-f" ||
    unitTemperature.toLowerCase() == "-farenheit"
  ) {
    return ` ${temperature}°F.`;
  } else if (
    unitTemperature.toLowerCase() == "-c" ||
    unitTemperature.toLowerCase() == "-celsius"
  ) {
    return `${convertToCelsius(temperature)}°C.`;
  } else {
    return `${temperature}°F / ${convertToCelsius(temperature)}°C.`;
  }
};

/*handles errors during fetch requests, returns a rejected promise if the response has an error*/

const handleFetchError = response => {
  if (!response.ok) {
    return Promise.reject(
      `Request Responded with Status ${response.status}: Please Try Again`
    );
  } else {
    return response;
  }
};

/*handles missing argument:
returns a rejected promise if location not entered on command line, 
otherwise returns a resolved promise of the location*/

const handleArgsError = () => {
  if (getUserArgs().length == 0) {
    return Promise.reject("Error: No Location Found, Please Enter A Location");
  } else {
    return Promise.resolve(getUserLocationRequest());
  }
};

/*Makes mapbox API request and upon success returns an object containing lattitude, longitude and name of location*/
const getLattitudeLongitude = async location => {
  const key = process.env.MAPBOX_API_KEY;
  const request = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
    location
  )}.json?access_token=${key}`;

  return fetch(request)
    .then(result => handleFetchError(result))
    .then(result => result.json())
    .then(result => {
      return {
        lattitude: result.features[0].center[1],
        longitude: result.features[0].center[0],
        placeName: result.features[0].place_name
      };
    })
    .catch(err => {
      console.log(err);
    });
};
/*Makes darksky API request and upon success returns an object containing current weather conditions*/
const getWeather = async (coordinates = {}) => {
  const key = process.env.DARKSKY_API_KEY;
  const { lattitude, longitude, placeName } = coordinates;
  const request = `https://api.darksky.net/forecast/${key}/${lattitude},${longitude}`;

  return fetch(request)
    .then(result => handleFetchError(result))
    .then(result => result.json())
    .then(result => {
      return {
        temperature: result.currently.temperature,
        currentConditions: result.currently.summary,
        futureConditions: result.daily.summary,
        placeName: placeName
      };
    })
    .catch(err => console.log(err));
};

/*returns a sumamry of the weather*/
const getWeatherSummary = (weatherSummary = {}) => {
  const {
    temperature,
    currentConditions,
    futureConditions,
    placeName
  } = weatherSummary;

  let currentTemp = setTemperatureToPreference(temperature);

  return `Current temperature in ${placeName} is ${currentTemp}
Conditions are currently: ${currentConditions}
What you should expect: ${futureConditions}
     `;
};

/*initializes program*/
(async () => {
  let summary = await handleArgsError()
    .then(result => getLattitudeLongitude(result))
    .then(result => getWeather(result))
    .catch(err => console.log(err));

  if (summary) {
    console.log(getWeatherSummary(summary));
  }
})();
