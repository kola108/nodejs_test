const {Router} = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', (req, res) => {
    res.render('add-course', {
        title: 'add-course',
        isCourseAdd: true
    })
})

router.post('/', async (req, res) => {
    const course = new Course({
        title: req.body.course_title,
        price: req.body.course_price,
        img: req.body.course_image,
    })

    try {
        await course.save()
        res.redirect('/courses')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router
