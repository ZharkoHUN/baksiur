"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = require("../lib/auth");

var _projects = require("../controllers/projects.controller");

var router = (0, _express.Router)(); // Authorization

router.use(_auth.isLoggedIn); // Routes
//Főoldal

router.get("/", _auth.isLoggedIn, _projects.renderProjects); // Project kezelés

router.get("/add", _projects.renderAddProject);
router.post("/add", _projects.addProject);
router.get("/delete/:id", _projects.deleteProject); // Státusz

router.get("/show/deletestate/:projectid/:id", _projects.deleteState);
router.post("/state/:id", _projects.addState); // Megjelenítés

router.get("/show/:id", _projects.renderProject); // Letöltés

router.get("/download/:id/:name", _projects.downloadFile); // File törlés

router.get("/deletefile/:id/:name", _projects.deleteFile);
router.get("/deleteimage/:id/:name", _projects.deleteImage); // Feltöltés

router.post("/makedir/:id", _projects.createDir);
router.post("/uploadimages/:id", _projects.uploadImages);
router.get("/loadimage/:id/:picid", _projects.uploadImages); // Project edit

router.get("/edit/:id", _projects.renderEditProject);
router.post("/edit/:id", _projects.editProject);
router.get("/edit/:id/adduser/:userid", _projects.addUserToProject);
router.get("/edit/:id/removeuser/:userid", _projects.removeUserFromProject);
var _default = router;
exports["default"] = _default;