const dotenv = require('dotenv');
const fetch = require('node-fetch')
dotenv.config();


const getUserLocationRequest = () => process.argv.slice(2,).join(" ");

const getLattitudeLongitude = async (location) =>{
    const key = process.env.mapBox_API_Token;
    const request = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(location)}.json?access_token=${key}`

    const response =  await fetch(request).then(result => result.json())

    return {
        lattitude: response.features[0].center[1],
        longitude: response.features[0].center[0],
        placeName: response.features[0].place_name 
    }
}

