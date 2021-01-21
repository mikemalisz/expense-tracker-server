import { Router } from "express";
import { authenticationRouter } from "../authentication/authenticationRouter";
import { expenseItemRouter } from "../expenseItems/expenseItemRouter";


export const router = Router()
router.use('/auth', authenticationRouter)
router.use('/expense-items', expenseItemRouter)