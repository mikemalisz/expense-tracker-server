import express from 'express'
import { TokenService } from './TokenService'
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
      res.json(result)
   } catch (error) {
      // pass error to error handler
      next(error)
   }
})

export { authenticationRouter }