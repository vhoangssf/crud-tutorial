console.log('May Node be with you')

const express = require('express');
const app = express();

app.listen(8080, function() {
    console.log('Listening on 8080')
})

// app.get('/', (req, res) => {
//     res.send('Hello World')
    // Note: request and response are usually written as req and res respectively.
// })


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
    console.log(__dirname)
})