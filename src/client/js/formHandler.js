// API Call Variables
const baseURL = "https://api.meaningcloud.com/sentiment-2.1?key="
const apiKey = process.env.MC_API_KEY;

async function handleSubmit(e) {
    e.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)
    console.log("::: Form Submitted :::") // Verify submission
    
    getMeaningCloudData(baseURL, formText, apiKey) // Get weather info through API Call
    .then(function(data){
        postData('/add', {data}) // Send data to the server to be added to the database
        updateUI() // Update UI to display the data
    })
}

// Meaning Cloud API call
const getMeaningCloudData = async (baseURL, formText, apiKey)=>{
    const result = await fetch(`${baseURL}${apiKey}&txt=${formText}&lang=en`)
    try {
        const response = await result.json()
        //Return API Call result
        console.log(response)
        return response
    } catch(error) {
        console.log("error", error)
    }
} 

// Update UI
const updateUI = async () => {
    const request = await fetch('/data') // GET request from /data to access projectData object
    try{ //Edit innerhtml to fill info from projectData
        const projectData = await request.json()
        document.getElementById('results').innerHTML = `<p>Confidence: ${projectData.confidence}</p>
                                                        <p>Agreement: ${projectData.agreement}</p>
                                                        <p>Score Tag: ${projectData.score_tag}</p>`
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

export { handleSubmit }