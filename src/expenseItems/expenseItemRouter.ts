import express from 'express'
import { isAuthenticated } from '../middleware/isAuthenticated'

const expenseItemRouter = express.Router()

expenseItemRouter.post('/retrieve', isAuthenticated, (req, res) => {
   res.end()
})

expenseItemRouter.post('/create', isAuthenticated, (req, res) => {
   res.end()
})

expenseItemRouter.delete('/', isAuthenticated, async (req, res, next) => {
   res.end()
})

expenseItemRouter.put('/', isAuthenticated, (req, res, next) => {
   res.end()
})

export { expenseItemRouter }