const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=41a19482a10e547ba0560badf54a1eba&query=${long},${lat}`

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('connection issues')
        } else if (response.body.error) {
            callback('Can not access weather in the given location')
        } else {
            const { temperature, feelslike } = response.body.current
            callback(undefined, `Currently it is ${temperature} degrees celsius and it feels like ${feelslike}`)
        }


    })
}

module.exports = forecast