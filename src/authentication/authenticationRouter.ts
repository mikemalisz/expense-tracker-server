import express from 'express'
import { UserAccount } from './UserAccount'

const authenticationRouter = express.Router()

authenticationRouter.get("/status", (req, res) => {
   // check if userId property exists on the session object
   const isAuthenticated = (typeof req.session.userId === 'string')
   res.json({ isAuthenticated })
})

authenticationRouter.post('/authenticate', (req, res) => {

})

export { authenticationRouter }