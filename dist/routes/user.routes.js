"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = require("../lib/auth");

var _user = require("../controllers/user.controller");

var router = (0, _express.Router)();
router.get("/profile", _auth.isLoggedIn, _user.renderUserProfile);
var _default = router;
exports["default"] = _default;