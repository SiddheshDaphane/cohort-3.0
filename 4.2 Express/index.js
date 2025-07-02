const express = require('express')

const app = express()

// route handlers
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/asd', (req, res) => {
  res.send('Hello World from asd!')
})


app.listen(3000)
