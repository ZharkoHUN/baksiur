"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = require("../controllers/auth.controller");

var router = (0, _express.Router)();
// SIGNUP
router.get("/signup", _auth.renderSignUp);
router.post("/signup", _auth.signUp); // SINGIN

router.get("/signin", _auth.renderSignIn);
router.post("/signin", _auth.signIn);
router.get("/logout", _auth.logout);
var _default = router;
exports["default"] = _default;