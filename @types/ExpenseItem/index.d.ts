interface ExpenseItem extends CreateExpenseItem {
   userId: string
   itemId: string
   dateCreated: number
}

interface CreateExpenseItem {
   amountInCents: number
   expenseTitle: string
   expenseDescription: string
   dateOfPurchase: number
}