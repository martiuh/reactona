const { Router } = require('express')
const api = Router()

api.all('*', (req, res) => {
  res.send('Besillo!!!')
})

module.exports = api
