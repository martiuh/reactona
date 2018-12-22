const { Router } = require('express')
const naturePictures = require('./nature-pictures.json')
/*
  TODO:
    Send data in random order
*/

const api = Router()

api.get('/photos', (req, res) => res.send(naturePictures))

api.all('*', (req, res) => {
  res.send('Gansito!!!')
})

module.exports = api
