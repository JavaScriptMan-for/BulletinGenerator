import { Router } from "express";
import { postData } from "../controllers/redact.controller";

const router:Router = Router();

router.post('/redact', postData)

export default router;