document.querySelectorAll('.price').forEach(node => {
    node.textContent = new Intl.NumberFormat('en-EN', {
        currency: 'USD',
        style: 'currency'
    }).format(node.textContent)
})

const coursesDiv = document.querySelector('#courses')

if (coursesDiv) {
    coursesDiv.addEventListener('click', event => {
        if (event.target.classList.contains('js-remove')) {
            const id = event.target.dataset.id

            fetch(`/courses/remove/${id}`, {
                method: 'DELETE',
            })
            .then(res => res.json())
            .then(course => {
                console.log(course)
                event.target.closest('.row').remove()
            })
        }
    })
}