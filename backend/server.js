const express = require('express')
const routers = require('./src/routes')
const cors = require('cors')
const morgan = require('morgan')
const compression = require('compression')
const routersV1 = require('./src/routes')

require('dotenv').config()

const app = express()

app.use(cors())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use(routers)
app.use('/api/v1', routersV1)

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/index.html`)
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
