console.log('Inside client side javascript')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data) =>{
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')

weatherForm.addEventListener('submit',(event)=>{
    const location = document.querySelector('input').value
    console.log('testing : ',location)
    event.preventDefault()
    fetch('http://localhost:3000/api/weather?loc=' + location).then((response1) =>{
    response1.json().then((data1) =>{
        //console.log('data1: ', data1)
        document.querySelector('h2.test2').textContent = 'Weather of ' + data1.location +' currently is: ' + data1.curr_weather
        //document.querySelector('h2.test2').textContent = data1.location
    })
})
})