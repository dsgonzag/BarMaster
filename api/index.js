var express = require('express');
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/api/tbl_users',(req,res) => {})

app.get('/api/tbl_users/:id',(req,res) => {})

app.listen(port, () => {
    console.log('Api rest corriendo')
})