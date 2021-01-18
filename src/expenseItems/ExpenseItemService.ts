import { databaseQuery } from "../config/database";

export class ExpenseItemService {
   static async retrieveExpenseItems(userId: string): Promise<ExpenseItem[]> {
      /*
      NOTE: parameterized ORDER BY queries are not supported by Postgres
      https://github.com/brianc/node-postgres/issues/300
      Possible workarounds with CASE: https://stackoverflow.com/questions/8139618/postgresql-parameterized-order-by-limit-in-table-function
      */
      const queryText = `
      SELECT
         item_id AS "itemId",
         user_id AS "userId",
         amount_in_cents AS "amountInCents",
         expense_title AS "expenseTitle",
         expense_description AS "expenseDescription",
         date_of_purchase AS "dateOfPurchase",
         date_created AS "dateCreated"
      FROM expense_items
      WHERE user_id=$1
      ORDER BY date_of_purchase DESC
      `
      const queryResult = await databaseQuery(queryText, [userId])
      console.log(queryResult.rows)
      return queryResult.rows
   }

   static async insertExpenseItem(userId: string, item: CreateExpenseItem): Promise<void> {
      const { amountInCents, expenseTitle, expenseDescription, dateOfPurchase } = item
      const queryParameters = [userId, amountInCents, expenseTitle, expenseDescription, dateOfPurchase, Date.now()]
      await databaseQuery('INSERT INTO expense_items(user_id, amount_in_cents, expense_title, expense_description, date_of_purchase, date_created) VALUES($1, $2, $3, $4, $5, $6)', queryParameters)
   }

   static async deleteExpenseItem(itemId: string, userId: string) {
      // require userId and itemId to help prevent unauthorized deletions
      await databaseQuery('DELETE FROM expense_items WHERE item_id=$1 AND user_id=$2', [itemId, userId])
   }
}