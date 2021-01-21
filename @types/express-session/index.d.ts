import { UserAccount } from "../../server/authentication/UserAccount"

declare module 'express-session' {
   interface SessionData {
      userId?: string
   }
}