const PORT = 8000

const express = require('express')
// Todo: uninstall
/*const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const { google } = require('googleapis')*/


const app = express()

app.use(express.static('./public'))
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))