interface ExpenseItem {
   userId: string
   itemId: string
   amountInCents: number
   expenseTitle: string
   expenseDescription?: string
   dateOfPurchase: number
   dateCreated: number
}

interface CreateExpenseItem {
   amountInCents: number
   expenseTitle: string
   expenseDescription?: string
   dateOfPurchase: number
}

interface CreateExpenseItemBody {
   expenseItem: CreateExpenseItem
}