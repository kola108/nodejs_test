const express = require('express')
const mongoose = require('mongoose')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars')
const PORT = process.env.PORT || 4000
const homeRoute = require('./routes/home')
const coursesRoute = require('./routes/courses')
const courseAddRoute = require('./routes/course-add')
const cartRoute = require('./routes/cart')

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoute)
app.use('/courses', coursesRoute)
app.use('/add-course', courseAddRoute)
app.use('/cart', cartRoute)

async function start() {
    try {
        const url = 'mongodb+srv://kola:gauranga108@testcluste.6etht.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
        await mongoose.connect(url, {useNewUrlParser: true})
        app.listen(PORT, () => {
            console.log(`server is running on: http://localhost:${PORT}/`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()



