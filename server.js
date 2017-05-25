console.log('May Node be with you')

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())

// All your handlers here...
var db

MongoClient.connect('mongodb://yoda:yoda@ds153501.mlab.com:53501/star-wars-quotes', (err, database) => {
    if (err) return console.log(err)
    db = database
    app.listen(8080, function() {
        console.log('Listening on 8080')
    })
})

/*// app.get('/', (req, res) => {
//     res.send('Hello World')
    // Note: request and response are usually written as req and res respectively.
// })


// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
//     // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
//     console.log(__dirname)
// })

// app.get('/', (req, res) => {
//     var cursor = db.collection('quotes').find().toArray( function (err, results) {
//         console.log(results)
//         // send HTML file populated with quotes here
//     })
// })*/
app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
        if (err) return console.log(err)
        // renders index.ejs
        res.render('index.ejs', {quotes: result})
    })
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

app.put('/quotes', (req, res) => {
    db.collection('quotes').findOneAndUpdate({name: 'Yoda'}, {
        $set: {
            name: req.body.name,
            quote: req.body.quote
        }
    }, {
        sort: {_id: -1},
        upsert: true
    }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
    })
})
