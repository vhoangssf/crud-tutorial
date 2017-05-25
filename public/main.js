// main.js


var update = document.getElementById('update')

update.addEventListener('click', function() {
    // send PUT request here
    window.fetch('quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'name': 'Darth Vader',
            'quote': 'I find your lack of faith disturbing.'
        })
    })

    window.fetch({ /* request */})
    .then( res => {
        if (res.ok) return res.json()
    })
    .then(data => {
        console.log(data)
        window.location.reload(true)
    })
        
})

