import express from 'express'
import config from './config'

const app = express()

app.get('/', (request, response) => {
   response.send("hello world!")
})

app.listen(config.PORT, () => {
   console.log(`Server started on localhost:${config.PORT}`)
})