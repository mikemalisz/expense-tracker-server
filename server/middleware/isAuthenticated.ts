import express from 'express'

export function isAuthenticated(req: express.Request, res: express.Response, next: express.NextFunction) {
   if (req.session.userId) {
      next()
   } else {
      next(new Error("Authentication required"))
   }
}