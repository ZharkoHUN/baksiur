"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = require("../lib/auth");

var _admin = require("../controllers/admin.controller");

var router = (0, _express.Router)(); // Authorization

router.use(_auth.isAdmin); // Routes

router.get("/add", _admin.renderAddLink);
router.post("/add", _admin.addLink);
router.get("/", _auth.isAdmin, _admin.renderLinks);
router.get("/delete/:id", _admin.deleteLink);
router.get("/edit/:id", _admin.renderEditLink);
router.post("/edit/:id", _admin.editLink);
var _default = router;
exports["default"] = _default;