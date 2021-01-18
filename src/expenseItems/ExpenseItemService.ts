import { databaseQuery } from "../config/database";

export class ExpenseItemService {
   static async retrieveExpenseItems(userId: string): Promise<ExpenseItem[]> {
      const queryResult = await databaseQuery('SELECT * FROM expense_items WHERE user_id=$1', [userId])
      return queryResult.rows
   }

   static async insertExpenseItem(userId: string, item: CreateExpenseItem): Promise<void> {
      const { amountInCents, expenseTitle, expenseDescription, dateOfPurchase } = item
      const queryParameters = [userId, amountInCents, expenseTitle, expenseDescription, dateOfPurchase, Date.now()]
      await databaseQuery('INSERT INTO expense_items(user_id, amount_in_cents, expense_title, expense_description, date_of_purchase, date_created) VALUES($1, $2, $3, $4, $5, $6)', queryParameters)
   }
}