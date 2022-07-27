// API Call Variables
const geoBaseURL = "http://api.geonames.org/postalCodeSearchJSON?"
const geoUser = process.env.GEO_USER
const curWethbitBaseURL = "https://api.weatherbit.io/v2.0/current?" // For current weather
const forWethbitBaseURL = "https://api.weatherbit.io/v2.0/forecast/daily?" // For forecast weather
const wethbitApi = process.env.WEATHERBIT_API

// http://api.geonames.org/postalCodeSearchJSON?placename=Melbourne&maxRows=5&username=demo example geoname api call
// https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=API_KEY example current weatherbit api call
// https://api.weatherbit.io/v2.0/forecast/daily?lat=35.7796&lon=-78.6382&key=API_KEY example forecast weatherbit api call


document.getElementById('destForm').addEventListener('submit', handleSubmit)

async function handleSubmit(e){
    e.preventDefault()

    const dest = document.forms["destForm"]["dest"].value
    const date = new Date(document.forms["destForm"]["arival"].value)
    let d = new Date() // Today's date
    let difference = date.getTime() - d.getTime(); // Converts difference into miliseconds
    let daysTill = Math.ceil(difference / (1000 * 3600 * 24)); // Turns those miliseconds into days
    console.log(`Days until trip: ${daysTill}`) // TO-DO impliment into UI

    getGeoName(geoBaseURL, dest, geoUser) // Get geo name location
    .then(function(geoData){
        if (daysTill < 7) { // If arrival date is less than 16 days
            getCurrentWeather(curWethbitBaseURL, geoData.postalCodes[0].lat, geoData.postalCodes[0].lng, wethbitApi)
            .then(function(curData){
                console.log(curData.data[0].temp) // TO-DO impliment into UI
            })
        } else if (daysTill > 16) { // If arrival date is greater than 16 days
            console.log("Cannot forecast weather this far ahead") // TO-DO impliment into UI
        } else { // If arrival date is between 7-16 days
            getForecastWeather(forWethbitBaseURL, geoData.postalCodes[0].lat, geoData.postalCodes[0].lng, wethbitApi)
            .then(function(forData){
                console.log(forData.data[daysTill - 1].temp) // TO-DO impliment into UI
            })
        }
        console.log(geoData.postalCodes[0].countryCode) // TO-DO Remove
        // postData('/add', {latitude: data.postalCodes[0].lat, longitude: data.postalCodes[0].lng, country: data.postalCodes[0].countryCode, placeName: data.postalCodes[0].placeName}) // TO-DO fix exact values
        // updateUI() // Update UI to display the data
    })

}


//Get geo name data
const getGeoName = async (geoBaseURL, dest, geoUser) =>{
    const res = await fetch(`${geoBaseURL}placename=${dest}&maxRows=5&username=${geoUser}`)
    try { //API call using the baseurl, zipcode and api key
        const data = await res.json()
        console.log(data)
        return data
    } catch(error) {
        console.log("error", error)
    }
}

//Get Current Weather
const getCurrentWeather = async (forWethbitBaseURL, lat, lon, wethbitApi) =>{
    const res = await fetch(`${forWethbitBaseURL}lat=${lat}&lon=${lon}&key=${wethbitApi}`)
    try { //API call using the baseurl, zipcode and api key
        const data = await res.json()
        console.log(data)
        return data
    } catch(error) {
        console.log("error", error)
    }
}

//Get Forecast Weather
const getForecastWeather = async (curWethbitBaseURL, lat, lon, wethbitApi) =>{
    const res = await fetch(`${curWethbitBaseURL}lat=${lat}&lon=${lon}&key=${wethbitApi}`)
    try { //API call using the baseurl, zipcode and api key
        const data = await res.json()
        console.log(data)
        return data
    } catch(error) {
        console.log("error", error)
    }
}

















// async function handleSubmit(e) {
//     e.preventDefault()

//     // check what text was put into the form field
//     let formText = document.getElementById('name').value
//     Client.checkForName(formText)
//     console.log("::: Form Submitted :::") // Verify submission
    
//     getMeaningCloudData(baseURL, formText, apiKey) // Get weather info through API Call
//     .then(function(data){
//         postData('/add', {data}) // Send data to the server to be added to the database
//         updateUI() // Update UI to display the data
//     })
// }

// // Meaning Cloud API call
// const getMeaningCloudData = async (baseURL, formText, apiKey)=>{
//     const result = await fetch(`${baseURL}${apiKey}&txt=${formText}&lang=en`)
//     try {
//         const response = await result.json()
//         //Return API Call result
//         console.log(response)
//         return response
//     } catch(error) {
//         console.log("error", error)
//     }
// } 

// // Update UI
// const updateUI = async () => {
//     const request = await fetch('/data') // GET request from /data to access projectData object
//     try{ //Edit innerhtml to fill info from projectData
//         const projectData = await request.json()
//         document.getElementById('results').innerHTML = `<p>Confidence: ${projectData.confidence}</p>
//                                                         <p>Agreement: ${projectData.agreement}</p>
//                                                         <p>Score Tag: ${projectData.score_tag}</p>`
//     } catch(error) {
//       console.log("error", error)
//     }
//   }

// // Post function
// const postData = async (url = '', data= {}) => {
//     const response = await fetch(url, {
//         method: "POST",
//         credentials: "same-origin",
//         headers: {
//             "Content-Type":"application/json",
//         },
//         body: JSON.stringify(data),
//     })
//     try {
//         //Get analysed data from server side
//         const analysedData = await response.json();
//         return analysedData
//     } catch(error) {
//         console.log("error", error);
//     }
// }

export { handleSubmit }