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
   const expenseItem = req.body as CreateExpenseItem
   const userId = req.session.userId!

   try {
      await ExpenseItemService.insertExpenseItem(userId, expenseItem)
      const expenseItems = await ExpenseItemService.retrieveExpenseItems(userId)
      res.json({ expenseItems })
   } catch (error) {
      next(error)
   }
})

expenseItemRouter.delete('/', isAuthenticated, async (req, res, next) => {
   const userId = req.session.userId!
   const itemId = req.body.itemId
   if (!itemId) {
      return next(new Error("Missing information"))
   }

   try {
      await ExpenseItemService.deleteExpenseItem(itemId, userId)
      const expenseItems = await ExpenseItemService.retrieveExpenseItems(userId)
      res.json({ expenseItems })
   } catch (error) {
      next(error)
   }
})

expenseItemRouter.put('/', isAuthenticated, (req, res, next) => {
   next(new Error("Not implemented yet"))
})

export { expenseItemRouter }