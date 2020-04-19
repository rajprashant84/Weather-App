

//console.log('Client side Java script loades')



const WeatherForm = document.querySelector('form')
const search = document.querySelector('input')
const Message1 = document.querySelector('#Message-1')
const Message2 = document.querySelector('#Message-2')




WeatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const Location =search.value

    Message1.textContent =  'Loading .......'
    Message2.textContent = ''

    fetch('http://localhost:3000/weather?address='+Location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            Message1.textContent = data.error
        }
        else{
        }
        Message1.textContent = data.location
        Message2.textContent = data.forecast
        // console.log(data.location)
        // console.log(data.forecast)
    })
})
})