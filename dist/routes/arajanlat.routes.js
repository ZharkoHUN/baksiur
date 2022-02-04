"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = require("../lib/auth");

var _arajanlat = require("../controllers/arajanlat.controller");

var router = (0, _express.Router)();
router.get("/", _auth.isAdmin, _arajanlat.renderArajanlat);
var _default = router;
exports["default"] = _default;