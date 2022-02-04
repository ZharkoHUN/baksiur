"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("./auth.routes"));

var _index = _interopRequireDefault(require("./index.routes"));

var _links = _interopRequireDefault(require("./links.routes"));

var _user = _interopRequireDefault(require("./user.routes"));

var _arajanlat = _interopRequireDefault(require("./arajanlat.routes"));

var _admin = _interopRequireDefault(require("./admin.routes"));

var _projects = _interopRequireDefault(require("./projects.routes"));

var router = (0, _express.Router)();
router.use(_index["default"]);
router.use(_auth["default"]);
router.use(_user["default"]);
router.use("/links", _links["default"]);
router.use("/admin", _admin["default"]);
router.use("/projects", _projects["default"]);
router.use("/arajanlat", _arajanlat["default"]);
var _default = router;
exports["default"] = _default;