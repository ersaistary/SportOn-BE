import { Router } from "express";
import { signin, initateAdmin } from "../controllers/auth.controller";

const router = Router();

router.post("/signin", signin);
router.post("/initiate-admin-user", initateAdmin);

export default router
