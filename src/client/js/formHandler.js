// API Call Variables
const geoBaseURL = "http://api.geonames.org/searchJSON?"
const geoUser = process.env.GEO_USER
const curWethbitBaseURL = "https://api.weatherbit.io/v2.0/current?" // For current weather
const forWethbitBaseURL = "https://api.weatherbit.io/v2.0/forecast/daily?" // For forecast weather
const wethbitApi = process.env.WEATHERBIT_API
const pixBaseURL = "https://pixabay.com/api/?key="
const pixApi = process.env.PIXABAY_API

// http://api.geonames.org/SearchJSON?placename=Melbourne&maxRows=5&username=demo example geoname api call
// https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=API_KEY example current weatherbit api call
// https://api.weatherbit.io/v2.0/forecast/daily?lat=35.7796&lon=-78.6382&key=API_KEY example forecast weatherbit api call
// https://pixabay.com/api/?key=API_KEY&q=Melbourne&category=travel&orientation=horizontal&per_page=5 example pixabay api call

addEventListener('DOMContentLoaded', (e) => {
    document.getElementById('destForm').addEventListener('submit', handleSubmit)
});


async function handleSubmit(e){
    e.preventDefault()

    const dest = document.forms["destForm"]["dest"].value
    const arvDate = new Date(document.forms["destForm"]["arival"].value)
    const depDate = new Date(document.forms["destForm"]["departure"].value)
    let d = new Date() // Today's date
    let difference = arvDate.getTime() - d.getTime(); // Converts difference into miliseconds
    let daysTill = Math.ceil(difference / (1000 * 3600 * 24)); // Turns those miliseconds into days

    let tripDiff = depDate.getTime() - arvDate.getTime(); // Converts difference into miliseconds
    let tripLength = Math.ceil(tripDiff / (1000 * 3600 * 24)); // Turns those miliseconds into days

    await postData('/add', {daysTill: daysTill, tripLength: tripLength})
    getGeoName(geoBaseURL, dest, geoUser) // Get geo name location
    .then(async function(geoData){
        if (daysTill < 7) { // If arrival date is less than 16 days
            await getCurrentWeather(curWethbitBaseURL, geoData.geonames[0].lat, geoData.geonames[0].lng, wethbitApi)
            .then(function(curData){
                postData('/add', {tempHigh: curData.data[0].temp, tempLow: curData.data[0].temp, country: curData.data[0].country_code, dest: curData.data[0].city_name, wethDesc: curData.data[0].weather.description})
            })
        } else if (daysTill > 16) { // If arrival date is greater than 16 days
            await postData('/add', {Temp: "Cannot forecast weather this far ahead"})
        } else { // If arrival date is between 7-16 days
            await getForecastWeather(forWethbitBaseURL, geoData.geonames[0].lat, geoData.geonames[0].lng, wethbitApi)
            .then(function(forData){
                postData('/add', {tempHigh: forData.data[daysTill - 1].high_temp, tempLow: forData.data[daysTill - 1].low_temp, dest: forData.city_name, country: forData.country_code, wethDesc: forData.data[daysTill - 1].weather.description})
            })
        }
        await getDestImg(pixBaseURL, geoData.geonames[0].name, pixApi)
        .then(async function(imgData){
            await postData('/add', {img: imgData.hits[0].webformatURL, departure: document.forms["destForm"]["departure"].value, arival: document.forms["destForm"]["arival"].value})
            await updateUI()
        })
    })
}


//Get geo name data
const getGeoName = async (geoBaseURL, dest, geoUser) =>{
    const res = await fetch(`${geoBaseURL}name=${dest}&maxRows=5&username=${geoUser}`)
    try { // API call data
        const data = await res.json()
        return data
    } catch(error) {
        console.log("error", error)
    }
}

//Get Current Weather
const getCurrentWeather = async (forWethbitBaseURL, lat, lon, wethbitApi) =>{
    const res = await fetch(`${forWethbitBaseURL}lat=${lat}&lon=${lon}&key=${wethbitApi}`)
    try { // API call data
        const data = await res.json()
        return data
    } catch(error) {
        console.log("error", error)
    }
}

//Get Forecast Weather
const getForecastWeather = async (curWethbitBaseURL, lat, lon, wethbitApi) =>{
    const res = await fetch(`${curWethbitBaseURL}lat=${lat}&lon=${lon}&key=${wethbitApi}`)
    try { // API call data
        const data = await res.json()
        return data
    } catch(error) {
        console.log("error", error)
    }
}

//Get image of destination 
const getDestImg = async (pixBaseURL, dest, pixApi) =>{
    const res = await fetch(`${pixBaseURL}${pixApi}&q=${encodeURIComponent(dest)}&orientation=horizontal&category=travel&per_page=5`)
    try { // API call data
        const data = await res.json()
        return data
    } catch(error) {
        console.log("error", error)
    }
}


// Post function
const postData = async (url = '', data= {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(data),
    })
    try {
        //Get analysed data from server side
        const analysedData = await response.json();
        return analysedData
    } catch(error) {
        console.log("error", error);
    }
}


// Update UI
const updateUI = async () => {
    const request = await fetch('/data') // GET request from /data to access projectData object
    try{ //Edit innerhtml to fill info from projectData
        const projectData = await request.json()        
        document.getElementById('destPrev').setAttribute("src", `${projectData.img}`)
        document.getElementById('destCard').innerHTML = `${projectData.daysTill} days until your trip to: ${projectData.dest}, ${projectData.country}`

        document.getElementById('tripLength').innerHTML = `Trip Length: ${projectData.tripLength} days`
        document.getElementById('arriving').innerHTML = `Arriving: ${projectData.arival}`
        document.getElementById('departing').innerHTML = `Departing: ${projectData.departure}`

        document.getElementById('tempHigh').innerHTML = `<strong>High: </strong>${projectData.tempHigh}`
        document.getElementById('tempLow').innerHTML = `<strong>Low: </strong>${projectData.tempLow}`
        document.getElementById('wethDesc').innerHTML = projectData.wethDesc

        document.getElementById('resultsCard').classList.remove("hideMe")
    } catch(error) {
      console.log("error", error)
    }
}

export { handleSubmit }