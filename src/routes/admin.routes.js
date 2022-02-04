import { Router } from "express";
import { isLoggedIn, isAdmin } from "../lib/auth";
import {
  renderAddLink,
  addLink,
  renderLinks,
  deleteLink,
  editLink,
  renderEditLink,
} from "../controllers/admin.controller";

const router = Router();
// Authorization
router.use(isAdmin);

// Routes
router.get("/add", renderAddLink);
router.post("/add", addLink);
router.get("/", isAdmin, renderLinks);
router.get("/delete/:id", deleteLink);
router.get("/edit/:id", renderEditLink);
router.post("/edit/:id", editLink);


export default router;
