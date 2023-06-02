const express = require('express')
const cors = require('cors')


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use('/', require('./src/routes'))


app.get('/', (req, res) =>{
  return res.status(200).json({
    success: true,
    message: "Backend is running well"
  })
})

const port = process.env.PORT || 8888;
app.listen(port, ()=>{
  console.log("app listening on port " + port)
})