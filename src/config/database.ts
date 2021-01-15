import { Pool } from 'pg'
import config from './config'

export const pool = new Pool({
   database: config.DATABASE_NAME,
   host: config.DATABASE_HOST,
   port: config.DATABASE_PORT
})

