import { Router } from "express";
import auth from "./auth.routes";
import index from "./index.routes";
import links from "./links.routes";
import user from "./user.routes";
import arajanlat from "./arajanlat.routes";
import admin from "./admin.routes";
import projects from "./projects.routes";

const router = Router();

router.use(index);
router.use(auth);
router.use(user);
router.use("/links", links);
router.use("/admin", admin);
router.use("/projects", projects);
router.use("/arajanlat", arajanlat);

export default router;
