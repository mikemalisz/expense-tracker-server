import session from 'express-session'
import UnconfiguredSessionStore from 'connect-pg-simple'
import { pool } from './database'
import config from "./config"

const PostgresSesionStore = UnconfiguredSessionStore(session)

export const sessionHandler = session({
   store: new PostgresSesionStore({
      pool
   }),
   secret: config.SESSION_SECRET,
   resave: false,
   proxy: config.IS_PRODUCTION_MODE,
   cookie: {
      secure: config.IS_PRODUCTION_MODE,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000
   }, // 10 years, 10 years * 365 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
   saveUninitialized: true,
   name: config.SESSION_ID
})