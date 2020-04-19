
const Path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(Path.join(__dirname,'../Public'))

const app = express()

//For first two line for express

const PublicDirectoryPath =Path.join(__dirname,'../Public')
const viewpath = Path.join(__dirname,'../templates/views')
const partialpath = Path.join(__dirname,'../templates/partials')
/// Set Handelbar Engine and Views Location

app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)
app.use(express.static(PublicDirectoryPath))

app.get('',(req, res)   =>{
    res.render('index',{
        title:'Weather',
        Name:'Prashant'
    })
})
// app.get('',(req , res) =>{
//     res.send('<h1>Weather</h1>')
// })
app.get('/help',(req,res)  =>{
    res.render('help',{
        title:'help',
        Name:'Prashant',
        helptext:'This is some helpful text'
    })

})
app.get('/Weather',(req,res)   =>{
    if(!req.query.address){
       return res.send({
           error:'You Must provide Address'
           
       }) 
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
 
})
app.get('/Products',(req,res)=>{
    if(!req.query.search){
      return  res.send({
        error:'You Must provide a Search Area'
    
})
    }
    res.send({
        Product:[]
    })
})
app.get('/about', (req,res)  =>{
    res.render('about',{
        title:'About me',
        Name:'Prashant'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        Name:'Prashant',
        errorMessage:'Help Article Not Found'
    })
})
app.get('*',(req,res)=>{
res.render('404',{
    title:'404',
    Name:'Prashant',
    errorMessage:'Page Not found'
})
})
app.listen(3000,(req, res)  =>{
    console.log('server is up on port 3000')
})