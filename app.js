const fs = require('fs')
const express = require('express')
const app = express()
const port = 3001
let data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))
// console.log(data);

function sortByPrice(data, isAsc) {
    if (isAsc) {
        data.sort((a, b) => a.price - b.price)
    } else {
        data.sort((a, b) => b.price - a.price)
    }
}

app.get('/', (req, res) => {
    let newData = []
    if (req.query.sort === 'asc') {
        sortByPrice(data, true)
    } else if (req.query.sort === 'desc') {
        sortByPrice(data, false)
    }
    res.send(data)
})

app.get('/:company', (req, res) => {
    // console.log(req.params.company);
    let newData = data.filter(el => {
        return el.company === req.params.company
    })
    if (req.query.sort === 'asc') {
        sortByPrice(newData, true)
    } else if (req.query.sort === 'desc') {
        sortByPrice(newData, false)
    }

    res.send(newData)
})

app.get('/:company/:variant', (req, res) => {
    console.log(req.params);
    let newData = data.filter(el => {
        return el.company === req.params.company && el.variant === req.params.variant
    })

    if (req.query.sort === 'asc') {
        sortByPrice(newData, true)
    } else if (req.query.sort === 'desc') {
        sortByPrice(newData, false)
    }

    res.send(newData)
})






//params
app.get('/endpoint1/:name/:hobby', (req, res) => {
    console.log(req.params);
    req.params.name = req.params.name.toUpperCase()
    res.send(`nama saya adalah ${req.params.name}, hobi saya adalah ${req.params.hobby}`)
})

//query
app.get('/endpoint2', (req, res) => {
    console.log(req.query);
    if (req.query.hobby === 'main game') {
        res.send('jangan maen game mulu, kerja dong')
    } else if (req.query.hobby === 'kerja') {
        res.send('jangan kerja mulu, maen game dong')
    }
    // res.send(`nama saya adalah ${req.query.name}, hobi saya adalah ${req.query.hobby}`)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})