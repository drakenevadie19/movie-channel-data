const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(8001, () => {
    console.log("Server is running on port 8001")
})
