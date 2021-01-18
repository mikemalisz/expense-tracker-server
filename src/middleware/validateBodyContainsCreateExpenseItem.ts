import express from 'express'

export function validateBodyContainsCreateExpenseItem(req: express.Request, res: express.Response, next: express.NextFunction) {

   const { amountInCents, dateOfPurchase, expenseTitle, expenseDescription } = req.body as Partial<CreateExpenseItem>
   const isAmountSet = typeof amountInCents === 'number'
   const isDateSet = typeof dateOfPurchase === 'number'
   const isTitleSet = typeof expenseTitle === 'string'
   const isDescriptionSet = typeof expenseDescription === 'string'

   if (isAmountSet && isDateSet && isTitleSet && isDescriptionSet) {
      // convert date of purchase from seconds to milliseconds
      const sanitizedDateOfPurchase = Math.round(dateOfPurchase! * 1000)
      req.body.dateOfPurchase = sanitizedDateOfPurchase
      next()
   } else {
      const missingInformationError = new Error("Missing information")
      next(missingInformationError)
   }
}