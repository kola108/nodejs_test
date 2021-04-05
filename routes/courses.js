const {Router} = require('express')
const router = Router()
const Course = require('../models/course')

router.get('/', async (req, res) => {
    const courses = await Course.find()

    res.render('courses', {
        title: 'courses',
        isCourses: true,
        courses
    })
})

router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id)
    
    res.render('course', {
        layout: 'course',
        title: 'course',
        course
    })
})

router.get('/:id/edit', async (req, res) => {
    if (req.query.allow) {
        const course = await Course.findById(req.params.id)

        res.render('edit-course', {
            title: 'edit-course',
            course
        })
    } else {
        res.redirect('/')
    }
})

router.post('/edit-course', async (req, res) => {
    const id = req.body.id
    delete req.body.id
    await Course.findByIdAndUpdate(id, req.body)
    res.redirect('/courses')
})

router.delete('/remove/:id', async (req, res) => {
    const course = await Course.findByIdAndRemove(req.params.id)
    res.status(200).json(course)
    res.redirect('/courses')
})

module.exports = router
