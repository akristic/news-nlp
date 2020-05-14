function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    const text = document.getElementById('name');
    let body = JSON.stringify({text: text.value})
    
    // check if text is url
    if (/https?:\/\/.+\.[a-z]{2,3}/g.test(text.value)) {
        body = JSON.stringify({url: text.value})
    }

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/nlp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
    })
    .then(res => res.json())
    .then(function(res) {
        console.log(res)
        document.getElementById('results').innerHTML = res.polarity;
    })
}

export { handleSubmit }
