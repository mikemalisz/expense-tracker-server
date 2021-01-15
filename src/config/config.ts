import * as dotenv from 'dotenv'
dotenv.config()

export default {
   PORT: process.env.PORT,
   DATABASE_NAME: process.env.DATABASE_NAME,
   DATABASE_HOST: process.env.DATABASE_HOST,
   DATABASE_PORT: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : undefined,
   SESSION_SECRET: process.env.SESSION_SECRET!,
   SESSION_ID: "expenseSessionId"
}