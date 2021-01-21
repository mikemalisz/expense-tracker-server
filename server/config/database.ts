import { Pool, QueryResult } from 'pg'
import config from './config'

export const pool = new Pool({
   database: config.DATABASE_NAME
})

export async function databaseQuery(text: string, params: any = []): Promise<QueryResult<any>> {
   return await pool.query(text, params)
}

