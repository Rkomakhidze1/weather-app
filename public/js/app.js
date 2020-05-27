console.log('client side javascript file is loaded');


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const p1 = document.getElementById('p1')
const p2 = document.getElementById('p2')



weatherForm.addEventListener('submit', (e) => {
    p1.innerHTML = 'Loading...'
    p2.innerHTML = ''
    e.preventDefault()
    const location = search.value
    fetch('http://localhost:3000/weather?address=' + location)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                p1.innerHTML = data.error
            } else {
                p1.innerHTML = data.location
                p2.innerHTML = data.forecast
            }
        })

})


