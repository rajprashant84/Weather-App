const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cc6e87d4a6240cf89c74d1515f0c42ef&query=' + latitude// + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location'+latitude, undefined)
        } else {
            callback(undefined, body.location.name + ' It is currently ' + body.current.temperature + ' degress out. ') //+ body.currently.precipProbability + '% chance of rain.')
          //  callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast