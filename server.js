console.log('May Node be with you')

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({extended: true}))

// All your handlers here...
var db

MongoClient.connect('mongodb://yoda:yoda@ds153501.mlab.com:53501/star-wars-quotes', (err, database) => {
    if (err) return console.log(err)
    db = database
    app.listen(8080, function() {
        console.log('Listening on 8080')
    })
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

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) =>
    {
        if (err) return console.log(err)
        
        console.log('saved to database')
        res.redirect('/')
    })
    // console.log(req.body)
})

