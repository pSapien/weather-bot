const fetch = require('node-fetch');

const patternDict = [
  {
    pattern: '\\b(?<greeting>Hi|Hello|Hey)\\b',
    intent: 'Hello',
    response: (capture) => `${capture} to you too, mate`,
  },
  {
    pattern: '\\b(bye|exit)\\b',
    intent: 'Exit',
    response: () => 'See ya! Have a nice day',
  },
  {
    pattern: 'like\\sin\\s\\b(?<city>.+)',
    intent: 'Weather',
    waiting: (city) => `Let me check the weather for ${city}...`,
    api: async (city) => {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`
      );
      const toJson = await data.json();
      return toJson;
    },
    response: (data) => {
      return `The weather in ${data.name} is ${data.weather[0].description} and temp is ${data.main.temp} but it feels like ${data.main.feels_like}`
    }
  },
]

module.exports = patternDict;