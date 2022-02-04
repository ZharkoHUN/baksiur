"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = require("../lib/auth");

var _links = require("../controllers/links.controller");

var router = (0, _express.Router)(); // Authorization

router.use(_auth.isAdmin); // Routes

router.get("/add", _links.renderAddLink);
router.post("/add", _links.addLink);
router.get("/", _auth.isAdmin, _links.renderLinks);
router.get("/delete/:id", _links.deleteLink);
router.get("/edit/:id", _links.renderEditLink);
router.post("/edit/:id", _links.editLink);
var _default = router;
exports["default"] = _default;