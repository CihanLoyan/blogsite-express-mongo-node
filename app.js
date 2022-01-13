const express = require('express')
const morgan = require('morgan')    // Middleware'de kullandığımız, raporlama işlemi yapan pakettir.

const app = express()
app.set('view engine', 'ejs')

app.listen(3000)

app.use((req, res, next) => {   // Middleware
    console.log(`    Req method: ${req.method} 
    Req path: ${req.path} 
    Res Status: ${res.statusCode} 
    Middleware çalıştı...`);
    next();  // Middleware çalıştıktan sonra next() ile sonraki adıma devam etmesini söyledik.
})
// next() ile bir sonraki adıma devam edildiği için aşağıdaki istekler çalışabildi.

app.use(morgan('dev')) 

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