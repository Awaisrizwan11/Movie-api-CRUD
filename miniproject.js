const express = require('express');
const app = express();
app.use(express.json())
let movie = [{
        id: 1,
        name: "Arrow",
        rating: 4,
        len_min: 150,
        len_hours: 2

    },
    {
        id: 2,
        name: "spiderman",
        rating: 4.5,
        len_min: 130,
        len_hours: 1
    },
    {
        id: 3,
        name: "superman",
        rating: 5,
        len_min: 150,
        len_hours: 3
    },
]



app.get('/', function (req, res) {
    res.json({
        Message: "api is working"
    })
})

app.get('/search/:id', function (req, res) {
    const id = req.params.id

    let index = movie.findIndex((m) => {
        return (m.id == Number.parseInt(id))
    })
    console.log(movie[index])
    res.send(movie[index])

})

app.get('/api/movie', function (req, res) {
    res.json(movie)

})
app.post('/api/movie', function (req, res) {
    let new_movie = {
        id: movie.length + 1,
        name: req.body.name,
        rating: req.body.rating,
        len_min: req.body.len_min,
        len_hours: req.body.len_hours

    }
    movie.push(new_movie)
    res.json(movie)
})

app.put('/api/movie/:id', function (req, res) {
    let id = req.params.id
    let name = req.body.name
    let rating = req.body.rating
    let len_min = req.body.len_min
    let len_hours = req.body.len_hours

    let index = movie.findIndex((movie) => {
        return (movie.id == Number.parseInt(id))
    })
    if (index >= 0) {
        let mov = movie[index]
        mov.name = name
        mov.rating = rating
        mov.len_min = len_min
        mov.len_hours = len_hours
        res.json(mov)
    } else {
        res.status(400)
        res.end()
    }
})

app.delete('/api/movie/:id', function (req, res) {
    let id = req.params.id

    let index = movie.findIndex((m) => {
        return (m.id == Number.parseInt(id))
    })

    if (index >= 0) {
        let mov = movie[index]

        movie.splice(index)
        res.json(mov)
    }
})

const port = process.env.PORT || 9000
app.listen(port, () => {
    console.log(`running on ${port}...`)

});