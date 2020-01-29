# Node.js Weather CLI

A JavaScript application that returns a summary of the weather for a given region.

## Installation

- Install the latest version of Node.js
- Clone or download the repo at (https://github.com/a-w-m/weather-cli.git)
- Traverse to the "weather-cli" folder on the command line
- Install the dependencies by entering `$ npm install` in the command line
    - dotenv : a module that loads environment variables from a .env file into process.env
    - node-fetch: a module that brings window.fetch to Node.js
- Sign up for API keys at [Dark Sky](https://darksky.net/dev) and [mapbox](https://mapbox.com)
- In your code editor, rename "sample.env" to ".env" so that dotenv module can locate it. 
- Assign API keys to environment variables in ".env" file

## Usage

From the "weather-cli" folder on the command line enter :

`node weather location`

Example:

`node weather bucharest`

```
Current temperature in București, Bucureşti, Romania is 37.58°F / 3.1°C.
Conditions are currently: Overcast
What you should expect: Light rain next Wednesday.
```

## Optional Arguments 

- Enter optional arguments after the location to limit temperature to either farenheit or celsius
    - Fareneheit:
        `-f` or`-farenheit`
    - Celsius: 
        `-c` or `-celsius`

Examples:

`node weather bucharest -c`

```
Current temperature in București, Bucureşti, Romania is 3.11°C.
Conditions are currently: Overcast
What you should expect: Light rain next Wednesday.
```

`node weather bucharest -f`

```
Current temperature in București, Bucureşti, Romania is  37.6°F.
Conditions are currently: Overcast
What you should expect: Light rain next Wednesday.
```

## License 

MIT

## CLI Images

![example 1](https://github.com/a-w-m/weather-cli/blob/master/images/weather-cli-sample.PNG?raw=true)

![example 2](https://github.com/a-w-m/weather-cli/blob/master/images/weather-cli-sample-2.PNG?raw=true)