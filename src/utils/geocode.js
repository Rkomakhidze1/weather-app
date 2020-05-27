const request = require('request')

const geoCode = (adress, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?access_token=pk.eyJ1IjoicmV6bzEiLCJhIjoiY2thanF3NHRzMGQ2ZTJ5bWkzMDRtYXNiZyJ9.egmhs5AJ32R2IfUvsWa1MA&limit=1`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('cannot connect to location service', undefined)
        } else if (response.body.features.length === 0) {
            callback('cannot find given location', undefined)
        } else {
            const lat = response.body.features[0].center[1]
            const long = response.body.features[0].center[0]
            const name = response.body.features[0].place_name
            callback(undefined, {
                latitude: lat,
                longititude: long,
                location: name
            })
        }
    })
}

module.exports = geoCode