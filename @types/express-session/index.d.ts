import { UserAccount } from "../../src/authentication/UserAccount"

declare module 'express-session' {
   interface SessionData {
      userId?: string
   }
}