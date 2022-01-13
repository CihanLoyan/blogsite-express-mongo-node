const express = require('express')

const app = express()
app.set('view engine', 'ejs')

app.listen(3000)

app.get('/', (req, res) => {
    res.render('index', {title: 'Anasayfa'})
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'Hakkımızda'})
})

app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

app.get('*', (req, res) => {
    res.status(404).render('404', {title: `${res.statusCode} Not Found !`})
})