const {Router} = require('express')
const router = Router()
const Course = require('../models/course')
const Cart = require('../models/cart')

router.post('/add', async (req, res) => {
    const course = await Course.getById(req.body.course_id)
    const cart = new Cart(course.id, course.title, course.price, course.img)

    await cart.add()
    res.redirect('/cart')
})

router.post('/delete', async (req, res) => {
    const course = await Course.getById(req.body.course_id)
    const cart = new Cart(course.id, course.title, course.price, course.img)

    await cart.remove()
    res.redirect('/cart')
})

router.get('/', async (req, res) => {
    const cart = await Cart.fetch()
    res.render('cart', {
        title: 'cart',
        isCart: true,
        courses: cart.courses,
        totalPrice: cart.price
    })
})

module.exports = router



