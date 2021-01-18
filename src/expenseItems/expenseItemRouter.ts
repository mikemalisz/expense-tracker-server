import express from 'express'
import { databaseQuery } from '../config/database'
import { isAuthenticated } from '../middleware/isAuthenticated'
import { validateBodyContainsCreateExpenseItem } from '../middleware/validateBodyContainsCreateExpenseItem'
import { ExpenseItemService } from './ExpenseItemService'

const expenseItemRouter = express.Router()

expenseItemRouter.get('/retrieve', isAuthenticated, async (req, res, next) => {
   const userId = req.session.userId!

   try {
      const expenseItems = await ExpenseItemService.retrieveExpenseItems(userId)
      res.json({ expenseItems })
   } catch (error) {
      next(error)
   }
})

expenseItemRouter.post('/create', isAuthenticated, validateBodyContainsCreateExpenseItem, async (req, res, next) => {
   const { expenseItem } = req.body as CreateExpenseItemBody
   const userId = req.session.userId!

   try {
      await ExpenseItemService.insertExpenseItem(userId, expenseItem)
      const expenseItems = await ExpenseItemService.retrieveExpenseItems(userId)
      res.json({ expenseItems })
   } catch (error) {
      next(error)
   }
   res.end()
})

expenseItemRouter.delete('/', isAuthenticated, async (req, res, next) => {
   res.end()
})

expenseItemRouter.put('/', isAuthenticated, (req, res, next) => {
   res.end()
})

export { expenseItemRouter }