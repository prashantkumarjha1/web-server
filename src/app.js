const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require ('../../weather-app/utils/forecast')
const geocode = require ('../../weather-app/utils/geocode')

const app = express()
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(path.join(__dirname, '../public')))

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('', (req,res)=> {
    res.render('index',{
        title : 'Weather App',
        location : 'Bangalore'
    })
})

app.get('/help', (req,res) => {
    res.render ('help', {owner:[{
        name: 'Prashant',
        age : 44
    },{
        name: 'Shilpi',
        age : 42
    }],title: "Help"
    })
})

app.get('/about', (req, res) => {
    res.render ('about',
    {
        title: 'Who Am I?',
        name : 'Prashant',
        role : 'manager'
    })

})

app.get('/weather', (req,res) => {

    const location = req.query.loc
    console.log('loc: ', location)
    if(location){
        geocode(location,(err,data)=> {
            if(err){
                console.log('Inside err: ', err)
                res.render('error',{errormsg:'Error in fetching coordinates for location'})
            } else {
                console.log('Inside err: ', data)
                forecast(data.longitude,data.latitude,(error,response) => {
                    res.render ('weather',{
                        location:location,
                        curr_weather : response
                    })
                })
            }
        })
    }else{
        res.send ('No address provided')
    }
})

app.get('/api/weather', (req,res) => {

    const location = req.query.loc
    console.log('loc: ', location)
    if(location){
        geocode(location,(err,data)=> {
            if(err){
                res.render('error',{errormsg:'Error in fetching coordinates for location'})
            } else {
                forecast(data.longitude,data.latitude,(error,response) => {
                    res.send({
                        location:location,
                        curr_weather : response
                    })
                })
            }
        })
    }else{
        res.send ('No address provided')
    }
})

app.get('*', (req,res) => {
    res.render('error',{
        errormsg : 'Sorry for inconvinience !, URL doesn\'t exist'
    })
})

app.listen(3000, () => {
    console.log ('Server started on port 3000')
})