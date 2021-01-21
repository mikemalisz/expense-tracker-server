import express from 'express'
import config from './config/config'
import { sessionHandler } from "./config/session"
import { authenticationRouter } from "./authentication/authenticationRouter"
import { expenseItemRouter } from './expenseItems/expenseItemRouter'

const app = express()
app.disable('x-powered-by')

// Middleware setup
app.use(express.json())
app.use(sessionHandler)
app.use('/auth', authenticationRouter)
app.use('/expense-items', expenseItemRouter)

// catches all errors and sends their message to client
app.use((error: Error, request: express.Request, response: express.Response, next: express.NextFunction) => {
   response.status(500).json({ errorMessage: error.message })
})

app.listen(config.PORT, () => {
   console.log(`Server started on localhost:`, config.PORT)
})