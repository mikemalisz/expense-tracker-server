import express from 'express'

export function validateBodyContainsCreateExpenseItem(req: express.Request, res: express.Response, next: express.NextFunction) {
   const missingInformationError = new Error("Missing information")
   const expenseItem = (req.body.expenseItem || {}) as Partial<CreateExpenseItem> | undefined

   if (!expenseItem) {
      next(missingInformationError)
   } else if (!expenseItem.amountInCents || !expenseItem.dateOfPurchase || !expenseItem.expenseTitle) {
      next(missingInformationError)
   } else {
      // convert date of purchase from seconds to milliseconds
      const sanitizedDateOfPurchase = Math.round(expenseItem.dateOfPurchase * 1000)
      req.body.expenseItem.dateOfPurchase = sanitizedDateOfPurchase
      next()
   }
}