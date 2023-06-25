const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')


const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

//route static
app.use('/assets/uploads', express.static('uploads/'))

app.use('/', require('./src/routes'))


app.get('/', (req, res) =>{
  return res.status(200).json({
    success: true,
    message: "Backend is running well by yogi"
  })
})

const port = process.env.PORT || 8888;
app.listen(port, ()=>{
  console.log("app listening on port " + port)
})