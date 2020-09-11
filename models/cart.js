const fs = require('fs')
const path = require('path')

class Cart {
    constructor(id, title, price, img, counter = 1) {
        this.id      = id
        this.title   = title
        this.price   = price
        this.img     = img
        this.counter = counter
    }
    
    
    async add() {
       const cart = await Cart.fetch()
       const course = {
        id:     this.id,
        title:  this.title,
        price:  this.price,
        img:    this.img,
        counter:this.counter
       }
       const idx = cart.courses.findIndex(c => c.id === course.id)

       cart.price += +course.price

       if (idx < 0) {
           cart.courses.push(course)
       } else {
           ++cart.courses[idx].counter
       }
       
       return new Promise((res,rej) => {
           fs.writeFile(
               path.join(__dirname, '..', 'data', 'cart.json'),
               JSON.stringify(cart),
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

    async remove() {
        const cart = await Cart.fetch()
        const course = {
         id:     this.id,
         title:  this.title,
         price:  this.price,
         img:    this.img,
         counter:this.counter
        }
        const idx = cart.courses.findIndex(c => c.id === course.id)
 
        if (idx >= 0) {
            cart.price -= +course.price
            
            if (cart.courses[idx].counter === 1) {
                cart.courses.splice(idx,1)
            } else {
                --cart.courses[idx].counter
            }
        }
        
        return new Promise((res,rej) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'cart.json'),
                JSON.stringify(cart),
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

    static fetch() {
        return new Promise((res,rej) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'cart.json'),
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
}

module.exports = Cart