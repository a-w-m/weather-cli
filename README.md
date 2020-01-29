# Node.js Weather CLI

A javascript application that returns a summary of the weather for a given region.

# Installation

- Install the latest version of Node.js
- Clone or download the repo at ...
- Traverse to the "weather-CLI" folder on the command line
- Install the dependencies by entering `$ npm install` in the command line
- Sign up for API keys at (Dark Sky)[https://darksky.net/dev] and (mapbox)[https://mapbox.com]
- Add API keys to environment variables in "sample.env" file.

# Usage

From the "weather-cli" folder on the command line enter :

`node weather location`

Example:

`node weather miami`

Current temperature in Miami, Florida, United States is 71.39°F / 21.88°C
Conditions are currently: Partly Cloudy
What you should expect: Light rain tomorrow through Saturday.

## Optional Arguments (`-f`, `-farenheit`, `-c`, `-celsius)

- Enter optional arguments after the location to limit temperature to either farenheit or celsius
    - Fareneheit:
        `-f` or`-farenheit`
    - Celsius: 
        `-c` or `celsius`

Example:

`node weather miami -c`

Current temperature in Miami, Florida, United States is 21.87°C
Conditions are currently: Partly Cloudy
What you should expect: Light rain tomorrow through Saturday.