import { Router } from "express";
import { getMain } from "../controllers/main.controller"
import { postData } from "../controllers/redact.controller";

const router:Router = Router();

router.get('/main', getMain);
router.post('/redact', postData)

export default router;