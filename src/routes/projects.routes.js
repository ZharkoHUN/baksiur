import { Router } from "express";
import { isLoggedIn, isAdmin } from "../lib/auth";
import {
  renderAddProject,
  addProject,
  renderProjects,
  deleteProject,
  editProject,
  renderProject,
  renderEditProject, 
  redirectProjects,
  addState,
  deleteState, 
  createDir, downloadFile, uploadImages, loadImage, deleteFile, deleteImage,
  addUserToProject, removeUserFromProject
} from "../controllers/projects.controller";

const router = Router();
// Authorization
router.use(isLoggedIn);

// Routes

//Főoldal
router.get("/", isLoggedIn, renderProjects);

// Project kezelés
router.get("/add", renderAddProject);
router.post("/add", addProject);
router.get("/delete/:id", deleteProject);
// Státusz
router.get("/show/deletestate/:projectid/:id", deleteState);
router.post("/state/:id", addState);
// Megjelenítés
router.get("/show/:id", renderProject);
// Letöltés
router.get("/download/:id/:name", downloadFile);
// File törlés
router.get("/deletefile/:id/:name", deleteFile);
router.get("/deleteimage/:id/:name", deleteImage);
// Feltöltés
router.post("/makedir/:id", createDir);
router.post("/uploadimages/:id", uploadImages);
router.get("/loadimage/:id/:picid", uploadImages);
// Project edit
router.get("/edit/:id", renderEditProject);
router.post("/edit/:id", editProject);
router.get("/edit/:id/adduser/:userid", addUserToProject);
router.get("/edit/:id/removeuser/:userid", removeUserFromProject);

export default router;
