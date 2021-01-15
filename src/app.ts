import express from 'express'
import config from './config/config'

const app = express()
app.use(express.json())

app.get('/', (request, response) => {
   response.send("hello world!")
})

app.listen(config.PORT, () => {
   console.log(`Server started on localhost:${config.PORT}`)
})