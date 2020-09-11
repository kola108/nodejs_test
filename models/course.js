const uuid = require('uuid').v4
const fs = require('fs')
const path = require('path')

class Course {
    constructor(title, price, img) {
        this.title = title
        this.price = price
        this.img = img
        this.id = uuid()
    }

    async save() {
        const courses = await Course.getAll()
        courses.push({
            id: this.id,
            title: this.title,
            price: this.price,
            img: this.img
        })

        return new Promise((res, rej) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                err => {
                    if (err) {
                        rej(err)
                    } else {
                        res(true)
                    }
                }
            )
        })
    }

    static getAll() {
        return new Promise((res, rej) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        rej(err)
                    } else {
                        res(JSON.parse(content))
                    }
                }
            )
        })
    }

    static async getById(id) {
        const courses = await this.getAll()
        return courses.find(course => course.id === id)
    }

    static async update(courseFromForm) {
        const courses = await this.getAll()
        const indx = courses.findIndex(course => course.id === courseFromForm.course_id)

        if (indx >= 0) {
            courses[indx] = {
                id: courseFromForm.course_id,
                title: courseFromForm.course_title,
                price: courseFromForm.course_price,
                img: courseFromForm.course_image,
            }
        }

        return new Promise((res, rej) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                err => {
                    if (err) {
                        rej(err)
                    } else {
                        res(true)
                    }
                }
            )
        })
    }

    static async remove(id) {
        let courses = await this.getAll()
        const course = courses.find(c => c.id === id)
        courses = courses.filter(c => c.id !== id)

        return new Promise((res, rej) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                err => {
                    if (err) {
                        rej(err)
                    } else {
                        res(course)
                    }
                }
            )
        })
    }


}



module.exports = Course