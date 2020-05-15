
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
    Client.checkForName(formText)
    let data = {text: formText};
    // check if text is url
    if (/https?:\/\/.+\.[a-z]{2,3}/g.test(formText)) {
        data = {url: formText}
    }
    console.log(data);
    console.log("::: Form Submitted :::")
    postData('http://localhost:8081/nlp', data)
    .then(function(res) {
        console.log(res)
        document.getElementById('results').innerHTML = res.polarity;
    })
}

export { handleSubmit }
