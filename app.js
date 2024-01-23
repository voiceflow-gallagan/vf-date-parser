require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const parseDate = require('parse-human-date')

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// ENDPOINT
app.get('/', function (req, res) {
  res.json({
    info: 'parse-human-date API v1.1 | V⦿iceflow | 2022',
  })
})

app.get('/health', function (req, res) {
  res.json({
    success: true,
    info: 'parse-human-date API v1.1 | V⦿iceflow | 2022',
    status: 'healthy',
    error: null,
  })
})
// Call
app.post('/date', function (req, res) {
  try {
    if (req.body.date) {
      let timezone = req.body.tz || 0
      if (timezone === undefined || isNaN(parseFloat(timezone))) {
        timezone = 0
      }
      timezone = Math.round(parseFloat(timezone))
      let theDate = req.body.date
      theDate = theDate.toLowerCase()
      const regex_am = /\b( ([Aa][.][Mm][.]))/g
      const regex_pm = /\b( ([Pp][.][Mm][.]))/g
      theDate = theDate.replace(regex_am, 'am')
      theDate = theDate.replace(regex_pm, 'pm')
      const date = parseDate(theDate)
      date.setHours(date.getHours() + timezone)
      res.json({
        success: true,
        debug: theDate,
        error: null,
        date,
      })
    } else {
      res.json({
        success: false,
        error: 'Unable to parse the date',
      })
    }
  } catch (error) {
    console.error(error)
    res.json({
      success: false,
      error: 'Error generating the date',
    })
  }
})

// SERVEUR
http.createServer(app).listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
