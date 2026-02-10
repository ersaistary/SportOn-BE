import { Router } from "express";
import {createTransaction, getTransactions, getTransactionById, updateTransaction} from "../controllers/transaction.controller"
import { upload } from "../middlewares/upload.middleware";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/checkout", authenticate, upload.single("image"), createTransaction)
router.get("/", authenticate, getTransactions);
router.get("/:id", getTransactionById);
router.patch("/:id",  authenticate, upload.single("image"), updateTransaction); 

export default router