const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000;

// define paths for express config 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const staticTempPath = path.join(__dirname, '../public')

// set up handlebars and view engine
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set up static directory to serve
app.use(express.static(staticTempPath))


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rezo Kom'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Rezo Kom'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Rezo Kom'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address)
        return res.send({
            error: 'Address must be provided !'
        })

    geocode(req.query.address, (e, resp) => {
        if (e) {
            return res.send({
                error: e
            })
        }
        const { latitude, longititude, location } = resp

        forecast(longititude, latitude, (err, response) => {
            if (err) {
                return res.send({
                    error: err
                })
            }
            return res.send({
                forecast: response,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.dog) {
        return res.send({
            error: 'provide dog breed !'
        })
    }

    console.log(req.query)
    res.send({
        dog: 'pitbull',
        hair: 'blonde',
        car: 'audi TT',
        name: 'nina japaridze',
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        msg: 'cant find given helps article'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        msg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server is running on port ' + port)
})
