import "regenerator-runtime/runtime"; //for jest

const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data) 
  });
    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
}

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    
    // check if text is url or text
    let data = Client.checkForInputType(formText)
    if (data.error != null){
        document.getElementById('message').innerHTML = data.error
        return;
    }else{
        document.getElementById('message').innerHTML = "Input your text or url"
    }
    console.log(data);
    console.log("::: Form Submitted :::")
    postData('http://localhost:8081/nlp', data)
    .then(function(res) {
        console.log(res)
        if(res.polarity != null){
            document.getElementById('message').innerHTML = "Input your text or url"
            document.getElementById('results').innerHTML = createResultHTML(res);
        }else{
            document.getElementById('message').innerHTML = "Something is wrong with your input! Check if your url is working."
        }
        
    })
}

function createResultHTML(data){
    const resultHTML = 
    `<div class="card">
        <p>Details:</p>
        <ul>
            <li><span class="bold">Polarity</span>: ${data.polarity}</li>
            <li><span class="bold">Polarity Confidence;</span>: ${data.polarity_confidence}</li>
            <li><span class="bold">Subjectivity:</span>: ${data.subjectivity}</li>
            <li><span class="bold">Subjectivity Confidence;</span>: ${data.subjectivity_confidence}</li>
        </ul>
        <p>Text:</p>
        <p>${data.text}</p>
    </div>`;
return resultHTML;
}
export { handleSubmit }
