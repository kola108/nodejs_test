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
    const course = new Course(
        req.body.course_title,
        req.body.course_price,
        req.body.course_image
        )

    await course.save()

    res.redirect('/courses')
})

module.exports = router