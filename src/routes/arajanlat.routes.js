import { Router } from "express";
import { isAdmin } from "../lib/auth";
import { renderArajanlat } from "../controllers/arajanlat.controller";

const router = Router();

router.get("/", isAdmin, renderArajanlat);

export default router;
