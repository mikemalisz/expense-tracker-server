import express, { Router } from 'express'
import config from './config/config'
import { sessionHandler } from "./config/session"
import { authenticationRouter } from "./authentication/authenticationRouter"
import { expenseItemRouter } from './expenseItems/expenseItemRouter'
import { router } from './config/router'

const app = express()
app.disable('x-powered-by')

// Middleware setup
app.use(express.json())
app.use(sessionHandler)

// routes setup - prefix all routes with /expense-tracker/
app.use('/expense-tracker', router)

// catches all errors and sends their message to client
app.use((error: Error, request: express.Request, response: express.Response, next: express.NextFunction) => {
   console.error(error)
   response.status(500).json({ errorMessage: error.message })
})

app.listen(config.PORT, () => {
   console.log(`Server started on localhost:`, config.PORT)
})