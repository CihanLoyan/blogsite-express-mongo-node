const express = require('express')
const morgan = require('morgan')    // Middleware'de kullandığımız, raporlama işlemi yapan pakettir.
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const adminRoutes = require('./routes/adminRoutes')
const blogRoutes = require('./routes/blogRoutes')
const authRoutes = require('./routes/authRoutes')
const { requireAuth, checkUser } = require('./middlewares/authMiddlewares')

const app = express()

const dbURL = 'mongodb+srv://cihan-234:cihan-234@nodeblog.kwjns.mongodb.net/express-blog?retryWrites=true&w=majority'
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(cookieParser())


app.use((req, res, next) => {   // Middleware
    console.log(`    Req method: ${req.method} 
    Req path: ${req.path} 
    Res Status: ${res.statusCode} 
    Middleware çalıştı...`);
    next();  // Middleware çalıştıktan sonra next() ile sonraki adıma devam etmesini söyledik.
})
// next() ile bir sonraki adıma devam edildiği için aşağıdaki istekler çalışabildi.

app.use('*', checkUser)
app.get('/', (req, res) => { res.redirect('/blog') })
app.use('/', authRoutes)
app.use('/blog', blogRoutes)
app.use('/admin', requireAuth, adminRoutes)

app.get('/about', (req, res) => {
    res.render('about', { title: 'Hakkımızda' })
})

app.get('/about-us', (req, res) => {
    res.redirect('/about')
})


app.get('*', (req, res) => {
    res.status(404).render('404', { title: `${res.statusCode} Not Found !` })
})

