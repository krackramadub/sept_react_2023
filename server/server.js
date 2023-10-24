import express, { json } from 'express'
import mainRoute from './routes/mainRoute.js'
import bodyParser from 'body-parser'
import cors from 'cors'
const app = express()

const PORT = 3900
app.use(express.json())
app.use(bodyParser.urlencoded())
app.use(cors())

app.use('/', mainRoute)

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
})