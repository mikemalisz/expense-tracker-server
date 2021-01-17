import express from 'express'
import { TokenService } from './TokenService'
import { databaseQuery } from '../config/database'
import { UserAccount } from './UserAccount'

const authenticationRouter = express.Router()

authenticationRouter.get("/status", (req, res) => {
   // check if userId property exists on the session object
   const isAuthenticated = (typeof req.session.userId === 'string')
   res.json({ isAuthenticated })
})

authenticationRouter.post('/authenticate', async (req, res, next) => {
   const { identityToken, clientId } = req.body
   if ((typeof identityToken != 'string') || typeof clientId != 'string') {
      return next(new Error("Missing request data"))
   }

   const service = new TokenService()
   try {
      const result = await service.verifyIdentityToken(identityToken, clientId)

      // now that identity token is verified, see if user 
      // already exists or not in our database before updating session object
      const userExistsQuery = await databaseQuery('SELECT user_id FROM accounts WHERE apple_user_id=$1', [result.sub])
      if (userExistsQuery.rowCount > 0) {
         // user already exists, just authenticate them
         req.session.userId = userExistsQuery.rows[0].user_id
      } else {
         // user doesn't exist yet, insert their information into the table
         // and then authenticate them
         const insertQueryResults = await databaseQuery('INSERT INTO accounts(apple_user_id, email) VALUES($1, $2) RETURNING user_id', [result.sub, result.email])
         req.session.userId = insertQueryResults.rows[0].user_id
      }

      res.end()
   } catch (error) {
      // pass error to error handler
      next(error)
   }
})

authenticationRouter.post('/logout', (req, res, next) => {
   if (req.session.userId) {
      delete req.session.userId
   }
   res.end()
})

export { authenticationRouter }